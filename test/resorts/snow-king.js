import lifts from '../lifts/index.js';

// fixture: 2022-12-06 mid-winter capture of https://snowkingmountain.com/mtn-xml/
// (wayback 20221207011222) - 4 open / 3 closed. The roster drifts season to
// season (8 lifts today), so nothing about the names is hardcoded in the parser.
lifts('snow-king', 'html', {
  'Rafferty Chairlift': 'open',
  'Cougar Triple Chairlift': 'open',
  'Summit Gondola': 'open',
  'Sunnyside Lift': 'closed',
  'Summit Magic Carpets': 'closed',
  'Base Area Magic Carpet': 'open',
  'Summit Surface Tow': 'closed'
});
