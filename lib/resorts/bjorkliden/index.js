import coerce from '../../tools/coerce.js';
import reportedAt from './reported-at.js';
import rows, { payload } from './rows.js';
import status from './status.js';

export default function lifts(body) {
  const ls = {};
  // The feed repeats rows: the live roster returns 7 for 5 distinct lifts
  // (Lappbergsliften and Rakkasliften twice each, same spec, different DOM
  // ids). Keying by name dedupes them. The roster itself is edited between
  // seasons too - March listed Kåtaliften where August lists Kitteldalsliften -
  // so nothing here may assume a fixed set of names.
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
