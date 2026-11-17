import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import lifts from '../../lib/resorts/powder-ridge-ct/index.js';
import trails from '../../lib/resorts/powder-ridge-ct/trails.js';

// The same 2026-10-27 capture on the real clock: the 2026-09-18 blocks are
// past stale.js's window, so the summer "Festival open" no longer publishes.
// Rows go (never "closed"); the stamp stays.
test('powder-ridge-ct publishes nothing from a stale board', () => {
  const body = JSON.parse(readFileSync(resolve(import.meta.dirname, 'example/powder-ridge-ct.json'), 'utf8'));
  const ls = lifts(body);
  assert.deepEqual(ls, {});
  assert.equal(ls.reportedAt, '2026-09-18T18:07:15.000Z');
  const list = trails(body);
  assert.deepEqual(list, []);
  assert.ok(list.reportedAt);
});
