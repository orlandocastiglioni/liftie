import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { findText } from '../../tools/domutil.js';
import status from './status.js';

// table.right-table with th LIFT: td.course name, td.status state
export default function parse(dom) {
  const liftStatus = {};
  for (const table of select(dom, 'table.right-table')) {
    if (!select(table.children, 'th').some(th => /LIFT/i.test(findText(th) ?? ''))) {
      continue;
    }
    for (const row of select(table.children, 'tr')) {
      const name = findText(select(row.children, 'td.course')[0]);
      const state = findText(select(row.children, 'td.status')[0]);
      if (name && state) {
        liftStatus[name.trim()] = coerce(status(state));
      }
    }
  }
  return liftStatus;
}
