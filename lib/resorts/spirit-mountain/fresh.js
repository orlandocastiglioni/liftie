/**
 * Spirit Mountain never resets the current-status taxonomy at season end: in
 * August 2026 all five lifts and all 23 trails were still tagged `open`, with
 * the lift posts last modified 2026-02-24 and the trails 2026-04-09. Publishing
 * that verbatim would report a fully open mountain all summer.
 *
 * Every REST item carries its own `modified_gmt`, so the feed dates itself: if
 * nothing in the payload has been touched recently, there is no current report
 * and we say nothing rather than repeating the last thing they typed.
 *
 * The threshold is generous on purpose. Spirit edits a status only when it
 * changes, so a settled midwinter week can pass without a single write; a month
 * of silence cannot happen while they are actually running lifts.
 */
const STALE_AFTER_DAYS = 30;

export default function isFresh(items) {
  let newest = 0;
  for (const item of items ?? []) {
    // modified_gmt has no timezone suffix; it is UTC by WordPress definition
    const t = Date.parse(`${item.modified_gmt}Z`);
    if (t > newest) {
      newest = t;
    }
  }
  if (!newest) {
    return false;
  }
  return Date.now() - newest <= STALE_AFTER_DAYS * 86400000;
}
