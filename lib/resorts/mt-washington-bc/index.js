import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { findText } from '../../tools/domutil.js';

// Joomla / SP Page Builder lift report. Every lift is a
// div.slope-grid-container.slope-grid-rows (the column-header row lacks
// slope-grid-rows and is therefore excluded by the selector). The NAME is the
// <a> in cell 1. STATUS is encoded ONLY by cell 1's FontAwesome icon:
//   fa-check-square-o -> open, fa-window-close -> closed. The cell-2 TIME text
// (e.g. "9:00 am - 3:30 pm") must NOT be coerced - it would fall through to
// 'scheduled' - so status is derived from the icon class.
export default function parse(dom) {
  const status = {};
  for (const row of select(dom, 'div.slope-grid-container.slope-grid-rows')) {
    const name = findText(select(row, 'a')[0])?.trim();
    if (!name) {
      continue;
    }
    const cls = select(row, 'span.fa')[0]?.attribs?.class || '';
    let token;
    if (/\bfa-check-square-o\b/.test(cls)) {
      token = 'open';
    } else if (/\bfa-window-close\b/.test(cls)) {
      token = 'closed';
    }
    if (token) {
      status[name] = coerce(token);
    }
  }
  return status;
}
