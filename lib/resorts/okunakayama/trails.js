import select from '../../select.js';
import { findText } from '../../tools/domutil.js';
import status from './status.js';

// course tables follow the コース名 heading; no difficulty markers on the page
export default function parse(dom) {
  const rows = [];
  for (const row of select(dom, 'h3:contains(コース名) ~ div table tr')) {
    const cells = row.children.filter(c => c.name === 'th' || c.name === 'td');
    const name = findText(cells[0])?.trim();
    const state = findText(cells[1]);
    if (name && state) {
      rows.push({ name, status: status(state) });
    }
  }
  return rows;
}
