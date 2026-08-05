import lifts from '../lifts/index.js';

// Fixture: live montedouard.com/info-remontee (no winter Wayback capture
// exists). Two published lifts (Sommet, Mi-montagne); the LÉGENDE / CHART box
// is excluded. Both show "Opération normale - Regular operation" (open) in the
// off-season default.
lifts('mont-edouard', 'html', {
  'Sommet / Summit': 'open',
  'Mi-montagne/Mid-mountain': 'open'
});
