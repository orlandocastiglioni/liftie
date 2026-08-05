import lifts from '../lifts/index.js';

// Fixture: the 2026-01-23 wayback capture of terrypeak.com/the-mountain/trails-lifts/
// (mid-winter, everything spinning). Status comes from the icon-open.svg /
// icon-closed.svg filename rather than the 'open Icon' alt text, which coerce
// would read as 'openicon' and silently downgrade to 'scheduled'. Names carry
// leading spaces in the markup.
lifts('terry-peak', 'html', {
  'Stewart Lift': 'open',
  'Snow Carpet': 'open',
  'Surprise Express': 'open',
  'Kussy Express': 'open',
  'Coeur Wharf Express': 'open'
});
