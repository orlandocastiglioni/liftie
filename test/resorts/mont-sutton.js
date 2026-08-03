import lifts from '../lifts/index.js';

// Winter wayback fixture (2026-02-17). Status is read from each row's CSS class
// token (ouvert/ferme), never the mojibake French text.
lifts('mont-sutton', 'html', {
  'I': 'open',
  'I West': 'closed',
  'II': 'open',
  'II West': 'open',
  'III': 'closed',
  'IV': 'open',
  'IV West': 'closed',
  'V': 'closed',
  'VII': 'open'
});
