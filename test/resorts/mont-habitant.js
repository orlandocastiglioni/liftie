import lifts from '../lifts/index.js';

// maneige.ski (ASSQ) exposes only aggregate open/total counts per lift category,
// never named lifts, so we synthesize one summary row per category (total > 0)
// with status derived numerically. Fixture: late-season maneige REST post 449
// (1/3 day lifts running, night lifts off). See lib/resorts/mont-habitant/index.js.
lifts('mont-habitant', 'json', {
  'Lifts (day): 1/3 open': 'open',
  'Lifts (night): 0/3 open': 'closed'
});
