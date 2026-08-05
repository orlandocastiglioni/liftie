import lifts from '../lifts/index.js';

// fixture is the live published sheet captured in the summer off-season, so
// every "O" cell is hidden and every "X" cell is visible -> all closed
lifts('marquette-mountain', 'html', {
  'Snowfield Chair': 'closed',
  'Rocket Chair': 'closed',
  'River Chair': 'closed',
  'Tyro Paddle Tow Rope': 'closed'
});
