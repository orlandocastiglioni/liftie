import select from '../../select.js';
import { findText } from '../../tools/domutil.js';
import isStale from '../../tools/stale.js';

const DAY = 86400000;

/**
 * Hoodoo never resets the TablePress tables at season end. Fetched on
 * 2026-11-17 the page still served closing week: 30 of 42 trails OPEN, five
 * lifts with posted hours, under "Closed until next season." and a Ski
 * Schedule (#tablepress-9) whose rows run 3/12 to 3/17.
 *
 * That schedule is the only date on the page. It is M/D with no year, so each
 * date is placed in the year that puts it closest to today (a date more than a
 * month ahead belongs to last year), and the latest one dates the report.
 * Fail open (lib/tools/stale.js): no table or no readable date publishes, which
 * covers the older weekday-only layout of the same table.
 */
export default function isFresh(dom, now = Date.now()) {
  const year = new Date(now).getFullYear();
  const dates = select(dom, '#tablepress-9 tbody td.column-1')
    .map(td =>
      findText(td)
        ?.trim()
        .match(/^(\d{1,2})\/(\d{1,2})$/)
    )
    .filter(Boolean)
    .map(([, mm, dd]) => {
      const d = new Date(year, Number(mm) - 1, Number(dd));
      if (d.getTime() - now > 30 * DAY) {
        d.setFullYear(year - 1);
      }
      return d.getTime();
    });
  if (!dates.length) {
    return true;
  }
  return !isStale(Math.max(...dates));
}
