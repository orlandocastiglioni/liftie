import lifts from '../lifts/index.js';

// 2026-08-04 capture of the alpinemedia lifts service - the season ended in
// April, so every lift reads closed; 'hold' is the only other token the feed
// emits and coerce already knows it
lifts('middlebury-snowbowl', 'json', {
  'Bailey Falls Lift': 'closed',
  'Disco Carpet': 'closed',
  'Sheehan Lift': 'closed',
  'Worth Mountain Lift': 'closed'
});
