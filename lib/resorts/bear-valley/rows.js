import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

/**
 * bearvalley.com/lift-and-trail-status is an empty Wix shell - the status
 * lives in an embedded Alterra "TE2" Angular widget at
 * weather.te2.io/status?configFile=bear-valley. Its JSON API
 * (/v1/conditions/CP_BV/lifts|trails) needs an anonymous Bearer token that
 * has to be re-minted every 24h, which resort.json cannot express, so the
 * widget itself is rendered and the rows are read out of the DOM. The
 * rendered rows are 1:1 with the API (9 lifts, 103 trails, same names and
 * same difficulty icons).
 *
 * The widget only ever renders one tab, so `show=lifts` / `show=trails`
 * selects which. The value MUST be lowercase: the app compares it against
 * its internal service names ('lifts', 'trails', 'activities') and any other
 * spelling - `show=Trails` included - disables every tab and renders an
 * empty page.
 */
export function venueName(node) {
  return findText(select(node, '.venue-name')[0]);
}

/**
 * `.venue-status` carries the bucket the widget itself resolved from the
 * API's `statusLabel`: status-open | status-hold | status-closed, the only
 * three its stylesheet defines. That resolved class is preferred over the
 * visible `.status-text` label, which is free-form and full of tokens coerce
 * does not know ('Mechanical Hold', 'Patrol Closure', 'Open Top', '30
 * Minutes Or Less', ...) and would silently become 'scheduled'. The label is
 * only the fallback for a row that somehow has no status class.
 */
export function venueStatus(node) {
  const bucket = select(node, '.venue-status')[0]?.attribs.class?.match(/status-(open|hold|closed)\b/)?.[1];
  return bucket ?? findText(select(node, '.status-text')[0]);
}
