import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// WordPress/Avada with server-rendered TablePress tables; the chairlifts live
// in table#tablepress-9 (accordion panel 'CHAIRLIFT STATUS'), td.column-1 =
// name, td.column-2 = status. Two non-lift rows have to go: a colspan footer
// holding the 'View Complete Chairlift Schedule & Hours' link, and an
// 'Hours of Operation' pseudo-row that appears in summer.
//
// statuses seen: Open, Closed, 'Open at 10AM' - the last one is not in
// coerce.js and would become 'scheduled', so anything starting with "open"
// is reported open.
export default {
  selector: 'table#tablepress-9 tbody tr',
  parse(row) {
    const cells = select(row, 'td');
    if (cells.length < 2) {
      return;
    }
    const name = findText(cells[0])?.trim();
    if (!name || /^hours of operation$/i.test(name)) {
      return;
    }
    const status = findText(cells[1])?.trim();
    return { name, status: /^open/i.test(status) ? 'open' : status };
  }
};
