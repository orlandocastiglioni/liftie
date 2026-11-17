import lifts from '../lifts/index.js';

// Closing-week capture (Ski Schedule 3/12-3/17): stale since early May, so
// fresh.js publishes no rows at all.
lifts('hoodoo', 'html', {}, { example: 'hoodoo-2026' });

// The live page on 17 Nov 2026 is still that closing week - no rows.
lifts('hoodoo', 'html', {}, { example: 'hoodoo-2026-11' });

// The same capture with the schedule dates blanked: the gate fails open and
// the hours table parses as before (posted hours -> scheduled).
lifts(
  'hoodoo',
  'html',
  {
    "HAROLD'S MAGIC CARPET": 'scheduled',
    'EASY RIDER': 'scheduled',
    'MANZANITA': 'scheduled',
    'ED': 'scheduled',
    'BIG GREEN MACHINE': 'scheduled',
    'HODAG': 'closed'
  },
  { example: 'hoodoo-2026-11-undated' }
);
