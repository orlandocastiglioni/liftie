import lifts from '../lifts/index.js';

// fixture: web.archive.org capture of /trails/ from 2026-01-23, mid-season.
// Lifts are the second half of the same #tgtable that holds the trails, so
// this also asserts that the mid-table "LIFT" header row switches modes and
// that no trail row leaks into the lift list.
lifts('montage-mountain', 'html', {
  'The Yard – Rope Tow': 'closed',
  'Learning Area (Magic Carpet)': 'open',
  'The Yard Magic Carpet': 'closed',
  'Short Haul': 'open',
  'Iron Horse': 'open',
  'Long Haul': 'open',
  'Shuttle': 'open',
  'Phoebe Snow': 'open'
});
