import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { allText } from '../../tools/domutil.js';

// Marble Mountain publishes lift + trail status as WordPress "Ninja Tables"
// server-rendered on /terrain-status/. There are four single-cell "lift status"
// tables, each identified by a header column classed `ninja_clmn_nm_lift`; the
// stat-tile summary tables at the top use different column classes and are
// skipped. The one data <td> reads "Lift Name <dash> STATUS" - usually a
// U+2013 en-dash, but the Lightning Express cell uses a plain hyphen - so we
// split on the last dash of any kind. Status vocab is OPEN / CLOSED, both of
// which coerce cleanly.
export default function parse(dom) {
  const lifts = {};
  for (const table of select(dom, 'table')) {
    if (select(table, 'th.ninja_clmn_nm_lift').length === 0) {
      continue;
    }
    for (const td of select(table, 'tbody td')) {
      const cell = allText(td).replace(/\s+/g, ' ').trim();
      const idx = Math.max(cell.lastIndexOf('–'), cell.lastIndexOf('—'), cell.lastIndexOf('-'));
      if (idx < 0) {
        continue;
      }
      const name = cell.slice(0, idx).trim();
      const status = cell.slice(idx + 1).trim();
      if (name) {
        lifts[name] = coerce(status);
      }
    }
  }
  return lifts;
}
