import coerce from '../../tools/coerce.js';
import rows from './rows.js';
import status from './status.js';

// The four chairs are the rows whose name contains リフト
// (第１ペアリフトＡ / 第１ペアリフトＢ / 第２ペアリフト / 第３ペアリフト,
// full-width Latin); every other row on the board is a course.
export default function parse(dom) {
  const liftStatus = {};
  for (const row of rows(dom)) {
    if (row.name.includes('リフト')) {
      liftStatus[row.name] = coerce(status(row.status));
    }
  }
  return liftStatus;
}
