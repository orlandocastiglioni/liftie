import lifts from '../lifts/index.js';

// mid-winter capture (2026-01-28) of the homepage 'Lift Hours*' pod, where
// every lift carries a weekly schedule rather than a live status. 'Aspen
// Night' is the Aspen triple running for night skiing and is published as its
// own row, so it is reported as its own lift.
lifts('pebble-creek', 'html', {
  'Aspen': 'open',
  'Aspen Night': 'open',
  'Conveyor': 'open',
  'Skyline': 'open',
  'Sunshine': 'open'
});
