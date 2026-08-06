import status, { name, rows } from './status.js';

/**
 * Levi's own app API - https://levi-CloudProd-agent.frendsapp.com/api,
 * endpoint amenities/v1/lifts, response {"data": [ ...26 lifts... ]}.
 *
 * The public page (/laskettelu-ja-hiihto/rinteet-ja-hissit/) is a Gatsby
 * shell that fills its table from this endpoint after load, so there is no
 * HTML to scrape - but the API is plain-curlable, no Cloudflare, no render.
 *
 * IT NEEDS THE Authorization HEADER in resort.json ('ApiKey <uuid>');
 * without it the endpoint answers 401 with an empty body. That key is a
 * public client-side constant baked into Levi's own bundle, so it is a
 * rotation risk. IF LIFTS/TRAILS SUDDENLY 401: fetch
 * https://www.levi.fi/laskettelu-ja-hiihto/rinteet-ja-hissit/, read the src
 * of its /app-*.js script tag (the hash changes on every deploy) and grep
 * that bundle for `_baseURL=` / `_apiKey=`.
 *
 * Status comes from ./status.js - see the long comment there for why we read
 * open.operating rather than open.now.
 */
export default function parse(body) {
  const lifts = {};
  for (const lift of rows(body)) {
    const id = name(lift);
    if (id) {
      lifts[id] = status(lift);
    }
  }
  return lifts;
}
