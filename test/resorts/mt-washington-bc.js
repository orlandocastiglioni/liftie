import lifts from '../lifts/index.js';

// Winter wayback fixture (2026-02-01). Every slope-grid-rows row is a lift;
// status comes from the cell-1 FontAwesome icon (check-square-o/window-close).
// The night-lift "Whiskey Jack" collapses onto the day chair of the same name.
lifts('mt-washington-bc', 'html', {
  'Upper Carpet (C4)': 'open',
  'Middle Carpet (C3)': 'open',
  'Lower Carpet (C2)': 'closed',
  'Teaching Carpet (C1)': 'open',
  'Eagle Quad': 'open',
  'Hawk 6 Pack': 'closed',
  'Sunrise Quad': 'closed',
  'Whiskey Jack': 'closed',
  'Boomerang Quad': 'closed',
  'Tubing and Night Skiing Carpet (C5)': 'closed',
  'Upper Easy Acres Carpet (C4)': 'closed',
  'Middle Easy Acres Carpet (C3)': 'closed',
  'Lower Easy Acres Carpet (C2)': 'closed',
  'Training Carpet (C1)': 'closed',
  'Snow Tube Park': 'open'
});
