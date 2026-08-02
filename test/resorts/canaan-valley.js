import lifts from '../lifts/index.js';

// summer 2026-08-01 capture of https://www.canaanresort.com/trail-report
// ('Lifts Open: 0/6'); the page lists 'Tubing Lift' twice - the parser
// suffixes the repeat so all 6 lifts are reported
lifts('canaan-valley', 'html', {
  '"A" Lift': 'closed',
  '"B" Lift': 'closed',
  '"C" Lift': 'closed',
  'Magic Carpet': 'closed',
  'Tubing Lift': 'closed',
  'Tubing Lift 2': 'closed'
});
