import lifts from '../lifts/index.js';

// 2026-01-01: #todayLift01 lists five of the six chairs. 第4リフト is absent -
// the news post that morning said it was swapped out for 点検・整備 and 第6リフト
// run in its place - so membership is the only signal there is.
lifts('yuzawa-nakazato', 'html', {
  '第1高速リフト': 'open',
  '第2リフト': 'open',
  '第3リフト': 'open',
  '第4リフト': 'closed',
  '第5リフト': 'open',
  '第6リフト': 'open'
});

// off season (fetched 2026-08-06): the <dd> is empty and #todayLift01 is gone
// entirely, so the roster has to carry the whole answer
lifts(
  'yuzawa-nakazato',
  'html',
  {
    '第1高速リフト': 'closed',
    '第2リフト': 'closed',
    '第3リフト': 'closed',
    '第4リフト': 'closed',
    '第5リフト': 'closed',
    '第6リフト': 'closed'
  },
  { example: 'yuzawa-nakazato-offseason' }
);
