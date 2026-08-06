/**
 * Shared staleness policy for resorts that never clear their conditions page at
 * the end of the season. Left alone, those parsers republish the last operating
 * day's report all summer - Beaver Mountain showed 3 of 6 lifts open in August,
 * Spirit Mountain a fully open mountain.
 *
 * The whole design goal is that this can NEVER blank a resort during its season.
 * A false "no report" in January is far worse than a stale one in August: nobody
 * is checking lift status in August, and everybody is in January. So:
 *
 * 1. FAIL OPEN. A report is suppressed only when we can PROVE it is old. No date
 *    found, an unparseable date, a future date, a clock skew - all publish. If a
 *    resort rewords its date stamp mid-season the report keeps flowing; the only
 *    cost is that the summer staleness comes back until someone notices.
 *
 * 2. THE THRESHOLD IS DELIBERATELY FAR BEYOND ANY OPERATING GAP. 45 days is
 *    long enough that no resort actually running lifts can reach it: daily
 *    reporters miss it by 6 weeks, weekend-only hills like Arctic Valley would
 *    have to skip six consecutive weekends, and a Nordic club that only edits a
 *    status when it changes would have to sit unchanged for a month and a half.
 *    It still catches the real target, which is a report 3-6 months old.
 *
 * 3. SUPPRESSED MEANS NO ROWS, NEVER "CLOSED". Callers return {} or [] so the
 *    payload carries no lift/trail entries at all. Emitting `closed` would be a
 *    positive claim that the mountain is shut, which we do not know.
 */
export const STALE_AFTER_DAYS = 45;

const DAY = 86400000;

/**
 * @param when  Date, epoch ms, or anything falsy/unparseable
 * @param days  override only with a LONGER window; shorter risks in-season blanking
 * @returns true only when `when` is provably older than the window
 */
export default function isStale(when, days = STALE_AFTER_DAYS) {
  if (!when) {
    return false;
  }
  // only a Date or a number is a timestamp. Anything else - notably [], which
  // Number() happily turns into 0 and would date to 1970 - is "unknown".
  if (!(when instanceof Date) && typeof when !== 'number') {
    return false;
  }
  const t = when instanceof Date ? when.getTime() : when;
  if (!Number.isFinite(t)) {
    return false;
  }
  const age = Date.now() - t;
  // a future timestamp means a timezone or clock disagreement, not a stale page
  if (age < 0) {
    return false;
  }
  return age > days * DAY;
}
