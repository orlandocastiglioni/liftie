import lifts from '../lifts/index.js';

// fixture: wayback snapshot of the mountain report from 2025-12-12, when the
// page's own counter read "Lifts Open 5/8" (the live summer page is all-closed)
lifts('crystal-mountain-mi', 'html', {
  'Backyard Triple': 'closed',
  'Buck Quad': 'open',
  'Crystal Clipper Quad': 'open',
  'Loki Quad': 'open',
  'Long Carpet': 'open',
  'North Face Quad': 'closed',
  'Ridge Triple': 'closed',
  'Short Carpet': 'open'
});
