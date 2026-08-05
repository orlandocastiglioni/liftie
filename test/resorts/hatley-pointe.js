import lifts from '../lifts/index.js';

// wayback capture of the PropApps report from 2025-12-05, the only usable
// winter snapshot (the 2026 ones all archived as HTTP 520). Two of the three
// lifts are spinning, matching that page's 'Lifts Open 2 of 3' counter.
lifts('hatley-pointe', 'html', {
  'Summit Lift': 'open',
  'Tennessee Walker': 'open',
  'Way Out Tow': 'closed'
});
