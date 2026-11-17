import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test, { mock } from 'node:test';

// the database writes liftie.db.json into LOG_DIR; keep it out of the real tmp
process.env.LOG_DIR = mkdtempSync(join(tmpdir(), 'liftie-keep-last-good-'));

const { default: fetchLifts } = await import('../../lib/lifts/index.js');
const { PARSE_ERROR } = await import('../../lib/lifts/parse.js');
const loaders = await import('../../lib/loaders.js');
const plugins = await import('../../lib/plugins.js');
const { default: makeData } = await import('../../lib/routes/data.js');

let seq = 0;
// every call gets its own URL so lib/tools/fetchonce.js never shares a body
function resortWith(parse, respond) {
  seq += 1;
  const url = { host: 'https://lifts.test', pathname: `/board-${seq}` };
  mock.method(globalThis, 'fetch', async () => respond());
  return { id: `test-${seq}`, _rfau: undefined, _parseFn: parse, api: url };
}

function ok(body) {
  return { status: 200, json: async () => body, text: async () => JSON.stringify(body) };
}

function run(resort) {
  return new Promise(resolve => fetchLifts(resort, (err, payload) => resolve({ err, payload })));
}

test.afterEach(() => mock.restoreAll());

test('lifts fetch: an HTTP error is reported, not turned into an empty board', async () => {
  const parse = () => ({ Gondola: 'open' });
  const { err, payload } = await run(resortWith(parse, () => ({ status: 503, text: async () => '' })));
  assert.equal(err, 503);
  assert.equal(payload, undefined);
});

test('lifts fetch: a network failure is reported', async () => {
  const parse = () => ({ Gondola: 'open' });
  const { err } = await run(
    resortWith(parse, () => {
      throw new Error('ECONNRESET');
    })
  );
  assert.match(String(err), /ECONNRESET/);
});

test('lifts fetch: a parser exception (wrappedParse marker) is reported', async () => {
  const boom = new Error('markup changed');
  const parse = () => ({ [PARSE_ERROR]: boom });
  const { err, payload } = await run(resortWith(parse, () => ok({})));
  assert.equal(err, boom);
  assert.equal(payload, undefined);
});

test('lifts fetch: an async parser error is reported', async () => {
  const parse = (_body, fn) => fn(new Error('second feed down'));
  parse.isAsync = true;
  const { err } = await run(resortWith(parse, () => ok({})));
  assert.match(String(err), /second feed down/);
});

test('lifts fetch: a successful fetch with no rows still publishes empty', async () => {
  const { err, payload } = await run(
    resortWith(
      () => ({}),
      () => ok({})
    )
  );
  assert.equal(err, null);
  assert.deepEqual(payload.status, {});
  assert.equal(payload.stats.open + payload.stats.closed + payload.stats.hold + payload.stats.scheduled, 0);
});

test('lifts fetch: a good board is published', async () => {
  const { err, payload } = await run(
    resortWith(
      () => ({ Gondola: 'open', 'Quad 1': 'closed' }),
      () => ok({})
    )
  );
  assert.equal(err, null);
  assert.deepEqual(payload.status, { Gondola: 'open', 'Quad 1': 'closed' });
});

test('wrappedParse: a throwing parser yields the PARSE_ERROR marker, not {}', async () => {
  // any function-descriptor resort will do: hand it a body it cannot read
  const { default: getParseFn } = await import('../../lib/lifts/parse.js');
  const parse = await getParseFn('corralco');
  mock.method(console, 'error', () => {});
  const result = parse(null);
  assert.ok(result[PARSE_ERROR] instanceof Error);
  assert.equal(Object.keys(result).length, 0, 'the marker is a symbol key, invisible to stats');
});

/*
 * lib/routes/data.js end to end: one fake resort, one fake 'lifts' plugin
 * whose outcomes we script. Timers are mocked so the 10 s wake loop is driven
 * by hand and the process can exit.
 */
test('data: the last good board survives an error and timestamp records the last success', async () => {
  mock.timers.enable({ apis: ['setInterval', 'setTimeout', 'Date'], now: 1_800_000_000_000 });
  try {
    const outcomes = [
      [null, { status: { Gondola: 'open' }, stats: { open: 1, closed: 0, hold: 0, scheduled: 0 } }],
      ['boom'],
      [null, { status: {}, stats: { open: 0, closed: 0, hold: 0, scheduled: 0 } }]
    ];
    let calls = 0;
    const plugin = (_meta, fn) => fn(...outcomes[calls++]);
    plugin.interval = { active: 60_000, inactive: 30 * 60_000 };
    plugins.register('lifts', plugin);
    loaders.register(async () => ({
      fake: { id: 'fake', name: 'Fake', url: { host: 'https://fake.test', pathname: '/' }, ll: [0, 0] }
    }));
    mock.method(console, 'error', () => {});

    const data = makeData();
    await new Promise(resolve => data.init(resolve));
    const get = () => new Promise(resolve => data.get(undefined, (_e, [r]) => resolve(r)));

    // init fetched once: good board
    let r = await get();
    assert.deepEqual(r.lifts.status, { Gondola: 'open' });
    const firstSuccess = r.timestamp.lifts;
    assert.equal(firstSuccess, 1_800_000_000_000);

    // past the inactive interval: the fetch errors, the board stays
    mock.timers.tick(30 * 60_000 + 10_000);
    r = await get();
    assert.equal(calls, 2);
    assert.deepEqual(r.lifts.status, { Gondola: 'open' }, 'last good board kept');
    assert.equal(r.timestamp.lifts, firstSuccess, 'timestamp is the last SUCCESS');

    // a failure is not retried on every 10 s wake
    mock.timers.tick(60_000);
    assert.equal(calls, 2, 'no retry before the interval elapses');

    // next interval: a real empty board replaces it
    mock.timers.tick(30 * 60_000);
    r = await get();
    assert.equal(calls, 3);
    assert.deepEqual(r.lifts.status, {});
    assert.ok(r.timestamp.lifts > firstSuccess);
  } finally {
    mock.timers.reset();
  }
});
