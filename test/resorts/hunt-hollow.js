import lifts from '../lifts/index.js';

// the three status cells are empty out of season (a bare &nbsp;), so they
// coerce to 'scheduled'; the roster itself is what the page publishes
lifts('hunt-hollow', 'html', {
  'Double Chair': 'scheduled',
  'Triple Chair': 'scheduled',
  'Moving Carpet': 'scheduled'
});
