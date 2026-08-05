import lifts from '../lifts/index.js';

// fixture: web.archive.org capture of the sibling printable report
// (2023-12-09, early season) - a mixed open/closed day, and it carries the
// legend section whose decoy article.SnowReport-Lift must not be counted
lifts('massanutten', 'html', {
  'Creekside - Quad Chair': 'open',
  'Easy Rider - Quad Chair': 'closed',
  'Flying Carpet - Conveyor': 'closed',
  'Magic Carpet - Conveyor': 'closed',
  'Peak Quad - Quad Chair': 'closed',
  'Ridge Triple - Triple Chair': 'open',
  'Sunkid - Conveyor': 'open'
});
