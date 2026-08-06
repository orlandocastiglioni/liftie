import coerce from '../../tools/coerce.js';
import status from './status.js';
import tables from './table.js';

// Lift board: Lift | Status | Hours | Remarks. Only column 1 is the state -
// Hours is where Japanese leaks into this otherwise English page (full-width
// times, or 営業終了 once the season is over) and Remarks carries free text
// such as 'Closed for this season'.
export default function parse(dom) {
  const lifts = {};
  for (const rows of tables(dom, 'Lift')) {
    for (const [name, state] of rows) {
      if (name && state) {
        lifts[name] = coerce(status(state));
      }
    }
  }
  return lifts;
}
