import assert from 'node:assert/strict';
import test from 'node:test';
import lifts from '../lifts/index.js';
import { liftsOf } from './support/parse.js';

// IN SEASON. big-rock-current.json is CONSTRUCTED, not captured: the
// public-report feed has been current:false since the autumn 2026 rebuild,
// so no in-season body exists yet. It follows the field names and
// vocabularies of the page's own renderer (bigrock-mountain-ops
// public-report.js v0.3.11) and uses the lift and trail names of the old
// HTML report. Mercury, which the renderer drops, is dropped here too.
// RECHECK against the first real current:true body.
lifts(
  'big-rock',
  'json',
  {
    Sunrise: 'open',
    Apollo: 'scheduled',
    'Space Shuttle': 'hold'
  },
  { example: 'big-rock-current' }
);

// OFF SEASON. Live capture, 2026-11-27: current:false and empty arrays, which
// the page itself renders as no report at all - marked, not just empty.
test('big-rock marks the not-current feed as off season', async () => {
  const rows = await liftsOf('big-rock', 'big-rock.json');
  assert.deepEqual(rows, {});
  assert.deepEqual(rows.suppressed, { reason: 'offseason', date: '2026-11-27T18:50:52.000Z' });
});
