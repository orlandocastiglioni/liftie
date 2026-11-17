import coerce from '../../tools/coerce.js';
import { beforeOpening } from './season.js';
import { cellsOf, cellText, rowsOf, tableByHeader } from './table.js';

// lift rows sit in the table headed "Lift Name" / "Lift Open": two cells,
// name then status. The status vocabulary is Yes/No, both already known to
// coerce (yes -> open, no -> closed)
export default function parse(dom) {
  const lifts = {};
  const table = tableByHeader(dom, 'Lift Name');
  // last season's undated report until opening day (season.js)
  if (!table || beforeOpening()) {
    return lifts;
  }
  for (const row of rowsOf(table)) {
    const cells = cellsOf(row);
    const name = cellText(cells[0]);
    const status = cellText(cells[1]);
    if (name && status) {
      lifts[name] = coerce(status);
    }
  }
  return lifts;
}
