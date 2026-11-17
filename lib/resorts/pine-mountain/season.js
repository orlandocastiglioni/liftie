import resort from './resort.json' with { type: 'json' };

/**
 * Pine Mountain's snow report carries no date anywhere and is never cleared:
 * on 2026-11-17 it still served last spring's report, with every run in the
 * "Currently Open Runs" pane and all three lifts under "ALL OPEN LIFTS" -
 * indistinguishable from an open day. That is why the resort was left
 * unregistered on the Pi.
 *
 * So, as lib/resorts/maple-ski-ridge/season.js does, the report is gated on
 * resort.json's `opening` date (the field the opening plugin publishes as
 * "opens on"): before it, publish no rows - never "closed", we do not know
 * that. From local midnight on opening day, rows flow as before.
 *
 * REVISIT EVERY AUTUMN: set `opening` to that season's announced (or
 * expected) opening day before the report could go stale again. An `opening`
 * in the past leaves the gate wide open, and last spring's "all open" report
 * comes straight back. 2026-12-05 is the owner's date for 2026-27.
 */
export function beforeOpening(now = Date.now()) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(resort.opening ?? '');
  if (!m) {
    return false;
  }
  // local midnight, matching lib/opening.js's reading of the same field
  return now < new Date(m[1], m[2] - 1, m[3]).getTime();
}
