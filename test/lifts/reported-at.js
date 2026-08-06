import assert from 'node:assert/strict';
import test from 'node:test';
import stats from '../../lib/lifts/stats.js';

/*
 * A lift parser may date its own report by hanging `reportedAt` off the object
 * it returns, mirroring what lib/tools/nordic-pulse.js does for trails. It MUST
 * be non-enumerable: lib/lifts/stats.js counts Object.keys(status), so an
 * enumerable reportedAt would be tallied as a lift whose status is a date
 * string - inflating the lift count and landing in the 'undefined' bucket.
 *
 * This matters because several resorts freeze their board at closing day rather
 * than emptying it (Aomori Spring serves last winter's all-closed board right
 * through summer), so the date is the only thing distinguishing a current
 * report from a stale one.
 */

function dated(status, when) {
  Object.defineProperty(status, 'reportedAt', { value: when });
  return status;
}

test('lifts: a non-enumerable reportedAt is not counted as a lift', () => {
  const status = dated({ Gondola: 'open', 'Quad 1': 'closed' }, '2026-02-01T10:40:00.000Z');
  const s = stats(status);
  assert.equal(s.open, 1);
  assert.equal(s.closed, 1);
  assert.equal(s.open + s.hold + s.scheduled + s.closed, 2, 'exactly the two real lifts');
  assert.equal(Object.keys(status).length, 2);
});

test('lifts: the date is still readable by the payload builder', () => {
  const status = dated({ Gondola: 'open' }, '2026-02-01T10:40:00.000Z');
  assert.equal(status.reportedAt, '2026-02-01T10:40:00.000Z');
  // this is the shape lib/lifts/index.js publishes
  const payload = { status, stats: stats(status) };
  if (status.reportedAt) {
    payload.reportedAt = status.reportedAt;
  }
  assert.equal(payload.reportedAt, '2026-02-01T10:40:00.000Z');
  assert.equal(payload.stats.open, 1);
});

test('lifts: an ENUMERABLE reportedAt would corrupt the counts - the bug this guards', () => {
  const bad = { Gondola: 'open', reportedAt: '2026-02-01T10:40:00.000Z' };
  const s = stats(bad);
  // the date lands in no known state, so the totals no longer describe the hill
  assert.equal(s.open + s.hold + s.scheduled + s.closed, 1);
  assert.equal(Object.keys(bad).length, 2, 'and it shows up as a second "lift"');
});

test('lifts: a parser that sets no date publishes none', () => {
  const status = { Gondola: 'open' };
  assert.equal(status.reportedAt, undefined);
  assert.equal(stats(status).open, 1);
});
