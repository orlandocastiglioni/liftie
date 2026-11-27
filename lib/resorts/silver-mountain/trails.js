import select from '../../select.js';
import { badge, items, label } from './rows.js';

/**
 * Trail rows, in page order, from every lift's block (rows.js). DIFFICULTY is
 * the trail-sign's data-sign, Silver's own five-step legend at the top of the
 * page: Easy, More Difficult, Difficult, Expert, Terrain Park. The redesign
 * regraded a number of runs (the old Font Awesome icons put e.g. Happy Jack
 * at black; the new page signs it 'more'), so the page's word is taken as is.
 */
const levels = {
  easy: 'green',
  more: 'blue',
  difficult: 'black',
  expert: 'doubleBlack',
  park: 'terrainPark'
};

export default function parse(dom) {
  const rows = [];
  for (const item of items(dom)) {
    for (const li of select(item, '.status-list__row')) {
      const name = label(select(li, '.status-list__row-name')[0]);
      if (!name) {
        continue;
      }
      const sign = select(li, '.trail-sign')[0]?.attribs?.['data-sign'];
      rows.push({ name, status: badge(select(li, '.status-badge')[0]), level: levels[sign] });
    }
  }
  return rows;
}
