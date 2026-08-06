import isStale from '../../tools/stale.js';

/**
 * Spirit Mountain never resets the current-status taxonomy at season end: in
 * August 2026 all five lifts and all 23 trails were still tagged `open`, with
 * the lift posts last modified 2026-02-24 and the trails 2026-04-09. Publishing
 * that verbatim would report a fully open mountain all summer.
 *
 * Every REST item carries its own `modified_gmt`, so the feed dates itself. We
 * take the NEWEST edit anywhere in the payload - one recent write is enough to
 * trust the whole report, because Spirit edits a status only when it changes
 * and a settled midwinter stretch leaves most rows untouched.
 *
 * See lib/tools/stale.js: a payload with no parseable timestamp publishes.
 */
export default function isFresh(items) {
  let newest = 0;
  for (const item of items ?? []) {
    // modified_gmt has no timezone suffix; it is UTC by WordPress definition
    const t = Date.parse(`${item.modified_gmt}Z`);
    if (t > newest) {
      newest = t;
    }
  }
  return !isStale(newest);
}
