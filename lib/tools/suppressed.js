/**
 * Mark a deliberately empty board as deliberate.
 *
 * The gates in this directory (stale.js, season-window.js, nordic-pulse-fresh.js)
 * and the per-resort ones (summer reports, opening dates) all publish NO rows -
 * never "closed" - when they hold a board back. From the outside that empty
 * board looked exactly like a parser that had rotted, and the Pi's watchdog
 * paged on twelve deliberately empty resorts every six hours for two weeks of
 * November 2026.
 *
 * So a gate hands back its empty {} / [] through this helper, which hangs a
 * non-enumerable `suppressed` off it, the same way parsers hang `reportedAt`.
 * lib/lifts/index.js and lib/trails/index.js copy it onto the published
 * payload as two extra keys:
 *
 *   lifts.suppressed      / trails.suppressed      one of REASONS
 *   lifts.suppressedDate  / trails.suppressedDate  the date the gate keys on
 *
 * Additive only: `status` / `list` stay the same empty object or array, so a
 * consumer that does not know the keys sees exactly what it saw before.
 *
 * A gate that FAILS OPEN (no date found, etc.) publishes rows and no marker;
 * the marker appears only when a gate actually withheld something.
 */
export const REASONS = Object.freeze({
  // a dated report provably older than stale.js's window; date: the report's
  stale: 'stale',
  // the source is serving its summer (bike park, MTB) report; date: none, or
  // the summer report's own stamp
  summer: 'summer',
  // outside the resort's season, or the source itself says there is no
  // current report (an empty "not current" feed, a closed-for-season flag);
  // date: the source's own stamp when it has one
  offseason: 'offseason',
  // before the resort's announced or configured opening day; date: that day
  beforeOpening: 'beforeOpening',
  // a source that lists only OPEN runs, and lists none ("None Open"); the
  // board is empty because nothing is open, not because nothing was read
  noneOpen: 'noneOpen'
});

const KNOWN = new Set(Object.values(REASONS));

/**
 * @param empty   the {} (lifts) or [] (trails) the gate is about to return
 * @param reason  one of REASONS
 * @param date    Date, epoch ms, or an ISO / YYYY-MM-DD string; optional
 * @returns empty, marked
 */
export default function suppressed(empty, reason, date) {
  if (!KNOWN.has(reason)) {
    throw new Error(`unknown suppression reason: ${reason}`);
  }
  const marker = { reason };
  const iso = toIso(date);
  if (iso) {
    marker.date = iso;
  }
  // non-enumerable: metadata about the board, never one of its rows
  Object.defineProperty(empty, 'suppressed', { value: marker });
  return empty;
}

/**
 * Copy a parser's marker onto the payload being published. Used by both
 * pipelines so lifts and trails spell it identically.
 */
export function publish(payload, rows) {
  const marker = rows?.suppressed;
  if (marker?.reason) {
    payload.suppressed = marker.reason;
    if (marker.date) {
      payload.suppressedDate = marker.date;
    }
  }
  return payload;
}

function toIso(date) {
  if (date === undefined || date === null || date === '') {
    return;
  }
  if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    // a calendar day stays a calendar day - no midnight-UTC shift
    return date;
  }
  const d = date instanceof Date ? date : new Date(date);
  return Number.isFinite(d.getTime()) ? d.toISOString() : undefined;
}
