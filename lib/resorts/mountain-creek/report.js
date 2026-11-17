import select from '../../select.js';
import { allText, findText } from '../../tools/domutil.js';
import isStale from '../../tools/stale.js';

/**
 * mountaincreek.com's snow overview (theme mountaincreek2022) renders the
 * "Trail & Lift Status" section server-side: per peak a table headed
 * Lift | Status | Hours and one headed Trail | Status | Difficulty. Status
 * and difficulty are icons only - <img class="trailicon"
 * src=".../icon_open.svg" title="Open">, icon_closed.svg / Closed, and
 * icon_beginner / intermediate / difficult / freestyle for the grade - so
 * the img title is read, never the cell text (always empty).
 *
 * The page is never cleared at the end of the season, so the rows are gated
 * on the report's own date: the first <p class="pt large"><strong> under the
 * "Mountain Report" heading. In season it is the day ("Saturday, February
 * 7th"), off-season "Updated: Monday, November 2nd". Neither carries a year,
 * so the date is placed in this year or last - whichever puts that month and
 * day on that weekday - never more than a couple of days in the future
 * (tolerance for time zones). Fail open (lib/tools/stale.js): no stamp, or a
 * stamp that doesn't parse, publishes.
 */
const MONTHS = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
];
const WEEKDAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const DAY = 86400000;
const STAMP = /(sunday|monday|tuesday|wednesday|thursday|friday|saturday),?\s+([a-z]+)\s+(\d{1,2})(?:st|nd|rd|th)?\b/i;

export function stampDate(str, now = Date.now()) {
  const m = STAMP.exec(str ?? '');
  if (!m) {
    return;
  }
  const weekday = WEEKDAYS.indexOf(m[1].toLowerCase());
  const month = MONTHS.indexOf(m[2].toLowerCase());
  const day = Number(m[3]);
  if (month < 0) {
    return;
  }
  const year = new Date(now).getFullYear();
  // this year or last, newest first; the weekday picks between them, and when
  // it fits neither (a typo) the newest one not in the future wins
  let fallback;
  for (let y = year; y >= year - 1; y--) {
    const d = new Date(y, month, day);
    if (d.getMonth() !== month || d.getTime() - now > 2 * DAY) {
      continue;
    }
    fallback ??= d;
    if (d.getDay() === weekday) {
      return d;
    }
  }
  return fallback;
}

function reportStamp(dom) {
  const strong = select(dom, 'p.pt.large strong')[0];
  return strong && (findText(strong) ?? allText(strong));
}

export function isFresh(dom, now = Date.now()) {
  return !isStale(stampDate(reportStamp(dom), now));
}

function icon(cell) {
  return select(cell, 'img.trailicon')[0]?.attribs?.title;
}

function cells(row) {
  return select(row, 'td');
}

export function rows(dom, header) {
  if (!isFresh(dom)) {
    return [];
  }
  const tables = select(dom, 'table').filter(table => {
    const th = select(table, 'thead th')[0];
    return th && (findText(th) ?? '').trim() === header;
  });
  const seen = new Set();
  return tables.flatMap(table =>
    select(table, 'tbody tr').flatMap(row => {
      const [nameCell, statusCell, thirdCell] = cells(row);
      const name = (nameCell && allText(nameCell).replace(/\s+/g, ' ').trim()) || '';
      if (!name || seen.has(name)) {
        return [];
      }
      seen.add(name);
      return [{ name, status: icon(statusCell), level: thirdCell && icon(thirdCell) }];
    })
  );
}
