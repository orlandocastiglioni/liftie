import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import cellText from './text.js';

// hours-and-lifts carries a single table in div.content.prose:
// Lifts | Status | Length | Ride/Time Minutes | Vertical. The header row uses
// <th>, every other row is one lift with five <td>s. Status is 'OPEN' or
// 'CLOSED', both known to coerce.
export default function parse(dom) {
  const liftStatus = {};
  for (const row of select(dom, 'div.content.prose table tr')) {
    if (select(row, 'th').length > 0) {
      continue;
    }
    const cells = select(row, 'td');
    if (cells.length < 2) {
      continue;
    }
    // '4 The Birds (Chair 4)*' - the asterisk is a "weekends and holidays
    // only" footnote marker, not part of the name
    const name = cellText(cells[0]).replace(/\*+$/, '').trim();
    const status = cellText(cells[1]);
    if (name && status) {
      liftStatus[name] = coerce(status);
    }
  }
  return liftStatus;
}
