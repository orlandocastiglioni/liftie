import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// difficulty labels shown in each trail table's thead - normalizeLevel knows
// them all; the set also filters out the lift table and the single-row
// Snowtubing Park table, which carry no thead label
const sections = new Set(['EASIEST', 'MORE DIFFICULT', 'MOST DIFFICULT', 'TERRAIN PARKS']);

// trails live on the same snow report page as the lifts, one
// table.snowtable1 per difficulty, rows are <tr><td>Name</td><td>Open|Closed</td></tr>
export default function parse(dom) {
  const rows = [];
  for (const table of select(dom, 'table.snowtable1')) {
    const level = findText(select(table, 'thead strong')[0])?.trim();
    if (!level || !sections.has(level.toUpperCase())) {
      continue;
    }
    for (const tr of select(table, 'tbody tr')) {
      const [name, status] = select(tr, 'td').map(findText);
      if (name && status) {
        rows.push({ name, status, level });
      }
    }
  }
  return rows;
}
