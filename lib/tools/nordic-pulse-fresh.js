import parse from './nordic-pulse.js';
import isStale from './stale.js';
import suppressed, { REASONS } from './suppressed.js';

/**
 * nordic-pulse.js with the staleness gate applied. Many clubs set the per-trail
 * `open` flag by hand and never clear it at season end, so the flags alone keep
 * a closed area reading open all summer. nordic-pulse.js already dates the
 * report from the area's newest grooming record (reportedAt); this publishes no
 * rows once that is provably stale (lib/tools/stale.js - fails open when there
 * is no grooming date at all). A withheld board is marked as such
 * (lib/tools/suppressed.js: 'stale', keyed on that grooming date).
 *
 * Opt-in per area, and only for areas that keep grooming records in season:
 * an area whose newest record is years old (several carry a 2021-01-08 stamp)
 * would be blanked for good. Re-export it as the area's trails.js.
 */
export default function trails(dom) {
  const rows = parse(dom);
  const at = rows.reportedAt ? Date.parse(rows.reportedAt) : undefined;
  return isStale(at) ? suppressed([], REASONS.stale, at) : rows;
}
