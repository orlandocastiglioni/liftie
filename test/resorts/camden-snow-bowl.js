import lifts from '../lifts/index.js';

// 2026-01-01 capture: nothing spinning yet, and TRIPLE reads
// "CLOSED Projected Opening Date 1/7/25" - only the leading token is a status
lifts('camden-snow-bowl', 'html', {
  Slipway: 'closed',
  Double: 'closed',
  Triple: 'closed'
});

// 2026-02-01 capture: full operation
lifts(
  'camden-snow-bowl',
  'html',
  {
    Slipway: 'open',
    Double: 'open',
    Triple: 'open'
  },
  { example: 'camden-snow-bowl-feb' }
);
