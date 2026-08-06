import { LIFTIE_USER_AGENT } from '../env.js';
import fetchVia, { fullUrl, hasVia } from '../tools/fetchvia.js';

export default function request(url) {
  if (hasVia(url)) {
    return fetchVia(url);
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
  return fetch(fullUrl(url), init);
}
