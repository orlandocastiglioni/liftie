import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// one ea-advanced-data-table per section; the first header cell names it
// (Lifts / Beginner Trails / Intermediate Trails / Expert Trails / Terrain Park / Tubing)
export default function sections(dom) {
  const result = [];
  for (const table of select(dom, 'table.ea-advanced-data-table')) {
    const section = findText(select(table.children, 'thead th')[0])?.trim();
    if (!section) {
      continue;
    }
    for (const row of select(table.children, 'tbody tr')) {
      const tds = row.children.filter(c => c.name === 'td');
      const name = findText(select(tds[0]?.children ?? [], 'span')[0] ?? tds[0]);
      const status = findText(select(tds[1]?.children ?? [], 'span')[0] ?? tds[1]);
      if (name && status) {
        result.push({ section, name: name.trim(), status });
      }
    }
  }
  return result;
}
