import coerce from '../../tools/coerce.js';
import reportedAt from './reported-at.js';
import rows, { payload } from './rows.js';
import status from './status.js';

// data.liftsContent, 6 rows. Each row has one state badge and, when the lift is
// down for a reason, a second gray patrol badge naming it - that second badge
// is NOT the status and must never reach coerce. Keying by name also dedupes,
// since the sibling property on this WordPress multisite is known to repeat
// rows for a single lift.
export default function lifts(body) {
  const ls = {};
  for (const { names, badges } of rows(body, 'liftsContent')) {
    const name = names[0]?.trim();
    if (name) {
      ls[name] = coerce(status(badges, 'lifts'));
    }
  }
  const at = reportedAt(payload(body).liftsUpdated);
  if (at) {
    Object.defineProperty(ls, 'reportedAt', { value: at });
  }
  return ls;
}
