import coerce from '../../tools/coerce.js';
import { grid, marker, NAME, status } from './rows.js';

// lifts sit below the "Lifts" marker row and above the "Key" legend block;
// requiring a status in column C drops the free-text note rows the operator
// leaves between them ("TRAILS ACCESSABLE FROM MEGA TOW ...")
export default function parse(dom) {
  const rows = grid(dom);
  const first = marker(rows, 'Lifts');
  if (first < 0) {
    return {};
  }
  const last = marker(rows, 'Key');
  const lifts = {};
  for (const row of rows.slice(first + 1, last < 0 ? undefined : last)) {
    const name = row[NAME]?.text;
    const value = status(row);
    if (name && value) {
      lifts[name] = coerce(value);
    }
  }
  return lifts;
}
