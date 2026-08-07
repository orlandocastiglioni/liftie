import coerce from '../../tools/coerce.js';
import reportedAt from './reported-at.js';

/**
 * Micado ski platform, same endpoint idiom as lib/resorts/hochzeiger:
 * /webapi/micadoweb + FacilityApi/List.api, region=steinplatte, typeIDs=1 for
 * the 14 lifts (typeIDs=2 is the pistes, see trails.js). Verified 1:1 against
 * the human page /de/liftstatus.html - same names, same order.
 *
 * .state is exactly two tokens, 'opened' and 'closed', both already in
 * coerce.js. The winter captures (liftstatus 2025-12-16, pistenstatus
 * 2026-03-09) show the same two and nothing else - no 'in Vorbereitung', no
 * 'Revision'. Items with no .state are non-facility map objects (labels,
 * borders); typeIDs=1 excludes them, but skip them anyway so a stray one can
 * never coerce into a phantom 'scheduled' lift.
 *
 * The area straddles the border - the four Reit im Winkl lifts are on the
 * Bavarian side - but the single region=steinplatte call covers both sides.
 */
export default function parse(data = {}) {
  const { items = [], meta } = data;
  const lifts = items.reduce((ls, { title, state }) => {
    if (state) {
      ls[title] = coerce(state);
    }
    return ls;
  }, {});
  const at = reportedAt(meta?.lastUpdate);
  if (at) {
    // non-enumerable: metadata about the board, not one of its lifts
    Object.defineProperty(lifts, 'reportedAt', { value: at });
  }
  return lifts;
}
