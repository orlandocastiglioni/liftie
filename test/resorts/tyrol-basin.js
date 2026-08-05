import lifts from '../lifts/index.js';

// 2026-08-05 capture of the alpinemedia lifts service for Tyrol Basin. The
// season ended 2026-03-17, so all six lifts read closed; 'open' and 'hold'
// are the only other tokens the feed emits and coerce already knows both.
lifts('tyrol-basin', 'json', {
  'Chairlift A': 'closed',
  'Chairlift B': 'closed',
  'Chairlift C': 'closed',
  'Magic Carpet': 'closed',
  'The Barnyard Rope Tow': 'closed',
  "Uselman's Express Magic Carpet": 'closed'
});
