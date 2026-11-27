import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

const HEADERS = ['DIFFICULTY', 'STATUS', 'NAME'];

// status and difficulty cells contain no text, only icon images -
// the icon file name (icon_open.png, icon_more_difficult.png...) is the value
function iconToken(cell) {
  const img = cell && select(cell.children, 'img')[0];
  return img?.attribs.src?.match(/icon_(\w+)\.png/)?.[1];
}

// a run served by two lifts is listed under both: on 2026-11-26 'Take Off'
// sat in the Chet's Dream table and again in the Lift 7 table, and was
// counted twice. Keep one row per name, in first-seen order; if the copies
// disagree, the run is open when any lift's table says it is - it is
// reachable from that lift.
function dedupe(rows) {
  const byName = new Map();
  for (const row of rows) {
    const seen = byName.get(row.name);
    if (!seen) {
      byName.set(row.name, row);
    } else if (row.status === 'open') {
      seen.status = 'open';
    }
  }
  return [...byName.values()];
}

// trails are split into per-lift TablePress tables on the same page as lifts;
// table ids change, so recognize trail tables by their header row instead
export default function parse(dom) {
  const rows = [];
  for (const table of select(dom, 'table.tablepress')) {
    const headers = select(table.children, 'thead th').map(th => findText(th)?.trim());
    if (HEADERS.some((header, i) => headers[i] !== header)) {
      continue;
    }
    for (const tr of select(table.children, 'tbody tr')) {
      const name = findText(select(tr.children, 'td.column-3')[0])?.trim();
      if (!name) {
        // TablePress pads short tables with fully empty rows
        continue;
      }
      rows.push({
        name,
        status: iconToken(select(tr.children, 'td.column-2')[0]),
        // icon_beginner, icon_more_difficult... - normalizeLevel knows these
        level: iconToken(select(tr.children, 'td.column-1')[0])
      });
    }
  }
  return dedupe(rows);
}
