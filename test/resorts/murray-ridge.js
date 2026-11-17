import lifts from '../lifts/index.js';

// Winter wayback fixture (2025-01-13). The two known lifts are open/closed by
// membership in the free-text "LIFTS OPEN:" line of the newest daily post.
lifts('murray-ridge', 'html', {
  'T-Bar': 'open',
  'Bunny Hill': 'open'
});

// Live capture 2026-11-17 (pre-season): the newest post is a fundraiser
// notice and last season's 2026-03-21 conditions report ("LIFTS OPEN: T BAR")
// is seventh. Only the newest post counts, so both lifts read closed instead
// of the T-Bar staying open all summer.
lifts(
  'murray-ridge',
  'html',
  {
    'T-Bar': 'closed',
    'Bunny Hill': 'closed'
  },
  { example: 'murray-ridge-offseason' }
);
