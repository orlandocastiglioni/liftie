import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// one table per difficulty section: <h3>Green Circle Trails (Easy)</h3><div><table>...
export default function parse(dom) {
  const rows = [];
  for (const h3 of select(dom, 'h3')) {
    const heading = findText(h3) ?? '';
    const m = heading.match(/^(Green|Blue|Black|Double Black)[\w\s]*Trails/i);
    if (!m) {
      continue;
    }
    const table = h3.next?.name === 'div' ? select(h3.next.children, 'table tr') : [];
    for (const row of table) {
      const tds = row.children.filter(c => c.name === 'td');
      const name = findText(tds[0]);
      const status = findText(tds[1]);
      if (name && status) {
        rows.push({ name: name.trim(), status, level: m[1] });
      }
    }
  }
  return rows;
}
