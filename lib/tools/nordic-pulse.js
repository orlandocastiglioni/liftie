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
export default function parse(dom) {
  const script = select(dom, 'script#ng-state')[0];
  if (!script) {
    return [];
  }
  const state = JSON.parse(findText(script) ?? '{}');
  const data = Object.values(state).find(v => v?.url?.includes('/data-npww'));
  const trails = data?.body?.trails ?? [];
  const rows = trails
    // hide:true marks an internal sub-segment of a route that is also listed
    // under its parent name (Trapp publishes "Haul Road Lower" and "Haul Road
    // Upper (...)" alongside a visible "Haul Road"). Nordic Pulse's own UI
    // suppresses these, so keeping them would double-count the network.
    .filter(t => !t.hide)
    .map(t => ({
      name: t.names?.en ?? t.name,
      status: t.hazard ? 'hold' : t.open ? 'open' : 'closed',
      level: t['piste:difficulty']
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
  const groomed = trails
    .flatMap(t => [t.lastGroomed, t.lastGroomedTrackSet])
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
