import assert from 'node:assert/strict';
import test from 'node:test';
import lifts from '../lifts/index.js';
import { liftsOf, pinDate } from './support/parse.js';

// Live capture of Tamarack's new theme-built "Snow and Grooming Report"
// (2026-11-27), which replaced the lift-trail-status plugin in November.
// Pre-opening, so every lift is closed. The report is gated on a season
// window and on each block's own "Last update" stamp (2026/11/24 here), so
// the clock is pinned to the capture day; `node --test` runs each file in its
// own process.
pinDate('2026-11-27T20:00:00Z');

// The "Chair Lifts Status" block only - the "Uphill Status" block below it
// uses the same table markup.
lifts('tamarack-resort', 'html', {
  'Buttercup Chair': 'closed',
  'Discovery Chair': 'closed',
  'Mutton Buster Carpet': 'closed',
  'Rock Creek Poma': 'closed',
  'Summit Express': 'closed',
  'Tamarack Express': 'closed',
  'Wildwood Express': 'closed'
});

test('tamarack-resort publishes no lifts out of season, and says so', async () => {
  const restore = pinDate('2026-07-15T18:00:00Z');
  try {
    const rows = await liftsOf('tamarack-resort', 'tamarack-resort.html');
    assert.deepEqual(rows, {});
    assert.deepEqual(rows.suppressed, { reason: 'offseason' });
  } finally {
    restore();
  }
});

test('tamarack-resort publishes no lifts from a stale block, and says so', async () => {
  const restore = pinDate('2027-02-15T18:00:00Z');
  try {
    const rows = await liftsOf('tamarack-resort', 'tamarack-resort.html');
    assert.deepEqual(rows, {});
    assert.deepEqual(rows.suppressed, { reason: 'stale', date: '2026-11-24T13:35:00.000Z' });
  } finally {
    restore();
  }
});
