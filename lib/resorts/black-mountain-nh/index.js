import coerce from '../../tools/coerce.js';
import rows, { status } from './report.js';

// the strip under the LIFTS heading; five lifts, the last of which the
// operator renames mid-season (Rope Tow <-> Fluffy Cow Handle Tow)
export default function parse(dom) {
  const lifts = {};
  for (const row of rows(dom, true)) {
    lifts[row.name] = coerce(status(row.status));
  }
  return lifts;
}
