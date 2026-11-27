import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { gated, status, text } from './report.js';

// The "Chair Lifts Status" block (report.js): one <tr> per lift, the name in
// the row's <th scope=row>. Seven lifts, from Buttercup Chair to Wildwood
// Express. The "Uphill Status" block uses the same table class and is skipped.
export default function parse(dom) {
  return gated(dom, 'Chair Lifts Status', {}, node => {
    const lifts = {};
    for (const row of select(node, 'table.sr-table--lifts tbody tr')) {
      const name = text(select(row, 'th[scope="row"]')[0]).replace(/\s+/g, ' ').trim();
      const s = status(row);
      if (name && s) {
        lifts[name] = coerce(s);
      }
    }
    return lifts;
  });
}
