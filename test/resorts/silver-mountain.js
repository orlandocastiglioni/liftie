import lifts from '../lifts/index.js';

// Live capture of the 2026-11 redesign (silvermt.com/snow-report/trail-status/,
// 2026-11-27), before opening: one <details> block per lift, all closed.
lifts('silver-mountain', 'html', {
  'Chair 1': 'closed',
  'Chair 2': 'closed',
  'Chair 3': 'closed',
  'Chair 4': 'closed',
  'Chair 5': 'closed',
  'Prospector Adventure': 'closed'
});
