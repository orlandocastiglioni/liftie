import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// Eaglecrest publishes its terrain across three TablePress tables on the same
// conditions page, in this document order:
//   tablepress-15 'GROOMING & TRAIL REPORT' (the named alpine runs)
//   tablepress-5  'NORDIC GROOMING REPORT'  (4 aggregate skate/classic rows)
//   tablepress-10 'GATES & PARKS'
// tablepress-8 (weather) and tablepress-19 (uphill prose) are not terrain.
// East Bowl Chutes / West Bowl / Steep Chutes appear in both 15 and 10 in
// mid-winter, so the first occurrence - the trail report - wins.
//
// Every table is name | status, with a colspan disclaimer row at the end of
// 5 and 10 (dropped by the <2 cells check). No difficulty is published
// anywhere, so trails carry no level.
//
// statuses seen: Groomed (coerce -> open), Open, Closed and
// 'Open Not Groomed', which is the most common mid-winter value and is not in
// coerce.js - anything starting with "open" is reported open.
const TERRAIN_TABLES = /^tablepress-(15|10|5)$/;

export default function parse(dom) {
  const rows = [];
  const seen = new Set();
  for (const table of select(dom, 'table[id^=tablepress-]')) {
    if (!TERRAIN_TABLES.test(table.attribs.id)) {
      continue;
    }
    for (const row of select(table, 'tbody tr')) {
      const cells = select(row, 'td');
      if (cells.length < 2) {
        continue;
      }
      const name = findText(cells[0])?.trim();
      const status = findText(cells[1])?.trim();
      if (!name || !status || seen.has(name)) {
        continue;
      }
      seen.add(name);
      rows.push({ name, status: /^open/i.test(status) ? 'open' : status });
    }
  }
  return rows;
}
