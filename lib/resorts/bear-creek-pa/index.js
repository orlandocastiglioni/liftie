import coerce from '../../tools/coerce.js';
import statusRows, { isLift } from './rows.js';

// rows under the "Lifts" heading; the page's own legend documents exactly
// three statuses - Open, Closed, On Hold - all of which coerce.js knows.
export default function parse(dom) {
  const status = {};
  for (const row of statusRows(dom)) {
    if (isLift(row)) {
      status[row.name] = coerce(row.status);
    }
  }
  return status;
}
