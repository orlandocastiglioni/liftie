import lifts from '../lifts/index.js';

// winter capture (2026-01-09) of the Michigan Tech snow report: the "Lift
// Status" table only - the identically shaped "Tube Park Handle Tow" table
// below it must not turn Friday/Saturday/Sunday into lifts
lifts('mont-ripley', 'html', {
  'Husky Chair': 'open',
  'Copper Hoist': 'closed',
  'T-Bar': 'open'
});
