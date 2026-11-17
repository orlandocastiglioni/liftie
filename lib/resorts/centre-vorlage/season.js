import select from '../../select.js';
import { findText } from '../../tools/domutil.js';
import isStale from '../../tools/stale.js';

/**
 * The report's own "Last Updated" stamp: <div class="col"><p>2026-10-08
 * 13:07</p><p>Last Updated</p></div>, local (Quebec) time. Returns the parts
 * as written so the month is the resort's own, not shifted by a timezone.
 */
export function lastUpdated(dom) {
  for (const col of select(dom, 'div.col')) {
    const text = select(col, 'p')
      .map(p => findText(p) ?? '')
      .join(' ')
      .replace(/\s+/g, ' ');
    const m = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}) Last Updated/i.exec(text);
    if (m) {
      const [year, month, day, hour, minute] = m.slice(1).map(Number);
      return { year, month, day, at: new Date(year, month - 1, day, hour, minute) };
    }
  }
}

/**
 * True while the page is NOT a ski report. conditions.centrevorlage.ca carries
 * the summer bike park on the same page and in the same cards, and keeps the
 * last one up until the first ski report: on 2026-11-17 it still showed the
 * bike trails ("Dry", "Wet", "Good - Branches on trail look out") and the
 * chair, dated 2026-10-08.
 *
 * Signal: the dated "Last Updated" header. A report last updated May-October
 * is the bike park - Vorlage, in the Gatineau hills at 460 m, does not ski
 * before December or after April. A report older than lib/tools/stale.js's
 * window is suppressed too (so a closing-day ski report is not shown all
 * summer). No date at all fails open and publishes, as stale.js does. Rows
 * come back as soon as a ski report dated November-April is posted.
 */
export function isOffSeason(dom) {
  const updated = lastUpdated(dom);
  if (!updated) {
    return false;
  }
  if (updated.month >= 5 && updated.month <= 10) {
    return true;
  }
  return isStale(updated.at);
}
