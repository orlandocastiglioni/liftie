import lifts from '../lifts/index.js';

// 2025-02-19 wayback capture: midwinter, the whole Nordkette turning
lifts('nordkette', 'html', {
  'A Sektion I Hungerburg': 'open',
  'B Sektion II Seegrube': 'open',
  'C Sektion III Hafelekar': 'open',
  'D Seegrube': 'open',
  'E Frau - Hitt - Warte': 'open',
  Zauberteppich: 'open'
});

// live 2026-08-07 capture: the three sightseeing sections run year round, the
// two ski lifts and the carpet do not - the only capture of this page that
// mixes both status glyphs, so it is what pins fa-times to closed
lifts(
  'nordkette',
  'html',
  {
    'A Sektion I Hungerburg': 'open',
    'B Sektion II Seegrube': 'open',
    'C Sektion III Hafelekar': 'open',
    'D Seegrube': 'closed',
    'E Frau - Hitt - Warte': 'closed',
    Zauberteppich: 'closed'
  },
  { example: 'nordkette-summer' }
);
