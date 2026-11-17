import coerce from '../../tools/coerce.js';
import isStale from '../../tools/stale.js';
import reportedAt from './reported-at.js';

/**
 * powderridgepark.com (Middlefield, CT - not lib/resorts/powder-ridge-mn) is
 * WordPress, and its trail-report page is filled from the theme's own JSON
 * route, unauthenticated:
 *
 *   /wp-json/sc/v1/trail-report
 *   { lifts: { items: [{ name, status }], last_updated },
 *     trails: { items: [{ name, status }], last_updated },
 *     conditions: { data: {...}, last_updated } }
 *
 * `status` is a plain lowercase word ('open' / 'closed' in every capture);
 * coerce passes both through and logs anything new rather than guessing.
 * Names keep the operator's map number ('1 - Festival (Double)'), which is how
 * the trail map labels them.
 */
export default function lifts(body) {
  const ls = {};
  const at = reportedAt(body?.lifts?.last_updated);
  // the board is never cleared between seasons: in November 2026 it still
  // flagged the Festival double open from a 2026-09-18 bike-park stamp. A
  // block older than stale.js's window publishes no rows (never "closed").
  const stale = at && isStale(new Date(at));
  for (const { name, status } of stale ? [] : (body?.lifts?.items ?? [])) {
    const n = name?.trim();
    if (n) {
      ls[n] = coerce(status);
    }
  }
  if (at) {
    // non-enumerable: metadata about the report, not one of its lifts
    Object.defineProperty(ls, 'reportedAt', { value: at });
  }
  return ls;
}
