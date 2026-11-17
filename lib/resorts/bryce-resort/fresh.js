import select from '../../select.js';
import { findText } from '../../tools/domutil.js';
import isStale from '../../tools/stale.js';

/**
 * Bryce keeps one hand-written "Mountain & Weather Report" on the conditions
 * page, headed by two <h6>s: the title and the report date ("January 27th,
 * 2026" in a 2026-02-07 capture). Off-season the lift table is left as the bike
 * park last set it: on 2026-11-17 it still showed Lift Two open under an
 * "April 18th, 2026" report. Gate both parsers on that date.
 *
 * Fails open like every lib/tools/stale.js caller: no report header or an
 * unreadable date publishes as before.
 */
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

export function reportDate(dom) {
  for (const h6 of select(dom, '.mountain-report h6')) {
    const m = findText(h6)
      ?.trim()
      .match(/^([A-Za-z]+)\.?\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})$/);
    const month = m && MONTHS.indexOf(m[1].slice(0, 3).toLowerCase());
    if (m && month >= 0) {
      return new Date(Number(m[3]), month, Number(m[2]));
    }
  }
}

export default function isFresh(dom) {
  return !isStale(reportDate(dom));
}
