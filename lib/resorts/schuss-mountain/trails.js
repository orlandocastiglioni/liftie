import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

// Shanty Creek publishes no per-lift status at all (only an aggregate "5 of 7"
// counter and a prose paragraph), hence "no": {"lifts": true} - there is no
// index.js here. The alpine trail table on the same page is fully machine
// readable: section#schussmtn table.trail-table, four cells per row -
// [0] lift pod, [1] trail name, [2] status, [3] td.diff with the difficulty icon.
//
// The Cross Country table (section#xc) is deliberately NOT merged in: its
// columns are Groomed / Trackset / Skating, i.e. grooming attributes rather
// than an open/closed status, and those trails sit on the Summit/Cedar River
// side of the resort, not on Schuss.

// Statuses beyond plain Open/Closed. "Making Snow" appears while the hill is
// coming online (2025-12-09 capture: 29 Closed / 14 Making Snow) and is not in
// coerce.js, so it would silently become 'scheduled'. Those trails are not
// skiable yet, so report them closed.
const statuses = {
  'making snow': 'closed'
};

export default function parse(dom) {
  const rows = [];
  for (const tr of select(dom, 'section#schussmtn table.trail-table tbody tr')) {
    const cells = select(tr, 'td');
    const name = allText(cells[1])?.trim();
    if (!name) {
      continue;
    }
    const status = allText(cells[2])?.trim() ?? '';
    rows.push({
      name,
      status: statuses[status.toLowerCase()] ?? status,
      // the icon alt is green | blue | black | terrain, all known to
      // normalizeLevel. Do NOT read the legend (div.table_key) instead: it
      // labels the black icon "Expert", which normalizes to doubleBlack and
      // would promote every black run on the hill.
      level: select(cells[3], 'img')[0]?.attribs.alt
    });
  }
  return rows;
}
