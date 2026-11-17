import select from '../../select.js';
import { findText } from '../../tools/domutil.js';
import isStale from '../../tools/stale.js';

/**
 * The 2026-11 redesign keeps the closing-season trail flags up: fetched on
 * 2026-11-17 the page read "97% TERRAIN OPEN" (58 of 60 trails open, 0 of 6
 * lifts) under "Hours of Operation: Closed for the season" and a snow report
 * stamped "Updated September 22, 2026 at 9:42 PM".
 *
 * The stamp is the only date on the report, so trails are gated on it with the
 * shared fail-open policy (lib/tools/stale.js): no stamp, an unreadable one or a
 * future one all publish. Lifts are not gated - their rows already read closed.
 */
export default function isFresh(dom) {
  const text = findText(select(dom, '.gbr-snow-report__updated')[0]) ?? '';
  const m = text.match(/Updated\s+([A-Z][a-z]+ \d{1,2}, \d{4})/);
  if (!m) {
    return true;
  }
  const when = new Date(m[1]);
  return !isStale(Number.isNaN(when.getTime()) ? undefined : when);
}
