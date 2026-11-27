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
 * Statuses: Open / Groomed / Closed. "Groomed" is a grooming state, not an
 * open state, and the board is not reset between days: on 2026-11-26, before
 * opening day, with every lift closed and the header reading "0 Lifts Open 0
 * Runs Open", 33 of the 48 runs still read Open (18) or Groomed (15) from
 * early-season track packing. So:
 *
 * - only an explicit "Open" is open; "Groomed" reads closed,
 * - unless the header's own runs-open count (header.js) vouches for the
 *   groomed runs too, i.e. it is at least Open + Groomed. On the 3/27/26
 *   closing day the header read 44 runs open against 18 Open + 15 Groomed, so
 *   there the groomed runs were genuinely skiable and stay open,
 * - and a header count of 0 publishes every run closed, whatever the rows say.
 *
 * coerce.js maps a bare 'groomed' to open, so the status is resolved here and
 * never handed to it raw.
 *
 * Function form rather than a bare descriptor so the same freshness gate as the
 * lifts can suppress last season's report - see fresh.js.
 */
import select from '../../select.js';
import { text } from '../../tools/domutil.js';
import isFresh from './fresh.js';
import headerCounts from './header.js';

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
  const rows = select(dom, SELECTOR).map(node => ({
    name: text(node, PARSE.name),
    status: text(node, PARSE.status)?.trim().toLowerCase(),
    level: text(node, PARSE.level)
  }));
  const { runs } = headerCounts(dom);
  const open = rows.filter(r => r.status === 'open').length;
  const groomed = rows.filter(r => r.status === 'groomed').length;
  const groomedIsOpen = runs !== undefined && runs > 0 && runs >= open + groomed;
  for (const row of rows) {
    if (runs === 0) {
      row.status = 'closed';
    } else if (row.status === 'groomed') {
      row.status = groomedIsOpen ? 'open' : 'closed';
    }
  }
  return rows;
}
