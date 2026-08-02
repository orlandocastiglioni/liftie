import lifts from '../lifts/index.js';

// raw winter page - pre-JS Japanese statuses
lifts('palcall-tsumagoi', 'html', {
  '嬬恋ゴンドラ': 'open',
  '第1高速リフト': 'open',
  '第2高速リフト': 'closed',
  '第3ペアリフト': 'open',
  'スノーエスカレーター': 'open'
});

// FlareSolverr post-JS DOM - the on-page script rewrites statuses to English
lifts(
  'palcall-tsumagoi',
  'html',
  {
    '嬬恋ゴンドラ': 'open',
    '第1高速リフト': 'closed',
    '第2高速リフト': 'closed',
    '第3ペアリフト': 'closed',
    'スノーエスカレーター': 'closed'
  },
  { example: 'palcall-tsumagoi-rendered' }
);
