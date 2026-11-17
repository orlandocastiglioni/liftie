import assert from 'node:assert/strict';
import test from 'node:test';
import rest from '../../lib/lifts/rest.js';
import envHeaders, { MissingEnvHeader } from '../../lib/tools/env-headers.js';

// Dummy values only: no real token belongs anywhere in this repository.
const DUMMY = 'dummy-token-for-tests';

test('env-headers: a set variable becomes the header', () => {
  const url = { envHeaders: { 'X-Alpine-API-Token': 'TEST_ENV_HEADER_SET' } };
  assert.deepEqual(envHeaders(url, { TEST_ENV_HEADER_SET: DUMMY }), { 'X-Alpine-API-Token': DUMMY });
  assert.deepEqual(envHeaders({}), {});
});

test('env-headers: an unset or empty variable is an error naming it, not the value', () => {
  const url = { envHeaders: { 'X-Alpine-API-Token': 'TEST_ENV_HEADER_UNSET' } };
  for (const env of [{}, { TEST_ENV_HEADER_UNSET: '' }]) {
    assert.throws(
      () => envHeaders(url, env),
      err => err instanceof MissingEnvHeader && err.variable === 'TEST_ENV_HEADER_UNSET'
    );
  }
});

test('rest: a missing secret header fails the fetch without requesting', (_t, done) => {
  const realFetch = globalThis.fetch;
  globalThis.fetch = () => assert.fail('must not fetch without the header');
  delete process.env.TEST_ENV_HEADER_REST;
  rest(
    { host: 'https://example.invalid', pathname: '/x', envHeaders: { 'X-Token': 'TEST_ENV_HEADER_REST' } },
    () => assert.fail('must not parse'),
    err => {
      globalThis.fetch = realFetch;
      assert.ok(err instanceof MissingEnvHeader);
      done();
    }
  );
});

test('rest: the secret header is sent when set', (_t, done) => {
  const realFetch = globalThis.fetch;
  process.env.TEST_ENV_HEADER_SENT = DUMMY;
  globalThis.fetch = async (_url, init) => {
    assert.equal(init.headers['X-Token'], DUMMY);
    return new Response('{"data":[1]}', { status: 200 });
  };
  rest(
    { host: 'https://example.invalid', pathname: '/sent', envHeaders: { 'X-Token': 'TEST_ENV_HEADER_SENT' } },
    body => body.data.length,
    (err, n) => {
      globalThis.fetch = realFetch;
      delete process.env.TEST_ENV_HEADER_SENT;
      assert.ifError(err);
      assert.equal(n, 1);
      done();
    }
  );
});
