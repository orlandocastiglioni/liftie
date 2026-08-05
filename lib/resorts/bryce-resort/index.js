import coerce from '../../tools/coerce.js';
import { rowName, rowStatus, tableRows } from './rows.js';

export default function parse(dom) {
  const liftStatus = {};
  for (const row of tableRows(dom, 'Lifts')) {
    const name = rowName(row);
    if (name) {
      liftStatus[name] = coerce(rowStatus(row));
    }
  }
  return liftStatus;
}
