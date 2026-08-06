import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { findText } from '../../tools/domutil.js';
import status from './status.js';

// /operation/ renders ten table.md_common_table in a fixed order. Exactly two of
// them are lifts, and both are identified by their first header cell reading
// リフト名 - no course table does:
//   * the main LIFT table   リフト名 | 運行時間 | 運行可否 | お知らせ
//   * table#washitopia      リフト名 | 往来時間 | 往来可否 | お知らせ
// The second is ワシトピア往来, the connection over to Washigatake. It sits under
// the COURSE heading in the DOM but is a lift, so the header test picks it up
// wherever the template moves it.
export default function parse(dom) {
  const liftStatus = {};
  for (const table of select(dom, 'table')) {
    const rows = select(table.children, 'tr');
    const header = rows[0] && select(rows[0].children, 'th, td').map(findText);
    if (!header?.[0]?.includes('リフト名')) {
      continue;
    }
    for (const row of rows.slice(1)) {
      const cells = select(row.children, 'th, td').map(findText);
      if (cells[0] && cells[2]) {
        liftStatus[cells[0].trim()] = coerce(status(cells[2]));
      }
    }
  }
  return liftStatus;
}
