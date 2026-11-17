import resort from './resort.json' with { type: 'json' };

/**
 * Maple's slope report carries no date anywhere and is never cleared: through
 * the 2026 off-season it kept serving last winter's last report (6 of 8 trails
 * and both chairs "Yes"), which is indistinguishable from an open day. Nothing
 * on the site gives a machine-readable opening signal either - the hours page
 * says only "Opening day is 100% weather dependent. We always aim for early
 * December", every season.
 *
 * So the report is gated on resort.json's `opening` date (the same field the
 * opening plugin publishes as "opens on"): before it, publish no rows - never
 * "closed", we do not know that. From opening day on, rows flow as before.
 *
 * REVISIT: when Maple announces its 2026-27 opening day, set `opening` to it
 * (2026-12-05 is the first Saturday of "early December"); and every autumn,
 * move it to that season's expected opening before the report could go stale
 * again - an `opening` in the past leaves the gate wide open.
 */
export function beforeOpening(now = Date.now()) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(resort.opening ?? '');
  if (!m) {
    return false;
  }
  // local midnight, matching lib/opening.js's reading of the same field
  return now < new Date(m[1], m[2] - 1, m[3]).getTime();
}
