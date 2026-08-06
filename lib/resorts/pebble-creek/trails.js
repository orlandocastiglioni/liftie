import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

/**
 * These tokens are the resort's own vocabulary and two of them do NOT mean
 * what liftie's default levels map assumes. The site's legend and the icons
 * bound to the .icon classes make Difficult a blue square ('More Difficult')
 * and Expert a single black diamond ('Most Difficult'), while Moderate is the
 * freestyle-terrain signpost. Left to normalizeLevel, Difficult would grade
 * black, Expert doubleBlack and Moderate would be dropped outright.
 */
const levels = {
  Easy: 'green',
  Difficult: 'blue',
  Expert: 'black',
  Moderate: 'terrainPark'
};

function textOf(node) {
  return node ? allText(node).trim() : '';
}

/**
 * The trail rows do not exist in the served HTML - the page's own jQuery
 * writes them from three GetConditions XHRs, one per area, which is why this
 * source is fetched through renderd. Never regex the raw markup: the three
 * inline <script> blocks contain the literal row template, so a text match
 * picks up 3 phantom rows on top of the real 46. A selector ignores them.
 * Status is Open | Groomed | Closed, all of which coerce already knows.
 */
export default function parse(dom) {
  const rows = [];
  for (const row of select(dom, '.trail-group .trail')) {
    const name = textOf(select(row, '.name span')[0]);
    if (!name) {
      continue;
    }
    rows.push({
      name,
      status: textOf(select(row, '.status .icon')[0]),
      level: levels[textOf(select(row, '.difficulty .icon')[0])]
    });
  }
  return rows;
}
