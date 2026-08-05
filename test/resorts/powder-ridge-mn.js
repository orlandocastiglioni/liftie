import lifts from '../lifts/index.js';

// early-season snapshot (2023-12-10) of the "Lift Availability:" list -
// mixed open/closed. The snowtubing list further down the page must not
// leak in (Snowtubing, Lazer Light Tubing).
lifts('powder-ridge-mn', 'html', {
  'J-Bar': 'open',
  'Beginner Hill Tow Rope': 'open',
  'Quad Chairlift': 'open',
  'Powder Puff Chairlift': 'closed',
  'Gun Powder Chairlift': 'closed',
  'Terrain Park Tow Rope': 'closed'
});
