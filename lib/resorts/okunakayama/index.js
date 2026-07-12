import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { findText } from '../../tools/domutil.js';
import status from './status.js';

// lifts table follows the リフト heading; rows are <th|td>name</> <td>status</td>
export default function parse(dom) {
  const liftStatus = {};
  for (const row of select(dom, 'h3:contains(リフト) + figure table tr')) {
    const cells = row.children.filter(c => c.name === 'th' || c.name === 'td');
    const name = findText(cells[0])?.trim();
    const state = findText(cells[1]);
    if (name && state) {
      liftStatus[name] = coerce(status(state));
    }
  }
  return liftStatus;
}
