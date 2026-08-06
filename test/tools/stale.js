import assert from 'node:assert/strict';
import test from 'node:test';
import isStale, { STALE_AFTER_DAYS } from '../../lib/tools/stale.js';

const DAY = 86400000;
const ago = days => new Date(Date.now() - days * DAY);

/*
 * The policy exists to suppress a summer-stale report, but its FIRST duty is to
 * never suppress a live one. Everything below the threshold, and everything we
 * cannot date at all, must publish.
 */

test('stale: anything we cannot date publishes', () => {
  for (const v of [undefined, null, 0, '', Number.NaN, 'not a date', {}, []]) {
    assert.equal(isStale(v), false, `${JSON.stringify(v)} should publish`);
  }
});

test('stale: a current report publishes', () => {
  assert.equal(isStale(new Date()), false);
  assert.equal(isStale(ago(1)), false);
  assert.equal(isStale(ago(7)), false);
});

test('stale: a long in-season gap still publishes', () => {
  // a weekend-only hill skipping six straight weekends, or a nordic club whose
  // statuses simply did not change for a month, must not go dark
  assert.equal(isStale(ago(30)), false);
  assert.equal(isStale(ago(STALE_AFTER_DAYS - 1)), false);
});

test('stale: only a months-old report is suppressed', () => {
  assert.equal(isStale(ago(STALE_AFTER_DAYS + 1)), true);
  assert.equal(isStale(ago(120)), true);
});

test('stale: a future date is clock skew, not staleness', () => {
  assert.equal(isStale(new Date(Date.now() + 3 * DAY)), false);
});

test('stale: epoch milliseconds work as well as Date objects', () => {
  assert.equal(isStale(Date.now() - DAY), false);
  assert.equal(isStale(Date.now() - 200 * DAY), true);
});

test('stale: the window can only be widened in practice', () => {
  // callers may pass a longer window; the default is already generous
  assert.equal(isStale(ago(60), 90), false);
  assert.ok(STALE_AFTER_DAYS >= 30, 'default window must survive a month-long gap');
});
