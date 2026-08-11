import Debug from 'debug';

const debug = Debug('liftie:fetchonce');

/**
 * Coalesce identical fetches.
 *
 * Liftie is one-resort-one-source, so several resorts can legitimately share a
 * URL. The six Oberstdorf-Kleinwalsertal sub-resorts all read the same ~400 KB
 * page and filter it by their own `data-berg` tag, and lifts and trails fetch
 * separately - twelve identical requests per cycle for one document. The same
 * shape applies to any future shared-feed network.
 *
 * That is wasted work everywhere, but it matters most for the browser-backed
 * tiers: FlareSolverr is pinned to one CPU and serialised to one Chrome at a
 * time, so duplicate requests queue behind each other and push Chrome's startup
 * past ChromeDriver's connect timeout. Removing the duplicates cuts real demand
 * without touching any resource limit.
 *
 * Deliberately conservative:
 *  - Only successful (2xx) responses are shared. A failure is never cached, so
 *    a transient 502 cannot be fanned out to every resort sharing that URL.
 *  - The window is short. It exists to collapse one polling cycle, not to serve
 *    stale status - anything older is refetched.
 *  - The body is read once and handed out as a value, so no consumer can
 *    exhaust a stream another consumer still needs.
 */
const TTL_MS = 30_000;

const entries = new Map();

function prune(now) {
  for (const [key, entry] of entries) {
    if (now - entry.at > TTL_MS) {
      entries.delete(key);
    }
  }
}

// the shape lib/tools/fetchvia.js returns, and all lib/lifts consumers expect
function share({ status, body, json }) {
  return {
    status,
    text: async () => body,
    json: async () => (json ? json() : JSON.parse(body))
  };
}

/**
 * @param key   identity of the request - URL plus anything that changes the
 *              response (method, body, headers, via)
 * @param thunk performs the real fetch, returning a Response or the fetchvia
 *              shim
 */
export default function fetchOnce(key, thunk) {
  const now = Date.now();
  prune(now);

  const hit = entries.get(key);
  if (hit) {
    debug('coalesced %s', key);
    return hit.promise.then(share);
  }

  const promise = thunk().then(async res => {
    const body = await res.text();
    // keep fetchvia's json() so the Chrome JSON-viewer unwrapping still applies
    const value = { status: res.status, body, json: res.json?.bind(res) };
    if (res.status < 200 || res.status >= 300) {
      entries.delete(key); // never share a failure
    }
    return value;
  });

  entries.set(key, { at: now, promise });
  promise.catch(() => entries.delete(key));
  return promise.then(share);
}

export function keyFor(url, init = {}) {
  return JSON.stringify([url, init.method ?? 'GET', init.body ?? '', init.headers ?? null]);
}

// test seam
export function _reset() {
  entries.clear();
}
