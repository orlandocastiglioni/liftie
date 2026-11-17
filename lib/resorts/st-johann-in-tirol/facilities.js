import coerce from '../../tools/coerce.js';
import reportedAt from '../steinplatte/reported-at.js';

/**
 * bergbahnen-stjohann.at renders its lift and piste boards client-side from
 * Micado's SkigebieteManager FacilityApi - a different Micado endpoint from
 * the /webapi/micadoweb FacilityApi/List.api that lib/resorts/steinplatte and
 * hochzeiger read. The site's own bundle calls
 *
 *   /SkigebieteManager/Micado.SkigebieteManager.Plugin.FacilityApi/
 *     ListFacilities.api?lang=..&region=stjohann&location=stjohann
 *     &client=https://sgm.bergbahnen-stjohann.at&type=lift|piste
 *
 * and gets { count, facilities: [{ title, status, type, typename, ... }],
 * meta: { lastUpdate } }. location=stjohann is the Harschbichl / Eichenhof
 * mountain the site's lift widget shows (9 lifts, 18 pistes); without it the
 * region also returns the separate Kirchdorf and Lärchenhof practice hills.
 *
 * status is numeric. The bundle's own labels (reactLiftState.state.stateN):
 * 0 No State, 1 Open, 2 Closed, 3 Disabled, 4 Partially opened, 5 In
 * progress, 6 In construction, 7 Disturbance. "No State" rows are skipped
 * rather than guessed.
 *
 * meta.lastUpdate is the platform's sync time in Vienna wall-clock time and
 * is read with steinplatte's reported-at.js.
 */
const STATES = {
  1: 'open',
  2: 'closed',
  3: 'closed',
  4: 'open',
  5: 'scheduled',
  6: 'closed',
  7: 'hold'
};

export function status(code) {
  const state = STATES[code];
  return state && coerce(state);
}

export function rows(body) {
  const out = [];
  for (const facility of body?.facilities ?? []) {
    const name = String(facility?.title ?? '').trim();
    const state = status(facility?.status);
    if (name && state) {
      out.push({ facility, name, status: state });
    }
  }
  const at = reportedAt(body?.meta?.lastUpdate);
  if (at) {
    // non-enumerable: metadata about the board, not one of its rows
    Object.defineProperty(out, 'reportedAt', { value: at });
  }
  return out;
}
