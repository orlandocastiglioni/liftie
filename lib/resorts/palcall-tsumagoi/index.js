import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { findText } from '../../tools/domutil.js';
import translate from './status.js';

// GONDOLA & LIFTS block: <tr><th>name</th><td>運行中/運休</td></tr>
export default function parse(dom) {
  const liftStatus = {};
  for (const row of select(dom, '.condition-lift table tr')) {
    const name = findText(select(row.children, 'th')[0]);
    const state = findText(select(row.children, 'td')[0]);
    if (name && state) {
      liftStatus[name.trim()] = coerce(translate(state));
    }
  }
  return liftStatus;
}
