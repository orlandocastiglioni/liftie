import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { findText } from '../../tools/domutil.js';
import { repeaterRows } from './rows.js';

// Lift rows are the first repeater on /trail-map. Each row holds four <h5>s:
// name, lift type, status, night-skiing flag.
//
// The status cell merges the status with the operating hours into a single
// text node - "Open 9am - 4pm" - which coerce would strip to 'open9am4pm' and
// silently downgrade to 'scheduled', so only the leading status word is used.
// The fourth cell ("Closed Nights" / "Open for Night Skiing") is a night
// skiing flag, NOT the day status, and is deliberately never coerced.
const LEADING_STATUS = /^\s*(wind\s*hold|weather\s*hold|on\s*hold|hold|open|closed|scheduled|delayed)\b/i;

function cell(row, className, index) {
  return findText(select(row, `.${className} h5`)[0] ?? select(row, 'h5')[index]);
}

export default function parse(dom) {
  const lifts = {};
  for (const row of repeaterRows(dom, 'comp-ku2eej1x', 0)) {
    const name = cell(row, 'comp-ku2eej4r1', 0)?.trim();
    const status = cell(row, 'comp-ku2emhj5', 2)?.trim();
    if (!name || !status) {
      continue;
    }
    lifts[name] = coerce(status.match(LEADING_STATUS)?.[1] ?? status);
  }
  return lifts;
}
