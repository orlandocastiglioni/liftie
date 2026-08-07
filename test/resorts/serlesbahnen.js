import lifts from '../lifts/index.js';

// 2026-03-06 wayback capture: full winter operation, 5 of 5
lifts('serlesbahnen', 'html', {
  Gondelbahn: 'open',
  'SL Ochsenhütte': 'open',
  'SL Waldrasteck': 'open',
  'SL Lärchenlift': 'open',
  'Kinderland Talstation': 'open'
});

// live 2026-08-07 capture: only the Gondelbahn runs in summer. Every winter
// capture of this page has all five lifts open, so this is the one that pins
// fa-times to closed rather than letting it fall through to 'scheduled'.
lifts(
  'serlesbahnen',
  'html',
  {
    Gondelbahn: 'open',
    'SL Ochsenhütte': 'closed',
    'SL Waldrasteck': 'closed',
    'SL Lärchenlift': 'closed',
    'Kinderland Talstation': 'closed'
  },
  { example: 'serlesbahnen-summer' }
);
