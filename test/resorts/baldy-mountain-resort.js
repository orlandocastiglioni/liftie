import lifts from '../lifts/index.js';

// Baldy has no per-lift status field; each lift's open/closed is inferred from
// whether any of its grouped runs is open (see lib/resorts/baldy-mountain-resort/rows.js).
// Fixture: raw Jan-17-2026 winter wayback snapshot of /baldy-weather-cams/.
lifts('baldy-mountain-resort', 'html', {
  'Eagle Chair': 'open',
  'Sugarlump Quad': 'open',
  'Magic Carpet': 'open'
});
