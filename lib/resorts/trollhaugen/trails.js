import select from '../../select.js';
import { allText, findText } from '../../tools/domutil.js';

/**
 * Difficulty is encoded ONLY in the icon filename - there is no alt text and
 * no class. The map has to be explicit: this plugin's `expert` icon is a
 * SINGLE black diamond, while liftie's normalizeLevel reads the token
 * 'expert' as doubleBlack, which would render 10 of the 27 runs (plus 2
 * parks) as double-black. Unknown filenames deliberately fall through to no
 * level - the plugin's difficulty taxonomy is site-configurable, so new ones
 * can appear.
 */
const levels = {
  beginner: 'green', // green circle
  intermediate: 'blue', // blue square
  expert: 'black', // single black diamond
  'expert-only': 'doubleBlack' // double black diamond
};

/**
 * Same page and same row shape as the lifts (see index.js). Runs are
 * p.trail-access-name, parks are p.terrain-park-access-name; the park rows
 * carry a skill icon rather than a park icon, so their level is forced to
 * terrainPark. p.tubing-access-name is excluded.
 *
 *   <p class="trail-access-name"><img src=".../intermediate.png">
 *      <strong>Jim&#039;s Run:</strong>
 *      <img class="status-icon" src=".../red-x-32.png"> Closed </p>
 *
 * Row order is not stable between page revisions, so everything is read per
 * row. Names carry HTML entities and Norwegian characters (Jotunn, Ragnarok,
 * Kalbakken, Soppelhaug with their diacritics) - the parser decodes entities
 * and the page is UTF-8.
 */
export default function parse(dom) {
  const rows = [];
  for (const node of select(dom, 'p.trail-access-name, p.terrain-park-access-name')) {
    const name = findText(select(node, 'strong')[0])?.replace(/:\s*$/, '').trim();
    if (!name) {
      continue;
    }
    const park = /(?:^|\s)terrain-park-access-name(?:\s|$)/.test(node.attribs.class ?? '');
    const icon = select(node, 'img:not(.status-icon)')[0];
    const level = park ? 'terrainPark' : levels[icon?.attribs.src?.match(/\/([a-z-]+)\.png$/)?.[1]];
    rows.push({ name, status: allText(node), level });
  }
  return rows;
}
