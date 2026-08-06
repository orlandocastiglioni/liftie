import lifts from '../lifts/index.js';

// 2026-01-10 mid-season: ○ open, × closed and the single observed △
// (デルタペア, お知らせ "準備出来次第、運行開始") -> scheduled
lifts('whitepia-takasu', 'html', {
  'エコーぺア': 'open',
  'アルファクワッド': 'open',
  'ブラボークワッド': 'closed',
  'デルタペア': 'scheduled',
  'ワシトピア往来': 'closed'
});

// 2026-02-08: the em dash "—" (no operation planned) -> closed
lifts(
  'whitepia-takasu',
  'html',
  {
    'エコーぺア': 'open',
    'アルファクワッド': 'open',
    'ブラボークワッド': 'open',
    'デルタペア': 'closed',
    'ワシトピア往来': 'open'
  },
  { example: 'whitepia-takasu-20260208' }
);
