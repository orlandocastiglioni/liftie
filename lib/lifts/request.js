import { LIFTIE_USER_AGENT } from '../env.js';
import fetchOnce, { keyFor } from '../tools/fetchonce.js';
import fetchVia, { fullUrl, hasVia, unwrapJson } from '../tools/fetchvia.js';

export default function request(url) {
  // several resorts can share one URL (a network's shared board, or a resort's
  // own lifts and trails halves) - collapse those into one real fetch
  if (hasVia(url)) {
    return fetchOnce(keyFor(fullUrl(url), { method: url.via }), () => fetchVia(url), unwrapJson);
  }
  const init = {
    headers: {
      'User-Agent': LIFTIE_USER_AGENT,
      Accept: '*/*',
      ...url.headers
    }
  };
  // rest.js has always honoured url.body for the lifts pipeline; trails come
  // through here, so a query-style POST feed (White Pine Touring posts a
  // structuredQuery to Firestore) could only ever be a lift source before this.
  if (url.body) {
    init.body = JSON.stringify(url.body);
    init.method = 'POST';
  }
  return fetchOnce(keyFor(fullUrl(url), init), () => fetch(fullUrl(url), init));
}
