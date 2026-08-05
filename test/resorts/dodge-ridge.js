import assert from 'node:assert/strict';
import test from 'node:test';
import te2status from '../../lib/resorts/dodge-ridge/status.js';
import lifts from '../lifts/index.js';

// action=fetch_lift_data fragment captured 2026-08-05 - the whole 11-lift
// roster, all closed because it is August
lifts('dodge-ridge', 'html', {
  'Chair 1 - Triple Nugget': 'closed',
  'Chair 3 - Motherlode': 'closed',
  'Chair 4 - Comstock': 'closed',
  'Chair 5 - Gold Rush': 'closed',
  'Chair 6 - Clementine': 'closed',
  'Chair 7 - Prospector': 'closed',
  'Chair 8 - Boulder Creek': 'closed',
  "Conveyer 1 River's Otter Run": 'closed',
  'Conveyor 2': 'closed',
  'Conveyor 3 The Highway': 'closed',
  'TBar - 643': 'closed'
});

// the fixture can only show 'closed' in August, so pin the rest of the TE2
// vocabulary directly - these are the labels coerce.js does not know and
// would otherwise degrade to 'scheduled'
test('dodge-ridge resolves the TE2 status vocabulary', () => {
  const cases = {
    open: 'open',
    open_top: 'open',
    upper_open: 'open',
    groomers_choice: 'open',
    open_but_closed_to_foot_traffic: 'open',
    scenic_ride_only: 'open',
    closed: 'closed',
    closed_for_season: 'closed',
    patrol_closure: 'closed',
    wind_closure: 'closed',
    off_season: 'closed',
    work_in_progress: 'closed',
    power_outage: 'closed',
    pending_mitigation: 'closed',
    hold: 'hold',
    wind_hold: 'hold',
    mechanical_hold: 'hold',
    patrol_hold: 'hold',
    download_only: 'hold',
    scheduled: 'scheduled',
    expected: 'scheduled',
    delayed: 'scheduled',
    progressive_opening: 'scheduled',
    '30_minutes_or_less': 'scheduled'
  };
  for (const [label, expected] of Object.entries(cases)) {
    assert.equal(te2status(label), expected, `${label} should be ${expected}`);
  }
  // an unknown label falls back to the row colour the plugin paints
  assert.equal(te2status('brand_new_label', 'color:#36B44C;'), 'open');
  assert.equal(te2status('brand_new_label', 'color:#A02040;'), 'closed');
});
