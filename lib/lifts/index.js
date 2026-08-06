import Debug from 'debug';
import getParseFn from './parse.js';
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
  rfau.fn(rfau.url, resort._parseFn, (_err, data) => {
    Promise.resolve(data).then((data, err) => {
      if (err || !data) {
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
      fn(null, payload);
    });
  });
}
