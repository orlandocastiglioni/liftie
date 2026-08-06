import select from '../../select.js';
import { findText } from '../../tools/domutil.js';
import { label } from './rows.js';

// Trail rows share the page (and the .box columns) with the lift headers:
//   <h4><i class="fas fa-circle"></i> Alpenway - <span style="...">Groomed</span></h4>
// Collect them flat rather than grouping under the preceding <h3>: the CMS
// emits columns with no lift header at all (2025-02-15 parks "Tubing Park" in
// one), and those runs would otherwise be dropped.
// Status is 'Open' | 'Groomed' | 'Closed' - all three are known to coerce
// (groomed -> open), so the raw token is passed through untouched.
// Difficulty is published only as Font Awesome icons; the four combinations
// below are the only ones that appear in any capture.
function level(h4) {
  const icons = select(h4, 'i').map(i => i.attribs.class ?? '');
  const diamonds = icons.filter(c => /\bfa-diamond\b/.test(c)).length;
  if (diamonds > 0) {
    return diamonds > 1 ? 'doubleBlack' : 'black';
  }
  if (icons.some(c => /\bfa-square\b/.test(c))) {
    return 'blue';
  }
  if (icons.some(c => /\bfa-circle\b/.test(c))) {
    return 'green';
  }
}

export default function parse(dom) {
  const rows = [];
  for (const h4 of select(dom, 'section.mountain-stats .stats-box .box h4')) {
    const badge = select(h4, 'span')[0];
    const name = label(h4);
    if (!badge || !name) {
      continue;
    }
    rows.push({ name, status: findText(badge), level: level(h4) });
  }
  return rows;
}
