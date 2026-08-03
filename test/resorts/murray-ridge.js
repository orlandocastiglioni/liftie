import lifts from '../lifts/index.js';

// Winter wayback fixture (2025-01-13). The two known lifts are open/closed by
// membership in the free-text "LIFTS OPEN:" line of the newest daily post.
lifts('murray-ridge', 'html', {
  'T-Bar': 'open',
  'Bunny Hill': 'open'
});
