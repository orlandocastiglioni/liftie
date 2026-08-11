import { LIFTIE_USER_AGENT } from '../env.js';
import parseCsv from '../tools/csv.js';
import fetchOnce, { keyFor } from '../tools/fetchonce.js';
import fetchVia, { fullUrl, hasVia } from '../tools/fetchvia.js';
import parseLoose from '../tools/fixjson.js';
import { parseHtml } from './parser.js';

export default function rest(url, parse, fn) {
  const reqInit = {
    headers: {
      'User-Agent': LIFTIE_USER_AGENT,
      Accept: 'application/json',
      ...url.headers
    }
  };
  if (url.body) {
    reqInit.body = JSON.stringify(url.body);
    reqInit.method = 'POST';
  }

  // shared with lib/lifts/request.js so a resort's lifts and trails halves, and
  // any sibling resorts on the same URL, collapse into one real request
  const doFetch = hasVia(url)
    ? fetchOnce(keyFor(fullUrl(url), { method: url.via }), () => fetchVia(url))
    : fetchOnce(keyFor(fullUrl(url), reqInit), () => fetch(fullUrl(url), reqInit));
  doFetch
    .then(async res => {
      if (res.status < 200 || res.status >= 300) {
        return fn(res.status);
      }
      if (url.html) {
        return parseHtml(await res.text(), parse, fn);
      }
      if (url.csv) {
        const rows = parseCsv(await res.text());
        return parse.isAsync ? parse(rows, fn) : fn(null, parse(rows));
      }
      const body = url.fixJson ? parseLoose(await res.text()) : await res.json();
      if (parse.isAsync) {
        parse(body, fn);
      } else {
        fn(null, parse(body));
      }
    })
    .catch(fn);
}
