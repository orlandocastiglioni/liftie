import lifts from '../lifts/index.js';

// fixture: 2025-02-15 winter capture of /mountain-info/trail-status
// (wayback 20250215013149) - 5 open / 1 closed, and it also carries the CMS
// filler column that has no <h3> at all, which the parser must not trip on.
lifts('silver-mountain', 'html', {
  'Chair 1': 'open',
  'Chair 2': 'open',
  'Chair 3': 'open',
  'Chair 4': 'open',
  'Chair 5': 'closed',
  'Prospector Adventure Lift': 'open'
});
