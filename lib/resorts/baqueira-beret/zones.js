import request from '../../lifts/request.js';

/**
 * baqueira.es was rebuilt in autumn 2026 as an Astro front end over a headless
 * Drupal. /estado-estacion now 301s to /es/estado-de-la-estacion, which renders
 * four empty sector shells (data-zone="Baqueira" | "Beret" | "Baciver" |
 * "Bonaigua") and fills them in the browser from one JSON document per sector:
 *
 *   GET https://www.baqueira.es/bb-content/headless/spotlio/<zone>
 *   { zone: { id, name },
 *     groups: { remontes|pistas|accesos|parkings:
 *               { open, total, items: [{ id, name, status: 'open'|'close',
 *                                        subtype, tread, chains, free }] } } }
 *
 * The old Drupal/Spotlio li.spolio-block markup is gone, so the HTML parser found
 * nothing. There is no all-sectors document (headless/spotlio/all is a 404
 * zone_not_found); headless/spotlio/summary only has open/total counts, so the
 * descriptor fetches it as the availability check and reads the four sectors.
 * request() goes through fetchOnce, so the lifts and trails halves share them.
 *
 * The JSON API wants the Mozilla-compatible form of the honest agent: the
 * 2026-11-17 User-Agent dry run from the Pi got 403 for the plain
 * "IndiePeaks-lift-status/1.0 (...)" on summary and the sector feeds, and 200
 * for "Mozilla/5.0 (compatible; IndiePeaks-lift-status/1.0; ...)". Both name
 * us; no browser is spoofed. Kept here and in resort.json since the global
 * default became the plain form.
 */
export const USER_AGENT = 'Mozilla/5.0 (compatible; IndiePeaks-lift-status/1.0; +https://orlandocc.me/indiepeaks)';

export const ZONES = ['Baqueira', 'Beret', 'Baciver', 'Bonaigua'];

export function zoneUrl(zone) {
  return {
    host: 'https://www.baqueira.es',
    pathname: `/bb-content/headless/spotlio/${zone}`,
    headers: { Accept: 'application/json', 'User-Agent': USER_AGENT }
  };
}

export async function fetchZones() {
  return Promise.all(
    ZONES.map(async zone => {
      const res = await request(zoneUrl(zone));
      if (res.status < 200 || res.status >= 300) {
        throw new Error(`baqueira-beret ${zone}: HTTP ${res.status}`);
      }
      return res.json();
    })
  );
}

export function items(zones, group) {
  return zones.flatMap(z =>
    (z?.groups?.[group]?.items ?? [])
      .filter(item => item?.name && item.status)
      .map(item => ({ ...item, name: item.name.trim(), zone: z.zone?.name }))
  );
}

// adapt a sync zones -> rows function to liftie's async (body, fn) parse form
export function fromZones(read) {
  return (_summary, fn) =>
    fetchZones().then(
      zones => fn(null, read(zones)),
      err => fn(err)
    );
}
