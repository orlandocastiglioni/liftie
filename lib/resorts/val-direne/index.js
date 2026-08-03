/**
 * Parc regional de Val d'Irene (Sainte-Irene, Matapedie, QC) publishes no
 * conditions page of its own - valdi.ski links out to maneige.ski, the ASSQ
 * conditions platform, which holds station id 46128. maneige is Cloudflare-
 * gated, so resort.json routes the WordPress REST post through flaresolverr and
 * rest.js hands this parser the already-unwrapped JSON body.
 *
 * maneige exposes ONLY aggregate open/total counts per lift category, never
 * individually named lifts (Val d'Irene runs a quad chair + a T-bar/teleski
 * counted as ski-lift_total, plus a loading carpet). We therefore synthesize
 * one summary row per lift category that actually exists (total > 0). There are
 * no status tokens to run through coerce - open/closed is derived numerically
 * (open when at least one lift in the category is running). The open/total
 * fraction is kept in the row name so the real count survives into liftie's
 * { name: status } model.
 *
 * The static inventory and station_open ('closed_season' out of season) are NOT
 * statuses and are ignored. Val d'Irene has no night skiing, so the night
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
