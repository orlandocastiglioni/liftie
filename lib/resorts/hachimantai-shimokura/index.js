import coerce from '../../tools/coerce.js';
import rows from './rows.js';
import status from './status.js';

// /winter/shimokura/lift/ - リフト名 | 運行状況 | 運行予定時間 | 備考.
// rows.js drops the Panorama half of the shared table; what is left is
// Shimokura's three chairs: 第1トリプルリフト, 第2ペアリフト, 第3ペアリフト.
export default function parse(dom) {
  const liftStatus = {};
  for (const row of rows(dom)) {
    liftStatus[row.name] = coerce(status(row.status));
  }
  return liftStatus;
}
