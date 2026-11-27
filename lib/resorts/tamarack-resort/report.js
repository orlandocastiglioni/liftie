import select from '../../select.js';
import outOfSeason from '../../tools/season-window.js';
import isStale from '../../tools/stale.js';
import suppressed, { REASONS } from '../../tools/suppressed.js';

/**
 * Tamarack replaced the "lift-trail-status" WordPress plugin (div.mWPS*) with
 * a theme-built "Snow and Grooming Report" in November 2026, which is why both
 * halves went empty: the old selectors matched nothing. The new report is a
 * stack of div.sr-report__block, each with an h3 subtitle, its own
 * "Last update: 2026/11/24 06:35" stamp, and plain tables:
 *
 *   "Chair Lifts Status"  table.sr-table--lifts   <th scope=row>NAME</th> + Status cell
 *   "Uphill Status"       table.sr-table--lifts   uphill (skinning) routes - NOT lifts
 *   "Trails Status"       table.sr-table--trails  one per tab panel: downhill, parks
 *
 * Blocks are told apart by their subtitle, never by position.
 *
 * GATES. The old plugin's summer bike-park report is gone with it, and what
 * the new theme shows in summer is not known yet, so two fail-safe gates
 * replace the old summer check:
 *  - outside a generous season window (Nov 1 - May 15, Idaho time) nothing
 *    publishes (lib/tools/season-window.js) - wider than any season Tamarack
 *    runs, so it can only ever hold back an off-season page;
 *  - a block whose own stamp is older than stale.js's window publishes nothing.
 * Both mark the empty board (lib/tools/suppressed.js). REVISIT in May 2027:
 * if the summer page reuses this layout for bike trails, add a summer check.
 */
const SEASON = { from: '11-01', to: '05-15' };
const TZ = 'America/Boise';

export function block(dom, title) {
  return select(dom, '.sr-report__block').find(b => text(select(b, '.sr-report__subtitle')[0]).trim() === title);
}

// "Last update: 2026/11/24 06:35" - Idaho wall clock. Mountain time is UTC-7
// in winter (MST) and UTC-6 in summer; a few hours either way is immaterial to
// a 45-day staleness window, so it is read as MST.
export function updatedAt(node) {
  const m = text(select(node ?? {}, '.sr-report__updated')[0]).match(
    /(\d{4})\/(\d{2})\/(\d{2})(?:\s+(\d{2}):(\d{2}))?/
  );
  if (!m) {
    return;
  }
  const [, y, mo, d, h = '00', mi = '00'] = m;
  const t = Date.parse(`${y}-${mo}-${d}T${h}:${mi}:00-07:00`);
  return Number.isFinite(t) ? t : undefined;
}

/**
 * Run `read` on the block titled `title`, or hand back the marked empty board
 * when a gate holds it.
 */
export function gated(dom, title, empty, read) {
  if (outOfSeason(SEASON, Date.now(), TZ)) {
    return suppressed(empty, REASONS.offseason);
  }
  const node = block(dom, title);
  if (!node) {
    return empty;
  }
  const at = updatedAt(node);
  if (isStale(at)) {
    return suppressed(empty, REASONS.stale, at);
  }
  return read(node);
}

// the visible status word of a row ('Closed'; the icon beside it is decoration)
export function status(row) {
  return text(select(row, 'td[data-label="Status"] .sr-icon-label span')[0]).trim() || undefined;
}

export function text(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(text).join('');
}
