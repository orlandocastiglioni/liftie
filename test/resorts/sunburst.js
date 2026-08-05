import assert from 'node:assert/strict';
import test from 'node:test';
import ullrStatus from '../../lib/resorts/sunburst/status.js';
import lifts from '../lifts/index.js';

// Sunburst's public Ullr widget feed (api.ullr.ski/public/v11/widget/SNOW/lifts).
// The fixture is a live capture - the Ullr API is not archived anywhere, and
// the resort's end-of-season sweep left every lift 'Closed'. Names are trimmed
// because Ullr stores raw operator input (' Chair 2', 'Tubing North Conveyor ').
lifts('sunburst', 'json', {
  'Tubing North Conveyor': 'closed',
  'Wunderberg South Rope Tow': 'closed',
  'Wunderberg North Rope Tow': 'closed',
  'Zig Zag Rope Tow': 'closed',
  'Tubing South Conveyor': 'closed',
  'Wunderberg Sunkid Carpet Lift': 'closed',
  'Wunderberg Magic Carpet Conveyor': 'closed',
  'Terrain Park Rope': 'closed',
  'Chair 1': 'closed',
  'Chair 3': 'closed',
  'Chair 2': 'closed'
});

// The fixture only ever says 'Closed', so pin the rest of Ullr's vocabulary
// here: both the title-case option list the lifts use and the uppercase enum
// the trails use. The last three are unknown to coerce and would otherwise
// degrade to 'scheduled'.
test('sunburst maps the full Ullr status vocabulary', () => {
  assert.deepEqual(
    [
      'Open',
      'Closed',
      'Scheduled',
      'Hold',
      'Wind hold',
      'Weather delay',
      'On Demand',
      'OPEN',
      'CLOSED',
      'NOT_REPORTED'
    ].map(ullrStatus),
    ['open', 'closed', 'scheduled', 'hold', 'hold', 'hold', 'scheduled', 'open', 'closed', 'closed']
  );
});
