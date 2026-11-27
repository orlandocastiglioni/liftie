import Debug from 'debug';
import { publish } from '../tools/suppressed.js';
import getParseFn, { PARSE_ERROR } from './parse.js';
import pipe from './pipe.js';
import rest from './rest.js';
import stats from './stats.js';

const debug = Debug('liftie:lifts');

const shortInterval = 60 * 1000; // once a minute - fetch status if there were requests
const longInterval = 30 * shortInterval; // once every 30 minutes - fetch even if there wasn't any requests

fetch.interval = {
  active: shortInterval,
  inactive: longInterval
};

function getRequestFnAndUrl(resort) {
  if (resort.api) {
    return {
      fn: rest,
      url: resort.api
    };
  }
  if (resort.dataUrl) {
    return {
      fn: pipe,
      url: resort.dataUrl
    };
  }
  if (typeof resort.getUrl === 'function') {
    return {
      fn: pipe,
      url: resort.getUrl()
    };
  }
  return {
    fn: pipe,
    url: resort.url
  };
}

export default async function fetch(resort, fn) {
  if (!resort._rfau) {
    resort._rfau = getRequestFnAndUrl(resort);
  }
  if (!resort._parseFn) {
    resort._parseFn = await getParseFn(resort.id);
  }
  debug('Fetch lift status for %s', resort.id);
  const rfau = resort._rfau;
  // Mirrors lib/trails/index.js: a fetch or parse failure is reported as an
  // error, so lib/routes/data.js keeps serving the last good board and leaves
  // timestamp.lifts at the last successful fetch. It used to become {} here,
  // which the Pi published as an empty board every time a site hiccupped.
  // A fetch that succeeds and parses to no rows still publishes empty.
  rfau.fn(rfau.url, resort._parseFn, (err, data) => {
    if (err) {
      return fn(err);
    }
    Promise.resolve(data).then(
      data => {
        if (data?.[PARSE_ERROR]) {
          return fn(data[PARSE_ERROR]);
        }
        if (!data) {
          data = {};
        }
        const payload = {
          status: data,
          stats: stats(data)
        };
        // Symmetric with lib/trails/index.js: a parser that can date its own
        // report hangs a non-enumerable reportedAt off the object it returns.
        // Some sites freeze the board at closing day rather than emptying it, so
        // without this a months-old lift report looks identical to today's.
        if (data.reportedAt) {
          payload.reportedAt = data.reportedAt;
        }
        // a gate that withheld the rows says so (lib/tools/suppressed.js)
        fn(null, publish(payload, data));
      },
      e => fn(e)
    );
  });
}
