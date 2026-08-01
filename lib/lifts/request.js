import { LIFTIE_USER_AGENT } from '../env.js';
import fetchVia, { fullUrl, hasVia } from '../tools/fetchvia.js';

export default function request(url) {
  if (hasVia(url)) {
    return fetchVia(url);
  }
  return fetch(fullUrl(url), {
    headers: {
      'User-Agent': LIFTIE_USER_AGENT,
      Accept: '*/*'
    }
  });
}
