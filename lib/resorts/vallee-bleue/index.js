/**
 * Ski Vallee Bleue's own WordPress/Elementor site never populates its live
 * "Conditions des pistes" hooks (empty in live curl, after render, and in the
 * in-season Wayback snapshot) and does not even link out to maneige. maneige.ski
 * (ASSQ), station id 456, is the ONLY machine-readable source. maneige is
 * Cloudflare-gated so resort.json routes the WordPress REST post through
 * flaresolverr; rest.js hands this parser the already-unwrapped JSON body.
 *
 * maneige exposes ONLY aggregate open/total counts per lift category, never
 * individually named lifts. We synthesize one summary row per lift category that
 * exists (total > 0); open/closed is derived numerically (open when at least one
 * lift is running) and the open/total fraction is kept in the row name. The
 * static inventory and station_open ('closed_season' out of season) are not
 * statuses and are ignored. Vallee Bleue has no night skiing, so the night
 * category (total 0) is naturally skipped.
 */
function add(status, label, open, total) {
  open = Number(open) || 0;
  total = Number(total) || 0;
  if (total > 0) {
    status[`${label}: ${open}/${total} open`] = open > 0 ? 'open' : 'closed';
  }
}

export default function parse(data) {
  const acf = data?.acf ?? {};
  const status = {};
  add(status, 'Lifts (day)', acf['ski-lift_open'], acf['ski-lift_total']);
  add(status, 'Lifts (night)', acf['night_ski-lift_open'], acf['night_ski-lift_total']);
  return status;
}
