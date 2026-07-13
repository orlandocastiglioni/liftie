import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { findText } from '../../tools/domutil.js';
import status from './status.js';

// lift table columns: リフト名 | 運行時間 | 運行可否 | お知らせ
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
