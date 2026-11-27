import lifts from '../lifts/index.js';

// Live capture of the 2026-11 redesign (montsutton.com/en/conditions/,
// 2026-11-27), before opening: all seven chairs closed. Read from the
// chair rows' status-dot modifier class; the west chairs are now spelled in
// French ('IV Ouest').
lifts('mont-sutton', 'html', {
  'I': 'closed',
  'II': 'closed',
  'III': 'closed',
  'IV': 'closed',
  'IV Ouest': 'closed',
  'V': 'closed',
  'VII': 'closed'
});
