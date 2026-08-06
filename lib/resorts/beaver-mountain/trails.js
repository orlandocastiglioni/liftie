/*
 * Trails share the lift page ("trails": true) - each run sits in the accordion
 * body of the lift that serves it:
 *
 *   <ul class="no-bullet list_trails">
 *     <li class="green Groomed">Cottontail<span>Groomed</span></li>
 *
 * Name is child text node 0, status is the `<span>` at child 1, and the level
 * is the first class token. The class's second token repeats the status, but
 * reading the span keeps name/status/level from all depending on one attribute.
 *
 * The selector must stay scoped to `ul.list_trails`: the snow-report block on
 * the same page uses bare `<li class="hour48|hour24|hour12|current|total|
 * surface|temps">` rows that a looser selector would pull in as trails.
 *
 * Levels: green / blue / black / terrain -> green, blue, black, terrainPark
 * (all known to normalizeLevel; Beaver publishes no double blacks).
 * Statuses: Open / Groomed / Closed - coerce maps groomed -> open, so the
 * grooming detail is intentionally collapsed into "open".
 *
 * Function form rather than a bare descriptor so the same freshness gate as the
 * lifts can suppress last season's report - see fresh.js.
 */
import select from '../../select.js';
import { text } from '../../tools/domutil.js';
import isFresh from './fresh.js';

const SELECTOR = 'ul.list_trails > li';
const PARSE = {
  name: 0,
  status: 1,
  level: { attribute: 'class', regex: /^(\S+)/ }
};

export default function parse(dom) {
  if (!isFresh(dom)) {
    return [];
  }
  return select(dom, SELECTOR).map(node => ({
    name: text(node, PARSE.name),
    status: text(node, PARSE.status),
    level: text(node, PARSE.level)
  }));
}
