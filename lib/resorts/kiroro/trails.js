import select from '../../select.js';
import { findText } from '../../tools/domutil.js';
import { itemName, itemStatus, reportedAt } from './rows.js';

// Two of the three div.operation-status blocks on /dashboard/ hold courses;
// the third is the lift panel and is excluded by its modifier class.
//
// COURSE STATUS: one flat div.operation-status__inner where
// <span class="ttl-status">Beginner|Intermediate|Advanced</span> headings are
// interleaved with the rows they label, so the heading is carried forward while
// walking the children in document order (css-select cannot express
// preceding-sibling). All three words resolve in lib/trails/parse.js to
// green / blue / black.
//
// TREE RUN AREA (inside #anc-offpiste): the same markup without any
// ttl-status heading, so those five rows come out level-less. The resort counts
// them separately from its 24 official courses - the header widget says
// '24/24 Trail Open' while these are listed on their own - but they are real
// terrain with a published open/closed state, so they are included.
//
// A fourth block, 'Snow feature', exists in the source but is wrapped in an
// HTML comment and therefore never reaches the dom.
export default function parse(dom) {
  const rows = [];
  for (const inner of select(dom, '.operation-status:not(.operation-status--lift) .operation-status__inner')) {
    let level;
    for (const node of inner.children) {
      if (node.type !== 'tag') {
        continue;
      }
      const cls = node.attribs.class ?? '';
      if (/(^|\s)ttl-status(\s|$)/.test(cls)) {
        level = findText(node)?.trim();
        continue;
      }
      if (!/(^|\s)operation-status-item(\s|$)/.test(cls)) {
        continue;
      }
      const name = itemName(node);
      const status = itemStatus(node);
      if (name && status) {
        rows.push(level ? { name, status, level } : { name, status });
      }
    }
  }
  const at = reportedAt(dom);
  if (at) {
    // non-enumerable: metadata about the list, not one of its rows
    Object.defineProperty(rows, 'reportedAt', { value: at });
  }
  return rows;
}
