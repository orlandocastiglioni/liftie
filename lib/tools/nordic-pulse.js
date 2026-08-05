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
  return (
    (data?.body?.trails ?? [])
      // hide:true marks an internal sub-segment of a route that is also listed
      // under its parent name (Trapp publishes "Haul Road Lower" and "Haul Road
      // Upper (...)" alongside a visible "Haul Road"). Nordic Pulse's own UI
      // suppresses these, so keeping them would double-count the network.
      .filter(t => !t.hide)
      .map(t => ({
        name: t.names?.en ?? t.name,
        status: t.hazard ? 'hold' : t.open ? 'open' : 'closed',
        level: t['piste:difficulty']
      }))
  );
}
