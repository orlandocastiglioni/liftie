import lifts from '../lifts/index.js';

// fixture: obermountain.com/slope-report, Wayback snapshot 2025-12-15
// (mid-season). Ober publishes no per-lift status - the lift set and its
// status are derived from the "lifts" annotation on each slope row, which
// reproduces the page's own aggregate open_lifts count of 2.
lifts('ober-mountain', 'html', {
  'Mighty Carpet': 'open',
  'Ober Easy': 'open',
  'Ober Challenge (Quad)': 'closed'
});
