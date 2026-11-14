import select from '../../select.js';
import coerce from '../../tools/coerce.js';

/**
 * mountsouthington.com/trails-and-conditions: the header widget repeats the
 * counts ("Trails Open: 0/14"), and the report itself is two lists,
 * .trails-open ul.trails and .lifts-open ul.trails, of li.trail.<status>
 * rows: .trail-name ("The Glacier:" - trailing colon dropped), .status text,
 * and for trails a difficulty image trail-difficulty-<colour>.png
 * (green / blue / black / orange = terrain park). Only the containers that
 * hold a list are read, so the header counters never publish.
 */
const LEVELS = { green: 'green', blue: 'blue', black: 'black', orange: 'terrainPark' };

function text(node) {
  if (!node) {
    return '';
  }
  return node.type === 'text' ? node.data : (node.children ?? []).map(text).join('');
}

export function rows(dom, section) {
  const seen = new Set();
  return select(dom, `.${section} ul.trails > li.trail`).flatMap(li => {
    const name = text(select(li, '.trail-name')[0]).replace(/\s+/g, ' ').replace(/:\s*$/, '').trim();
    if (!name || seen.has(name)) {
      return [];
    }
    seen.add(name);
    const state = text(select(li, '.status')[0]).trim() || li.attribs.class.replace(/^trail\s*/, '');
    const colour = (select(li, '.difficulty img')[0]?.attribs?.src ?? '').match(/trail-difficulty-([a-z]+)\./)?.[1];
    return [{ name, status: coerce(state), level: LEVELS[colour] }];
  });
}
