import groups from './rows.js';

// Apex has no per-lift open/closed field, only an aggregate "N/4 Lifts" count.
// Infer each lift-group's status from its trails: a lift is open iff at least
// one trail served by it has its Open column green. (Matched reality in the
// Feb-2025 winter snapshot.)
export default function parse(dom) {
  const lifts = {};
  for (const g of groups(dom)) {
    lifts[g.lift] = g.trails.some(t => t.open) ? 'open' : 'closed';
  }
  return lifts;
}
