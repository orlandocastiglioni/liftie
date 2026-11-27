import assert from 'node:assert/strict';
import test from 'node:test';
import suppressed, { publish, REASONS } from '../../lib/tools/suppressed.js';
import collect from '../../lib/trails/parse.js';

test('suppressed marks the empty board without adding rows', () => {
  const lifts = suppressed({}, REASONS.stale, Date.parse('2026-04-16T23:09:16Z'));
  assert.deepEqual(lifts, {});
  assert.deepEqual(Object.keys(lifts), []);
  assert.equal(JSON.stringify(lifts), '{}');
  assert.deepEqual(lifts.suppressed, { reason: 'stale', date: '2026-04-16T23:09:16.000Z' });

  const trails = suppressed([], REASONS.offseason);
  assert.deepEqual(trails, []);
  assert.equal(JSON.stringify(trails), '[]');
  assert.deepEqual(trails.suppressed, { reason: 'offseason' });
});

test('suppressed keeps a calendar day a calendar day', () => {
  assert.equal(suppressed([], REASONS.beforeOpening, '2026-12-05').suppressed.date, '2026-12-05');
  assert.equal(
    suppressed([], REASONS.stale, new Date('2026-03-07T15:15:51.983Z')).suppressed.date,
    '2026-03-07T15:15:51.983Z'
  );
  // an unreadable date is dropped, the reason kept
  assert.deepEqual(suppressed([], REASONS.stale, 'not a date').suppressed, { reason: 'stale' });
  assert.deepEqual(suppressed([], REASONS.stale, Number.NaN).suppressed, { reason: 'stale' });
});

test('suppressed refuses a reason outside the documented set', () => {
  assert.throws(() => suppressed([], 'broken'), /unknown suppression reason/);
});

test('publish copies the marker onto the payload as two additive keys', () => {
  const rows = suppressed({}, REASONS.beforeOpening, '2026-12-05');
  assert.deepEqual(publish({ status: rows, stats: {} }, rows), {
    status: {},
    stats: {},
    suppressed: 'beforeOpening',
    suppressedDate: '2026-12-05'
  });
  assert.deepEqual(publish({ status: {} }, suppressed({}, REASONS.noneOpen)), {
    status: {},
    suppressed: 'noneOpen'
  });
  // nothing withheld, nothing added
  assert.deepEqual(publish({ status: { A: 'open' } }, { A: 'open' }), { status: { A: 'open' } });
  assert.deepEqual(publish({ list: [] }, undefined), { list: [] });
});

test('the trails collector carries the marker across its mapping', () => {
  const list = collect(null, () => suppressed([], REASONS.summer));
  assert.deepEqual(list, []);
  assert.deepEqual(list.suppressed, { reason: 'summer' });
});
