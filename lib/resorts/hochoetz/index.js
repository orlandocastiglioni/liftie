import coerce from '../../tools/coerce.js';
import reportedAt from './reported-at.js';
import rows from './rows.js';
import status from './status.js';

// The 15 rows under the 'lifts' caption on the Skigebietsmanager page for
// region_id 593. Names carry the operator's own map letter ('H2 - 8EUB
// Ochsengartenbahn'); keep it, it is how the piste map labels them.
export default function lifts(dom) {
  const ls = {};
  for (const row of rows(dom, 'lifts')) {
    ls[row.name] = coerce(status(row.status));
  }
  const at = reportedAt(dom);
  if (at) {
    // non-enumerable, or stats.js counts it as a 16th lift
    Object.defineProperty(ls, 'reportedAt', { value: at });
  }
  return ls;
}
