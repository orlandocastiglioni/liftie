import request from '../lifts/request.js';
import coerce from './coerce.js';

/**
 * Alpine Media Technology's resort apps (the conditions embeds at
 * <org>.app.alpinemedia.com, and the white-label mobile apps) read FeathersJS
 * services at api.alpinemedia.com that also answer plain REST:
 *
 *   GET https://api.alpinemedia.com/api/v1/lifts?$limit=100
 *   GET https://api.alpinemedia.com/api/v1/trails?$limit=250
 *   headers  X-Alpine-API-Token: <the app's public client key>
 *            X-Alpine-Org: <org slug>
 *   -> { total, limit, skip, data: [...] }
 *
 * THE TOKEN. It is the client key each resort's app ships in its own public
 * JavaScript bundle (the expo config "extra".apiKey of the embed at
 * https://<org>.app.alpinemedia.com/). It is per resort, not shared: Tyrol
 * Basin's and Dartmouth's differ. Each resort.json carries its own in
 * api.headers / trails.headers, with `alpinemedia.tokenSource` naming the
 * bundle it was read from. It can rotate with any app release. A rotated or
 * missing token answers 401, and a missing org header answers 200 with an
 * empty board; both surface as fetch/parse ERRORS here, never as an empty
 * board, so liftie keeps the last good one up (lib/lifts, core-fixes-2026-11)
 * until the key is re-read from the bundle.
 *
 * Lifts: `status` is open | hold | closed (statusText is free display copy).
 * The embed renders displayName when set and falls back to name. "Uphill
 * Access" is listed as a lift (Dartmouth keeps it "open" year-round) but is the
 * uphill policy, not a lift, so it is dropped.
 *
 * Trails: the boolean `open` carries the status; `status` is null except
 * 'hold' alongside open. Alpine's difficulty codes must be mapped explicitly:
 * `expert` is the app's "Most Difficult", a SINGLE black, while liftie's
 * normalizeLevel would read it as doubleBlack, and several codes are not in
 * liftie's map at all. `uphill-access` (Tyrol relabels it "Tree Skiing") has no
 * equivalent and gets no level.
 *
 * STALE DATA. The payload carries no report date. The platform keeps the last
 * published trail flags through the off-season (Tyrol's August 2026 trails
 * still had March's open runs, with every lift closed), so trails are gated on
 * the lifts: an open or held run only counts while at least one lift (Uphill
 * Access excluded) is open or on hold; otherwise it publishes closed - the
 * corralco / sasquatch-mountain rule. The lift statuses themselves are reset by
 * the operators (all closed in August and November 2026).
 */
export const LEVELS = {
  easy: 'green', // "Easiest"
  intermediate: 'blue', // "More Difficult (Intermediate)"
  'advanced-intermediate': 'black', // "More Difficult (Advanced Intermediate)"
  expert: 'black', // "Most Difficult"
  'extreme-terrain': 'doubleBlack', // "Extreme Terrain"
  'terrain-park': 'terrainPark', // "Freestyle Terrain"
  'terrain-park-easy': 'terrainPark' // "Freestyle Terrain"
};

const UPHILL = /^uphill\b/i;

function label(row) {
  return (row?.displayName || row?.name || '').trim();
}

/** the board's rows, or an error when there is no board to read */
export function board(body, service) {
  const data = body?.data;
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error(`alpinemedia ${service}: empty board (token rotated or org header wrong?)`);
  }
  return data;
}

export function liftRows(body) {
  return board(body, 'lifts')
    .map(lift => ({ name: label(lift), status: coerce(lift.status) }))
    .filter(({ name }) => name && !UPHILL.test(name));
}

export function lifts(body) {
  return Object.fromEntries(liftRows(body).map(({ name, status }) => [name, status]));
}

export function running(liftsBody) {
  return liftRows(liftsBody).some(({ status }) => status === 'open' || status === 'hold');
}

export function trailRows(body, liftsRunning = true) {
  return board(body, 'trails').map(trail => {
    let status = trail.open ? (trail.status === 'hold' ? 'hold' : 'open') : 'closed';
    if (!liftsRunning) {
      status = 'closed';
    }
    return { name: label(trail), status, level: LEVELS[trail.difficulty] };
  });
}

/**
 * The async (body, fn) trails descriptor for a resort: reads its lifts board
 * (resort.json `api`; request() goes through fetchOnce, so this is the same
 * request the lifts half makes) to apply the stale gate above. A failed lifts
 * fetch is an error, not an ungated board.
 */
export function gatedTrails(resort) {
  return function trails(body, fn) {
    request(resort.api)
      .then(async res => {
        if (res.status < 200 || res.status >= 300) {
          throw new Error(`alpinemedia lifts: HTTP ${res.status}`);
        }
        fn(null, trailRows(body, running(await res.json())));
      })
      .catch(err => fn(err));
  };
}
