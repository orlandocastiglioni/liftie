import coerce from '../../tools/coerce.js';
import statusRows from './rows.js';

export default function parse(rows) {
  const status = {};
  for (const row of statusRows(rows)) {
    if (row.isLift) {
      status[row.name] = coerce(row.status);
    }
  }
  return status;
}
