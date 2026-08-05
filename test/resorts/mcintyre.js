import lifts from '../lifts/index.js';

// 2025-12-17 capture: current format, one name per <br>. 'Snow Tubing' is
// listed with the lifts and gets filtered out
lifts('mcintyre', 'html', {
  'Apollo 14': 'open',
  'Mercury - Redstone': 'open',
  'Moonwalk Magic Carpet': 'open'
});

// 2025-02-10 capture: same <br> list, different names for the same lifts -
// the operator rewrites the labels every season
lifts(
  'mcintyre',
  'html',
  {
    'Apollo 14 Lift': 'open',
    'Mercury-Redstone': 'open',
    'Moonwalk Magic Carpet': 'open',
    'Freedom 7 Magic Carpet': 'open'
  },
  { example: 'mcintyre-comma-list' }
);
