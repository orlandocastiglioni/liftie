import lifts from '../lifts/index.js';

// fixture: wayback capture of https://www.mohawkmtn.com/snow-report/ from
// 2025-01-16, a full-operation midwinter day (8 of 8 lifts running - "The
// Rooster" was added to the roster later). Every open row is an <img> with no
// text, which is exactly the case a text-only parser gets wrong.
lifts('mohawk-mountain', 'html', {
  'Mohawk Triple Chair': 'open',
  'Nutmeg Triple Chair': 'open',
  'Arrowhead Triple Chair': 'open',
  'Boulder Summit Triple Chair': 'open',
  'Deer Run Triple Chair': 'open',
  'The Glider': 'open',
  "Robin's Nest": 'open',
  Runway: 'open'
});
