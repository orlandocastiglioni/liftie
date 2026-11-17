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

// 2026-11-17 live capture of the rebuilt site (/trails-lifts, DOR status
// widget), pre-season: every lift closed
lifts(
  'terry-peak',
  'html',
  {
    'Stewart Lift': 'closed',
    'Snow Carpet': 'closed',
    'Surprise Express': 'closed',
    'Kussy Express': 'closed',
    'Coeur Wharf Express': 'closed'
  },
  { example: 'terry-peak-2026-11' }
);

// the same capture with Stewart Lift's badge edited to --open and Kussy
// Express's to --wind-hold: status follows the badge modifier class
lifts(
  'terry-peak',
  'html',
  {
    'Stewart Lift': 'open',
    'Snow Carpet': 'closed',
    'Surprise Express': 'closed',
    'Kussy Express': 'hold',
    'Coeur Wharf Express': 'closed'
  },
  { example: 'terry-peak-2026-11-open' }
);
