import select from '../../select.js';
import { findText } from '../../tools/domutil.js';
import isStale from '../../tools/stale.js';

/**
 * Baldy's grooming report is hand-edited page content, so the WordPress
 * "updated" stamp the theme prints (span.updated, ISO 8601) moves with every
 * edit: a 2026-01-17 capture carried 2026-01-16T07:51. The page is not reset at
 * season end - on 2026-11-17, under "We're closed for the 25/26 season", it still
 * showed Eagle Chair and Baldy Trail open with the stamp at 2026-04-16.
 *
 * Fails open like every lib/tools/stale.js caller: no stamp or an unreadable
 * one publishes as before.
 */
export default function isFresh(dom) {
  const stamp = findText(select(dom, 'span.updated')[0])?.trim();
  const t = stamp ? Date.parse(stamp) : Number.NaN;
  return !isStale(Number.isFinite(t) ? t : undefined);
}
