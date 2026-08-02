import { LIFTIE_USER_AGENT } from '../env.js';
import fetchVia, { fullUrl, hasVia } from '../tools/fetchvia.js';
import parseLoose from '../tools/fixjson.js';
import { parseHtml } from './parser.js';

export default function rest(url, parse, fn) {
  const reqInit = {
    headers: {
      'User-Agent': LIFTIE_USER_AGENT,
      Accept: 'application/json'
    }
  };
  if (url.body) {
    reqInit.body = JSON.stringify(url.body);
    reqInit.method = 'POST';
  }

  const doFetch = hasVia(url) ? fetchVia(url) : fetch(fullUrl(url), reqInit);
  doFetch
    .then(async res => {
      if (res.status < 200 || res.status >= 300) {
        return fn(res.status);
      }
      if (url.html) {
        return parseHtml(await res.text(), parse, fn);
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
