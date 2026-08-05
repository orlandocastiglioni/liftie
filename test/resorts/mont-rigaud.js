import lifts from '../lifts/index.js';

// Fixture: live ski.montrigaud.com/home (no winter Wayback capture exists).
// Two published lifts in #barre_conditions; both carry `remontees_out`
// (closed) in the off-season "Closed for the season" state.
lifts('mont-rigaud', 'html', {
  'QUAD CHAIR': 'closed',
  'MAGIC CARP.': 'closed'
});
