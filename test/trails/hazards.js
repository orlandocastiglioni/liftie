import assert from 'node:assert/strict';
import test, { mock } from 'node:test';
import fetchTrails from '../../lib/trails/index.js';

let seq = 0;
function run(rows) {
  seq += 1;
  mock.method(globalThis, 'fetch', async () => ({ status: 200, json: async () => ({}), text: async () => '{}' }));
  const resort = {
    id: `hazard-${seq}`,
    trails: { host: 'https://trails.test', pathname: `/feed-${seq}`, json: true },
    _trailsParse: () => rows
  };
  return new Promise((resolve, reject) => fetchTrails(resort, (err, out) => (err ? reject(err) : resolve(out))));
}

test.afterEach(() => mock.restoreAll());

test('trails: a hazard flag goes to a parallel map, not into graded rows', async () => {
  const out = await run([
    { name: 'Summit', status: 'hold', level: 'black', hazard: true },
    { name: 'Valley', status: 'open', level: 'green' }
  ]);
  assert.deepEqual(out.hazards, { Summit: true });
  assert.deepEqual(out.list, [
    { name: 'Summit', status: 'hold', level: 'black' },
    { name: 'Valley', status: 'open', level: 'green' }
  ]);
  assert.equal(out.stats.hold, 1, "the status is still 'hold'");
});

test('trails: an ungraded { name: status } list keeps its shape and gets the same map', async () => {
  const out = await run([
    { name: 'Summit', status: 'hold', hazard: true },
    { name: 'Valley', status: 'open' }
  ]);
  assert.deepEqual(out.list, { Summit: 'hold', Valley: 'open' });
  assert.deepEqual(out.hazards, { Summit: true });
});

test('trails: no hazards, no hazards key - the payload is byte-identical to before', async () => {
  const out = await run([{ name: 'Valley', status: 'open', level: 'green' }]);
  assert.equal('hazards' in out, false);
  assert.deepEqual(Object.keys(out), ['stats', 'list']);
});

test('trails: only a literal true counts as a hazard', async () => {
  const out = await run([{ name: 'Valley', status: 'open', level: 'green', hazard: 'yes' }]);
  assert.equal('hazards' in out, false);
});
