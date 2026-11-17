import select from '../../select.js';
import { clean, deepText, status } from './report.js';

/**
 * table.trails-list: tr[data-type="trail"] rows with the map number in
 * td.trail-number, the name in span.table-informations-trigger, and the grade
 * as the image icon-level-<grade>@2x.png on the Quebec scale: easy (green
 * circle), hard (blue square), very-hard (black diamond), extreme (double
 * black). Glades, moguls and parks are a second, type icon; parks are
 * published as terrainPark.
 */
const LEVELS = {
  easy: 'green',
  hard: 'blue',
  'very-hard': 'black',
  extreme: 'doubleBlack'
};

export default function trails(dom) {
  return select(dom, 'table.trails-list tr[data-type="trail"]').flatMap(row => {
    const name = clean(deepText(select(row, '.table-informations-trigger')[0]));
    if (!name) {
      return [];
    }
    const number = clean(deepText(select(row, 'td.trail-number')[0]));
    const images = select(row, 'img').map(i => i.attribs.src ?? '');
    const grade = images.map(s => s.match(/icon-level-([a-z-]+?)(?:@2x)?\.png/)?.[1]).find(Boolean);
    const park = images.some(s => /icon-type-parks/.test(s));
    return [
      {
        name: number ? `${number} ${name}` : name,
        status: status(row),
        level: park ? 'terrainPark' : LEVELS[grade],
        grade
      }
    ];
  });
}
