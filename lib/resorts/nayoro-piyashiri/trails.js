import select from '../../select.js';
import { findText } from '../../tools/domutil.js';
import status from './status.js';

// same right-table markup with th Course; no difficulty markers
export default function parse(dom) {
  const rows = [];
  const seen = new Set();
  for (const table of select(dom, 'table.right-table')) {
    if (!select(table.children, 'th').some(th => /Course/i.test(findText(th) ?? ''))) {
      continue;
    }
    for (const row of select(table.children, 'tr')) {
      const name = findText(select(row.children, 'td.course')[0])?.trim();
      const state = findText(select(row.children, 'td.status')[0]);
      if (name && state && !seen.has(name)) {
        seen.add(name);
        rows.push({ name, status: status(state) });
      }
    }
  }
  return rows;
}
