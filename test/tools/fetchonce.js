import assert from 'node:assert/strict';
import test from 'node:test';
import fetchOnce, { _reset, keyFor } from '../../lib/tools/fetchonce.js';

/*
 * The dedupe sits on the fetch path for every resort, so its failure modes
 * matter more than its hit rate. The rules it must never break:
 *   - a failed response is never handed to a second caller
 *   - every caller can read the body (no exhausted stream)
 *   - requests that differ in any way that changes the response are not shared
 */

const ok = (body, status = 200) => ({ status, text: async () => body });

test('identical concurrent requests perform one real fetch', async () => {
  _reset();
  let calls = 0;
  const thunk = () => {
    calls += 1;
    return Promise.resolve(ok('payload'));
  };
  const [a, b, c] = await Promise.all([fetchOnce('k', thunk), fetchOnce('k', thunk), fetchOnce('k', thunk)]);
  assert.equal(calls, 1, 'one network request for three callers');
  // every caller must get the body - a shared stream would leave two empty
  assert.equal(await a.text(), 'payload');
  assert.equal(await b.text(), 'payload');
  assert.equal(await c.text(), 'payload');
});

test('a non-2xx response is never shared with a later caller', async () => {
  _reset();
  let calls = 0;
  const flaky = () => {
    calls += 1;
    return Promise.resolve(calls === 1 ? ok('boom', 502) : ok('good'));
  };
  const first = await fetchOnce('k', flaky);
  assert.equal(first.status, 502);
  const second = await fetchOnce('k', flaky);
  assert.equal(second.status, 200, 'the retry really refetched');
  assert.equal(await second.text(), 'good');
  assert.equal(calls, 2);
});

test('a rejected fetch is not cached', async () => {
  _reset();
  let calls = 0;
  const thunk = () => {
    calls += 1;
    return calls === 1 ? Promise.reject(new Error('offline')) : Promise.resolve(ok('back'));
  };
  await assert.rejects(() => fetchOnce('k', thunk));
  assert.equal(await (await fetchOnce('k', thunk)).text(), 'back');
  assert.equal(calls, 2);
});

test('different keys are never conflated', async () => {
  _reset();
  const a = await fetchOnce('a', () => Promise.resolve(ok('A')));
  const b = await fetchOnce('b', () => Promise.resolve(ok('B')));
  assert.equal(await a.text(), 'A');
  assert.equal(await b.text(), 'B');
});

test('keyFor separates anything that changes the response', () => {
  const u = 'https://example.com/x';
  const base = keyFor(u, {});
  assert.notEqual(base, keyFor(u, { method: 'POST' }), 'method');
  assert.notEqual(base, keyFor(u, { body: '{"a":1}' }), 'body');
  assert.notEqual(base, keyFor(u, { headers: { 'X-Org': 'a' } }), 'headers');
  assert.notEqual(keyFor(u, {}), keyFor('https://example.com/y', {}), 'url');
  // the Alpine Media resorts differ ONLY by a header, so this one is load-bearing
  assert.notEqual(keyFor(u, { headers: { 'X-Org': 'a' } }), keyFor(u, { headers: { 'X-Org': 'b' } }));
  assert.equal(base, keyFor(u, {}), 'stable for identical input');
});

test("a via shim keeps fetchvia's JSON-viewer unwrapping", async () => {
  _reset();
  // fetchvia hands back the Chrome JSON-viewer page; the unwrap fn is passed in
  // explicitly rather than borrowed off the response, whose body is consumed
  const unwrap = body => JSON.parse(body.replace(/<\/?pre>/g, ''));
  const r = await fetchOnce('k', () => Promise.resolve(ok('<pre>{"a":1}</pre>')), unwrap);
  assert.deepEqual(await r.json(), { a: 1 });
});

test('plain json bodies parse without a source json()', async () => {
  _reset();
  const r = await fetchOnce('k', () => Promise.resolve(ok('{"b":2}')));
  assert.deepEqual(await r.json(), { b: 2 });
});

/*
 * Regression: the first version captured the body with text() and then handed
 * back the ORIGINAL Response's json(). Against a real Response that throws
 * "Body is unusable" - every json-api resort silently published nothing. The
 * fake shims above could not catch it because their text() is not consuming, so
 * this test uses a genuine Response.
 */
test('json() works on a real Response whose body text() already consumed', async () => {
  _reset();
  const real = () => Promise.resolve(new Response('{"lifts":[1,2]}', { status: 200 }));
  const r = await fetchOnce('real', real);
  assert.equal(await r.text(), '{"lifts":[1,2]}');
  assert.deepEqual(await r.json(), { lifts: [1, 2] }, 'must parse the captured text, not the used body');
});

test('a via response keeps its own unwrapping', async () => {
  _reset();
  const viaBody = '<html><pre>{"a":1}</pre></html>';
  const unwrap = body => JSON.parse(body.match(/<pre>([\s\S]*?)<\/pre>/)[1]);
  const r = await fetchOnce('via', () => Promise.resolve(new Response(viaBody, { status: 200 })), unwrap);
  assert.deepEqual(await r.json(), { a: 1 });
});
