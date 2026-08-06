import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// Trails sit on the same mountain-status page as the lifts, grouped into
// collapsible div.stuts_rw blocks. The level comes from the group's data-level
// attribute, never from its visible span.lvl label: the site labels both the
// BLUE_SQUARE and the BLACK_DIAMOND group "MORE DIFFICULT". Every data-level
// value the page emits (GREEN_CIRCLE, BLUE_SQUARE, BLACK_DIAMOND,
// DOUBLE_BLACK_DIAMOND, TERRAIN_PARKS) resolves through normalizeLevel.
//
// The one exception is the uphill-skinning group, which is tagged
// data-level="BLACK" although its routes carry no difficulty rating at all -
// detected by its "UPHILL ROUTES" label and left unrated.
//
// div.trl_nm holds the name as its own text node followed by a <span> grooming
// badge (GROOMED / MORNING_GROOMED / PARTIALLY_GROOMED / NOT_GROOMED / UNDEF).
// None of those are statuses - the status is div.trl_opn (OPEN | CLOSED).
export default function parse(dom) {
  const rows = [];
  for (const group of select(dom, 'div.stuts_rw[data-level]')) {
    const label = findText(select(group, '.stuts_itm .lvl')[0]) ?? '';
    const level = /uphill/i.test(label) ? undefined : group.attribs['data-level'];
    for (const item of select(group, '.itm_list li')) {
      const name = findText(select(item, '.trl_nm')[0]);
      const status = findText(select(item, '.trl_opn')[0]);
      if (!name || !status) {
        continue;
      }
      rows.push({ name, status, level });
    }
  }
  return rows;
}
