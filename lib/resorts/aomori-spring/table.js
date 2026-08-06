import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

/**
 * Lifts and courses share one server-rendered page. Every class on it is a
 * Tailwind utility ('w-full text-sm', 'border-b border-zinc-300 ...') that the
 * theme is free to change, so the only durable anchor is the header row text:
 *
 *   Lift   | Status | Hours | Remarks   - one table, the lift board
 *   Course | Status                     - two tables, side by side in a
 *                                         grid-cols-2 container that splits the
 *                                         course list roughly in half
 *
 * Returns one array of cell-text rows per matching table, in document order, so
 * concatenating the Course tables restores the published order of the courses.
 * Row counts are never assumed: the lift roster went 5 -> 4 between 2024-25 and
 * 2025-26 (the events-only Aspen Pair was dropped) and the course list went
 * 22 -> 23.
 */
export default function tables(dom, first) {
  const found = [];
  for (const table of select(dom, 'table')) {
    const trs = select(table.children, 'tr');
    const header = select(trs[0]?.children ?? [], 'th').map(cell);
    if (header[0] !== first || header[1] !== 'Status') {
      continue;
    }
    const rows = [];
    for (const tr of trs.slice(1)) {
      const cells = select(tr.children, 'td').map(cell);
      if (cells.length > 0) {
        rows.push(cells);
      }
    }
    found.push(rows);
  }
  return found;
}

// names wrap across source lines and one course has shipped with a literal
// double space ('Skyline  Connector'), so whitespace is collapsed rather than
// only trimmed
function cell(node) {
  return (findText(node) ?? '').replace(/\s+/g, ' ').trim();
}
