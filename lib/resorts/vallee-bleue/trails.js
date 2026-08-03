/**
 * Same maneige.ski REST feed (station id 456) as the lifts, routed through
 * flaresolverr; collect() in lib/trails/parse.js hands this parser the unwrapped
 * JSON body. maneige gives ONLY aggregate open/total counts per trail category,
 * never per-trail names or statuses, so we synthesize one summary row per
 * category that exists (total > 0). open/closed is derived numerically and the
 * fraction is kept in the row name.
 *
 * Level caveat (per recon): maneige's static difficulty inventory
 * (trails_easy/hard/very_hard/extreme) uses Quebec semantics where 'hard' =
 * intermediate, so those field names must NOT be fed through normalizeLevel;
 * we don't use them for status at all. The only level we assert is terrainPark
 * for the parks category, which is unambiguous. Vallee Bleue does not report
 * detailed snow and has no night skiing, so out-of-season everything reads 0/total.
 */
function push(rows, label, open, total, level) {
  open = Number(open) || 0;
  total = Number(total) || 0;
  if (total > 0) {
    const row = { name: `${label}: ${open}/${total} open`, status: open > 0 ? 'open' : 'closed' };
    if (level) {
      row.level = level;
    }
    rows.push(row);
  }
}

export default function parse(data) {
  const acf = data?.acf ?? {};
  const rows = [];
  push(rows, 'Trails (day)', acf.station_daytrails, acf.station_daytrails_total);
  push(rows, 'Trails (night)', acf.station_nighttrails, acf.station_nighttrails_total);
  push(rows, 'Glades', acf.station_sousbois, acf.station_sousbois_total);
  push(rows, 'Terrain parks', acf.station_parks, acf.station_parks_total, 'terrainPark');
  push(rows, 'Alpine touring', acf.alpine_trail_open, acf.alpine_trail_total);
  return rows;
}
