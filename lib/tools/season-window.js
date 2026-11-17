/**
 * A recurring calendar window for resorts whose report is never dated and
 * never cleared, so stale.js has nothing to measure. Left alone, such a page
 * republishes its last operating day all summer.
 *
 * The window is a pair of month-day strings, e.g. { from: '11-01', to: '04-30' },
 * and it recurs every year (a window whose `from` is later than its `to` wraps
 * over New Year). Outside it the caller publishes NO rows - never "closed",
 * which we do not know - and inside it rows flow untouched.
 *
 * Choose the window generously. It is meant to be wider than any season the
 * hill could run, so that it never blanks a real report: a false "no report"
 * in January is far worse than a stale one in August (see stale.js). The cost
 * of a wide window is a few weeks of last-day report after closing, which is
 * the price of not needing a yearly date edit (compare maple-ski-ridge's
 * `opening` gate, which has to be moved every autumn).
 *
 * Dates are read as calendar days in `timeZone` (default: the resort's own
 * zone is better than the Pi's, but a day either side is immaterial here).
 */
export default function outOfSeason({ from, to }, now = Date.now(), timeZone = 'America/Chicago') {
  const start = monthDay(from);
  const end = monthDay(to);
  if (start === undefined || end === undefined) {
    // a malformed window fails open: publish
    return false;
  }
  const today = monthDay(new Date(now).toLocaleDateString('en-CA', { timeZone }).slice(5));
  if (today === undefined) {
    return false;
  }
  const inside = start <= end ? today >= start && today <= end : today >= start || today <= end;
  return !inside;
}

// 'MM-DD' -> MM * 100 + DD, comparable as a number
function monthDay(str) {
  const m = /^(\d{2})-(\d{2})$/.exec(str ?? '');
  if (!m) {
    return;
  }
  const month = Number(m[1]);
  const day = Number(m[2]);
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return;
  }
  return month * 100 + day;
}
