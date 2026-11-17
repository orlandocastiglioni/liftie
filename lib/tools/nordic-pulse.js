import select from '../select.js';
import { findText } from './domutil.js';

// No local level map: lib/trails/parse.js runs normalizeLevel over whatever a
// descriptor returns, and it already knows every value this feed emits. The map
// that used to live here duplicated four of its entries and silently dropped the
// rest — `novice` cost Methow Trails the level on 5 trails.

/**
 * Shared trail parser for Nordic Pulse areas (nordic-pulse.com). The public
 * per-area JSON feed (api2.nordic-pulse.com/.../data-npww) is 403 to direct
 * requests, but the "?embed=true" page server-renders that same payload into
 * the Angular TransferState blob in <script id="ng-state">. We pull the
 * data-npww body out of that blob and map its trails.
 *
 * Resorts use it by pointing "trails" at their nordic-pulse embed page and
 * re-exporting this parser as their trails.js.
 */

/**
 * The TransferState entry holding the area's trails. Two shapes have been live:
 *
 *   until 2026-09-25: { url: '.../v3/ski-areas/<id>/data-npww', body: {...} }
 *   since 2026-09-25: { u: '.../v3/ski-areas/<id>/data-npw', b: {...}, s, st, h, rt }
 *
 * The site's Angular upgrade switched TransferState to its compact key names
 * and the feed path lost a 'w' the same day. Every Nordic Pulse area on the
 * feed went empty at the same second (2026-09-25 19:30:16) because the old
 * lookup matched nothing; it did not throw, so nothing alarmed. Accept both,
 * and match the last path segment exactly so the sibling
 * /v3/ski-areas/<id>?project=npw and /v3/ski-areas/status entries (area
 * metadata, no trails) are never picked.
 */
function isAreaData(url) {
  return typeof url === 'string' && /\/data-npww?(?:[?#]|$)/.test(url);
}

/**
 * The area metadata entry beside the trail feed: same TransferState, URL
 * '.../v3/ski-areas/<id>?project=npw' for the <id> in the data-npw URL. Matched
 * on that id so the sibling /ski-areas/static and /ski-areas/status lists are
 * never read as this area.
 */
function areaRecord(entries, dataUrl) {
  const id = /\/ski-areas\/([^/?#]+)\/data-npww?(?:[?#]|$)/.exec(dataUrl ?? '')?.[1];
  if (!id) {
    return;
  }
  const record = entries.find(v => {
    const url = v?.url ?? v?.u;
    return typeof url === 'string' && url.split(/[?#]/)[0].endsWith(`/ski-areas/${id}`);
  });
  const body = record?.body ?? record?.b;
  return body && !Array.isArray(body) ? body : undefined;
}

export default function parse(dom) {
  const script = select(dom, 'script#ng-state')[0];
  if (!script) {
    return [];
  }
  const state = JSON.parse(findText(script) ?? '{}');
  const entries = Object.values(state);
  const data = entries.find(v => isAreaData(v?.url ?? v?.u));
  const trails = (data?.body ?? data?.b)?.trails ?? [];
  const rows = trails
    // hide:true marks an internal sub-segment of a route that is also listed
    // under its parent name (Trapp publishes "Haul Road Lower" and "Haul Road
    // Upper (...)" alongside a visible "Haul Road"). Nordic Pulse's own UI
    // suppresses these, so keeping them would double-count the network.
    .filter(t => !t.hide)
    .map(t => ({
      name: t.names?.en ?? t.name,
      // `hazard` is a warning flag layered on top of `open`, not a status of
      // its own: Nordic Pulse labels it "Trail is open but hazards exist". A
      // closed trail with a hazard is still closed. Sovereign Lake flags every
      // trail in its network (2026-11-17: 5 open, 63 closed, all 68 hazard),
      // and mapping hazard first published all 68 as 'hold', which the app
      // draws open-coloured.
      status: t.open ? (t.hazard ? 'hold' : 'open') : 'closed',
      level: t['piste:difficulty'],
      // The same open + hazard case as its own flag, so a consumer can show
      // "Open - caution" instead of reading 'hold' as a stoppage. 'hold' stays
      // the status for consumers that only know the four states. Only set on
      // open trails, for the reason above: a closed trail's hazard is moot.
      ...(t.open && t.hazard ? { hazard: true } : {})
    }));

  // Date the report from the area's own grooming record. Nordic Pulse clubs set
  // a trail's `open` flag by hand and many never clear it at season end, so the
  // flags alone show a closed area as fully open all summer. Grooming is the
  // activity signal: a centre that is running grooms somewhere in its network
  // within days, and every one of the 20 areas liftie carries was 100+ days
  // past its last grooming in August 2026.
  //
  // This is deliberately AREA level and only ever published as a date - it is
  // never mixed into a trail's open/closed, because a trail can legitimately be
  // open and ungroomed.
  //
  // The area's own record counts too. Several clubs (Trapp, Woodstock,
  // Telemark in 2026-11) log grooming against waypoints only, so no trail
  // carries a real date - just the 2021-01-08 placeholder every row defaults
  // to - while the area record says 2026-03-30.
  const area = areaRecord(entries, data?.url ?? data?.u);
  const groomed = [area?.lastGroomed, area?.lastGroomedTrackSet]
    .concat(trails.flatMap(t => [t.lastGroomed, t.lastGroomedTrackSet]))
    .map(v => (typeof v === 'string' ? Date.parse(v) : Number.NaN))
    .filter(Number.isFinite);
  if (groomed.length) {
    // non-enumerable: this is metadata about the list, not one of its rows, so
    // it must not show up in a deepEqual against the expected trail set
    Object.defineProperty(rows, 'reportedAt', {
      value: new Date(Math.max(...groomed)).toISOString()
    });
  }
  return rows;
}
