import lifts from '../lifts/index.js';

// maneige.ski category counts synthesized into summary rows (no named lifts
// exist). Fixture: maneige REST post 46128 (out of season / closed_season, so
// the 2 day lifts read 0 open; Val d'Irene has no night skiing -> that category
// has total 0 and is skipped). See lib/resorts/val-direne/index.js.
lifts('val-direne', 'json', {
  'Lifts (day): 0/2 open': 'closed'
});
