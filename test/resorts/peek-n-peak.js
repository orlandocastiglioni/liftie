import lifts from '../lifts/index.js';

// fixture: wayback capture of https://www.pknpk.com/conditions-report/ from
// 2026-02-11 (midwinter, mixed state - Chairs 1, 4 and 7 down). Captured
// through the archive because the live site 403s plain fetches; in production
// the same markup is fetched through renderd.
lifts('peek-n-peak', 'html', {
  'Chair 1': 'closed',
  'Chair 2': 'open',
  'Chair 3': 'open',
  'Chair 4': 'closed',
  'Chair 5': 'open',
  'Chair 6': 'open',
  'Chair 7': 'closed',
  'Chair 8': 'open',
  'Magic Carpet': 'open'
});
