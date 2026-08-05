import coerce from '../../tools/coerce.js';
import { allText } from '../../tools/domutil.js';
import tableRows, { status } from './rows.js';

// "Lift Status" rows are <tr><th scope="row">NAME</th><td>STATUS</td></tr>.
// The row count is not stable - the off-season page drops the Copper Hoist row
// while Fast Facts still counts three lifts - so iterate whatever rows exist.
export default function parse(dom) {
  const lifts = {};
  for (const cells of tableRows(dom, 'Lift Status')) {
    if (cells.length < 2) {
      continue;
    }
    const name = allText(cells[0]).trim();
    if (name) {
      lifts[name] = coerce(status(allText(cells[1])));
    }
  }
  return lifts;
}
