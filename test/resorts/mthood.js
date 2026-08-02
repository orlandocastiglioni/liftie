import lifts from '../lifts/index.js';

// real winter capture (2025-02-24) of /api/weather/poi with the site's full
// include list; the Lifts sector carries all 12 lifts
lifts('mthood', 'json', {
  'Mt. Hood Express': 'open',
  'Shooting Star Express': 'open',
  'Easy Rider': 'open',
  'Buttercup': 'open',
  'Ballroom Carpet': 'open',
  'Stadium Express': 'scheduled',
  'Cascade Express': 'scheduled',
  'Vista Express': 'scheduled',
  'Daisy': 'scheduled',
  'Hood River Express': 'closed',
  'Blue': 'closed',
  'Heather': 'closed'
});
