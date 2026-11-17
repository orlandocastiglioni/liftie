import assert from 'node:assert/strict';
import test from 'node:test';
import Limiter from '../../lib/tools/limiter.js';

const call = limit =>
  new Promise(resolve => {
    const start = performance.now();
    limit(arg => resolve({ arg, elapsed: performance.now() - start }));
  });

test('limiter: calls run while whole tokens remain', async () => {
  const limit = Limiter(2, 'minute');
  assert.equal((await call(limit)).arg, undefined);
  assert.equal((await call(limit)).arg, undefined);
});

test('limiter: an exhausted bucket with a fractional balance defers instead of waiting', async () => {
  // 2 tokens per second: after two calls the bucket holds a fractional,
  // refilling balance (> 0 but < 1). The third call must be told to fetch
  // later right away, not wait ~500ms for the next whole token.
  const limit = Limiter(2, 'second');
  await call(limit);
  await call(limit);
  const { arg, elapsed } = await call(limit);
  assert.deepEqual(arg, { fetchLater: true });
  assert.ok(elapsed < 100, `deferred immediately, took ${elapsed}ms`);
});

test('limiter: every limiter must have a token', async () => {
  const limit = Limiter(100, 'second', 1, 'minute');
  assert.equal((await call(limit)).arg, undefined);
  assert.deepEqual((await call(limit)).arg, { fetchLater: true });
});
