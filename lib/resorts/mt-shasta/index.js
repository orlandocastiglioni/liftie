import coerce from '../../tools/coerce.js';
import latest from './rows.js';

/**
 * The daily-conditions sheet (gid=2049094853) carries one "<Lift> - Open?"
 * column per chairlift. Those four are every lift the resort publishes
 * individually - the two magic carpets only ever appear as an aggregate
 * "Carpets Open (#)" count, so they are deliberately not listed.
 *
 * The operator's vocabulary in these cells is Open / Closed / Scheduled, all
 * three of which coerce() already maps; free-text answers ("Fri/Sat Only" and
 * the like) fall through to 'scheduled', which is the intended behaviour. An
 * empty cell means "not reported", so the lift is left out entirely rather
 * than being reported as scheduled.
 *
 * Lift order follows the resort's own report layout.
 */
const lifts = [
  ['Douglas Lift', 'Douglas - Open?'],
  ['Marmot Lift', 'Marmot - Open?'],
  ['Coyote Lift', 'Coyote - Open?'],
  ['Gray Butte Lift', 'Gray Butte - Open?']
];

export default function parse(rows) {
  const cell = latest(rows);
  const status = {};
  if (!cell) {
    return status;
  }
  for (const [name, header] of lifts) {
    const value = cell(header);
    if (value) {
      status[name] = coerce(value);
    }
  }
  return status;
}
