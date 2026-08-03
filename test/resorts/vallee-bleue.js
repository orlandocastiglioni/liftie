import lifts from '../lifts/index.js';

// maneige.ski category counts synthesized into summary rows (no named lifts
// exist). Fixture: maneige REST post 456 (out of season / closed_season, so the
// 3 day lifts read 0 open; Vallee Bleue has no night skiing -> that category is
// absent, total 0, and is skipped). See lib/resorts/vallee-bleue/index.js.
lifts('vallee-bleue', 'json', {
  'Lifts (day): 0/3 open': 'closed'
});
