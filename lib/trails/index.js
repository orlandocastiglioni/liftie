import Debug from 'debug';
import { parseHtml } from '../lifts/parser.js';
import request from '../lifts/request.js';
import collect from './parse.js';
import stats from './stats.js';

const debug = Debug('liftie:trails');

const shortInterval = 60 * 1000; // once a minute - fetch status if there were requests
const longInterval = 30 * shortInterval; // once every 30 minutes - fetch even if there wasn't any requests

fetch.interval = {
  active: shortInterval,
  inactive: longInterval
};

/**
 * optional trail status - resorts opt in with "trails" in resort.json:
 *   "trails": true           - trail rows live on the same page as the lifts
 *   "trails": { host, pathname } - trail rows live on their own page
 * the parse descriptor is lib/resorts/<id>/trails.js
 */
export default async function fetch(resort, fn) {
  if (!resort.trails) {
    return fn(null, undefined);
  }
  if (!resort._trailsParse) {
    const { default: descriptor } = await import(`../resorts/${resort.id}/trails.js`);
    resort._trailsParse = descriptor;
  }
  const url = resort.trails.host ? resort.trails : resort.dataUrl || resort.url;
  debug('fetch trails for %s', resort.id);
  request(url)
    .then(async res => {
      if (res.status < 200 || res.status >= 300) {
        console.error('Error fetching trails', url, res.status);
        return fn(res.status);
      }
      if (url.json) {
        const body = await res.json();
        return fn(null, shape(collect(body, resort._trailsParse)));
      }
      const html = await res.text();
      const parse = dom => {
        try {
          return collect(dom, resort._trailsParse);
        } catch (e) {
          console.error(`Exception when parsing trails for ${resort.id}`, e);
          return [];
        }
      };
      parseHtml(html, parse, (err, list) => {
        if (err) {
          return fn(err);
        }
        fn(null, shape(list));
      });
    })
    .catch(fn);
}

function shape(list) {
  const hasLevels = list.some(t => t.level);
  return {
    stats: stats(list),
    list: hasLevels ? list : Object.fromEntries(list.map(({ name, status }) => [name, status]))
  };
}
