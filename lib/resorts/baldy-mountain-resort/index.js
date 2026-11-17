import isFresh from './fresh.js';
import groups from './rows.js';

// Baldy publishes no per-lift status and no aggregate counts. Infer each lift's
// status from its grouped runs: a lift is open iff at least one of its runs is
// open (matched the Jan-2026 winter snapshot).
export default function parse(dom) {
  const lifts = {};
  // last season's report left up all summer publishes nothing - see fresh.js
  if (!isFresh(dom)) {
    return lifts;
  }
  for (const g of groups(dom)) {
    lifts[g.lift] = g.runs.some(r => r.status === 'open') ? 'open' : 'closed';
  }
  return lifts;
}
