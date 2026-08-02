import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

// trail rows use class "Trail ... component-row"; the four terrain parks use
// "Terrain Park ... component-row" and carry no .f-icon.level element, so
// tag those with an explicit terrain park level
export default {
  selector: '.Trail.component-row, .Terrain.Park.component-row',
  parse: row => {
    const title = select(row.children, '.cell.title')[0];
    const status = select(row.children, '.cell.status')[0];
    if (!title || !status) {
      return;
    }
    const level = select(title.children, '.f-icon.level')[0];
    const isTerrainPark = /\bTerrain Park\b/.test(row.attribs.class ?? '');
    return {
      name: allText(title),
      status: status.attribs.title ?? allText(status),
      level: level?.attribs.title ?? (isTerrainPark ? 'terrain park' : undefined)
    };
  }
};
