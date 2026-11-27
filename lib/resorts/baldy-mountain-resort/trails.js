import suppressed, { REASONS } from '../../tools/suppressed.js';
import isFresh, { reportDate } from './fresh.js';
import groups from './rows.js';

// trail rows share the /baldy-weather-cams/ page with the lifts (trails: true);
// flatten each lift-group's runs in page order. status ('open'/'closed') and
// level ('green'/'blue'/'black'/'doubleBlack') are already canonical liftie
// tokens - see rows.js.
export default function parse(dom) {
  const rows = [];
  // last season's report left up all summer publishes nothing - see fresh.js
  if (!isFresh(dom)) {
    return suppressed(rows, REASONS.stale, reportDate(dom));
  }
  for (const g of groups(dom)) {
    for (const r of g.runs) {
      rows.push({ name: r.name, status: r.status, level: r.level });
    }
  }
  return rows;
}
