import lifts from '../lifts/index.js';

// Winter fixture: Wayback snapshot of skimarble.com/terrain-status/ 2026-01-17.
// Four single-cell Ninja Tables lift-status tables; OPEN / CLOSED coerce cleanly.
lifts('marble-mountain', 'html', {
  'Lightning Express': 'open',
  'Black Mariah Quad': 'closed',
  'Newfie Bullet Quad': 'closed',
  'Magic Carpets': 'open'
});
