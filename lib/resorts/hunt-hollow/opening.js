import select from '../../select.js';
import suppressed, { REASONS } from '../../tools/suppressed.js';
import { deepText } from './dom.js';

/**
 * In autumn 2026 Hunt Hollow moved from the Kentico club site (the
 * /The_Mountain tables index.js and trails.js read) to a new Next.js + Payload
 * CMS site, and the report moved to /conditions. Before opening that page
 * carries no lift or trail data at all - just "Check back for the latest
 * conditions" - and a header badge that says when the hill opens:
 *
 *   <div data-slot="live-conditions-badge" ...><span class="sr-only">Opens Dec 5 · 48°</span>...
 *
 * While the badge announces an opening day still ahead, an empty board is the
 * club not reporting yet, so it is marked 'beforeOpening' with that day
 * (lib/tools/suppressed.js). Once the day passes the marker stops: an empty
 * board after opening is a parser that needs the in-season /conditions markup,
 * which nobody has seen yet (the site is new this season), and the watchdog
 * should say so.
 */
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

export function openingDay(dom, now = Date.now()) {
  const badge = select(dom, '[data-slot="live-conditions-badge"] .sr-only')[0];
  const m = deepText(badge).match(/\bopens\s+([a-z]{3})[a-z]*\.?\s+(\d{1,2})\b/i);
  const month = m ? MONTHS.indexOf(m[1].toLowerCase()) : -1;
  if (month < 0) {
    return;
  }
  // no year on the badge: the next such day, allowing for a badge a few weeks
  // stale (a date up to ~2 months back still reads as this season's)
  const today = new Date(now);
  let year = today.getFullYear();
  if (Date.UTC(year, month, Number(m[2])) < now - 60 * 86400000) {
    year++;
  }
  const pad = n => String(n).padStart(2, '0');
  return `${year}-${pad(month + 1)}-${pad(Number(m[2]))}`;
}

export function beforeOpening(empty, dom, now = Date.now()) {
  const isEmpty = Array.isArray(empty) ? !empty.length : !Object.keys(empty).length;
  const day = openingDay(dom, now);
  // local midnight of the opening day, America/New_York (EST)
  if (isEmpty && day && now < Date.parse(`${day}T00:00:00-05:00`)) {
    return suppressed(empty, REASONS.beforeOpening, day);
  }
  return empty;
}
