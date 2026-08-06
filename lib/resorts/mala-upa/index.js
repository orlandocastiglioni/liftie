import coerce from '../../tools/coerce.js';
import rows, { text } from './rows.js';
import status from './status.js';

// PROVOZ VLEKŮ table. Cells: [0] td.stav status span, [1] name, [2] type
// (always the literal 'vlek' - all nine are surface lifts), [3] length,
// [4] capacity. Eight of the nine names also appear in the slope table with
// slightly different wording; that overlap is real, not a duplicate.
export default function lifts(dom) {
  const ls = {};
  for (const { state, cells } of rows(dom, 'PROVOZ VLEKŮ')) {
    const name = text(cells[1]);
    if (name) {
      ls[name] = coerce(status(state));
    }
  }
  return ls;
}
