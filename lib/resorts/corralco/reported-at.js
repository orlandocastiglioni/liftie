import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// Lumiplan freezes the board at closing day rather than emptying it, so an
// October report is indistinguishable from today's unless we publish its stamp.
//
// At lang=en the header reads "Last Update 08/06/2026 at 8:08 AM" - MM/DD/YYYY
// on a 12-hour clock. Confirmed by fetching the same report at lang=es and
// lang=fr in the same minute: both render "06/08/2026" on a 24-hour clock, so
// the en ordering is month-first, not day-first.
//
// usa.lumiplan.pro stamps the time in resort-local time but puts no offset in
// the markup, so assume -04:00 (America/Santiago standard time). That covers
// most of the Jun-Oct season; once Chile moves to -03:00 in September the
// stamp is an hour early, which is immaterial for a staleness date.
const re = /(\d{1,2})\/(\d{1,2})\/(\d{4})\D+(\d{1,2}):(\d{2})\s*(AM|PM)?/i;

export default function reportedAt(dom) {
  const m = findText(select(dom, '.intro_maj')[0])?.match(re);
  if (!m) {
    return;
  }
  const [, month, day, year, h, minute, meridiem] = m;
  let hour = Number(h);
  if (meridiem) {
    hour %= 12;
    if (/pm/i.test(meridiem)) {
      hour += 12;
    }
  }
  const pad = n => String(n).padStart(2, '0');
  const date = new Date(`${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${minute}:00-04:00`);
  if (!Number.isNaN(date.getTime())) {
    return date.toISOString();
  }
}
