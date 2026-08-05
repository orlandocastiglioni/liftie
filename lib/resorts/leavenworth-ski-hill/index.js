import coerce from '../../tools/coerce.js';
import statusRows from './rows.js';

// status vocabulary on this feed is exactly {open, closed}; both coerce
// directly, anything new degrades to 'scheduled'
export default function parse(body) {
  const status = {};
  for (const row of statusRows(body)) {
    if (row.isLift) {
      status[row.name] = coerce(row.status);
    }
  }
  return status;
}
