import lifts from '../lifts/index.js';

// wayback capture 2022-12-23, mid-season: 第1/第2ペアリフト painted at state 4
// (運行中), 第1ゴンドラ and クワッドリフト at state 5 (一時見合せ中), and
// 第2ゴンドラ emitting no overlay at all, which is the map's way of saying
// 運休・終了. Covers the absent-means-closed default for the lift half.
lifts('geto-kogen', 'html', {
  第1ペアリフト: 'open',
  第2ペアリフト: 'open',
  第1ゴンドラ: 'hold',
  第2ゴンドラ: 'closed',
  クワッドリフト: 'hold'
});

// wayback capture 2024-04-17, end of season: only 第1ゴンドラ is still painted,
// at state 6 (準備中). This is the state the board spends most of the winter in,
// so it gets its own assertion.
lifts(
  'geto-kogen',
  'html',
  {
    第1ペアリフト: 'closed',
    第2ペアリフト: 'closed',
    第1ゴンドラ: 'scheduled',
    第2ゴンドラ: 'closed',
    クワッドリフト: 'closed'
  },
  { example: 'geto-kogen-2024-04' }
);
