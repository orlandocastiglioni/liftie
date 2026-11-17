import Debug from 'debug';
import { parseHtml } from '../lifts/parser.js';
import request from '../lifts/request.js';
import parseCsv from '../tools/csv.js';
import parseLoose from '../tools/fixjson.js';
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
        const body = url.fixJson ? parseLoose(await res.text()) : await res.json();
        // a (body, fn) descriptor is async, mirroring lib/lifts/parse.js's
        // isAsync: it may fetch more documents (Baqueira's four sector feeds)
        // before handing back its rows
        if (typeof resort._trailsParse === 'function' && resort._trailsParse.length > 1) {
          return resort._trailsParse(body, (err, rows) => (err ? fn(err) : fn(null, shape(collect(rows, r => r)))));
        }
        return fn(null, shape(collect(body, resort._trailsParse)));
      }
      if (url.csv) {
        const rows = parseCsv(await res.text());
        return fn(null, shape(collect(rows, resort._trailsParse)));
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
  const hazards = list.filter(t => t.hazard).map(t => t.name);
  const rows = hazards.length ? list.map(({ hazard, ...t }) => t) : list;
  const shaped = {
    stats: stats(list),
    list: hasLevels ? rows : Object.fromEntries(list.map(({ name, status }) => [name, status]))
  };
  // Per-trail caution flags ride in a parallel { name: true } map, present only
  // when some trail has one, and never inside `list`. `list` has two shapes - an
  // array of row objects when the source grades its trails, a bare
  // { name: status } map when it does not - and a status string has nowhere to
  // carry a flag, so a per-row field could only ever exist in one of them.
  // A parallel map reads the same for both, and adds a key older consumers
  // simply never look at. The status itself is unchanged (Nordic Pulse's open +
  // hazard stays 'hold').
  if (hazards.length) {
    shaped.hazards = Object.fromEntries(hazards.map(name => [name, true]));
  }
  // When the source dates its own report, pass that through so consumers can
  // tell a current report from last season's. This is NOT the publisher's
  // fetchedAt: that only records when the payload last changed at all, and a
  // frozen report still wobbles by a trail or two, so it reads as fresh.
  if (list.reportedAt) {
    shaped.reportedAt = list.reportedAt;
  }
  return shaped;
}
