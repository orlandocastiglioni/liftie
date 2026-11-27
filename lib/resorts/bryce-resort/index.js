import coerce from '../../tools/coerce.js';
import suppressed, { REASONS } from '../../tools/suppressed.js';
import isFresh, { reportDate } from './fresh.js';
import { rowName, rowStatus, tableRows } from './rows.js';

export default function parse(dom) {
  const liftStatus = {};
  // a months-old report (the bike park's last state) publishes nothing - see fresh.js
  if (!isFresh(dom)) {
    return suppressed(liftStatus, REASONS.stale, reportDate(dom));
  }
  for (const row of tableRows(dom, 'Lifts')) {
    const name = rowName(row);
    if (name) {
      liftStatus[name] = coerce(rowStatus(row));
    }
  }
  return liftStatus;
}
