import lifts from '../lifts/index.js';

// 2026-01-01 capture: 5 of the 7 lifts spinning, so both class/text tokens
// ("open", "closed") and the seven-row zone walk are exercised. The Easy
// Rider Conveyor is the row the site's own "Lifts Open 0/6" summary widget
// omits - the grooming report is the only place all 7 appear.
lifts('brundage', 'html', {
  'Blue Bird Express': 'open',
  'Centennial Express': 'open',
  'Easy Street Triple Chair Lift': 'open',
  'Bear Chair': 'open',
  'Easy Rider Conveyor': 'closed',
  'Lakeview Triple': 'open',
  'Hidden Valley': 'closed'
});
