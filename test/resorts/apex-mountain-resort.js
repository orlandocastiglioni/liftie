import lifts from '../lifts/index.js';

// Apex has no per-lift status field; each lift's open/closed is inferred from
// whether any of its grouped trails is open (see lib/resorts/apex-mountain-resort/rows.js).
// Fixture: raw Feb-2025 winter wayback snapshot of /weather/ (3/4 lifts, 66/85 trails).
lifts('apex-mountain-resort', 'html', {
  'Quickdraw - Quad': 'open',
  "Stock's Chair": 'open',
  'Wildside': 'closed',
  'T-Bar': 'open',
  'Magic Carpet': 'open'
});
