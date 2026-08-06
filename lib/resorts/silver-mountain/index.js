import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { findText } from '../../tools/domutil.js';
import { label } from './rows.js';

// Server-rendered "Trail Status" page. Each lift opens a .box column with
//   <h3 style="...">Chair 1 - <span class="header_open">Open</span></h3>
// followed by that lift's trail <h4> rows. Scoping to section.mountain-stats
// is required - there is a 7th <h3> elsewhere on the page.
// The CMS also emits filler columns whose <h3> carries no header_* badge (the
// 2025-02-15 capture has one holding an orphan trail), so a badge is required.
// Only 'Open' and 'Closed' have ever appeared here; both are known to coerce.
// Never select on the column's own class - 'col-md-4 col-lg-4 39 Yes' embeds a
// CMS row ordinal that changes between page revisions.
export default function parse(dom) {
  const lifts = {};
  for (const h3 of select(dom, 'section.mountain-stats .stats-box .box h3')) {
    const badge = select(h3, 'span.header_open, span.header_closed')[0];
    const name = label(h3);
    if (!badge || !name) {
      continue;
    }
    lifts[name] = coerce(findText(badge));
  }
  return lifts;
}
