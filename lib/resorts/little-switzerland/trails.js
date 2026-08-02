import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

export default {
  // terrain parks are published as separate rows with class "Terrain Park ... component-row"
  selector: '.Trail.component-row, .Terrain.Park.component-row',
  parse: row => {
    const title = select(row.children, '.cell.title')[0];
    const status = select(row.children, '.cell.status')[0];
    const level = title && select(title.children, '.f-icon.level')[0];
    if (!title || !status) {
      return;
    }
    return {
      name: allText(title),
      status: status.attribs.title ?? allText(status),
      // park rows carry no level icon - the row class is the only marker
      level: level?.attribs.title ?? (/\bTerrain\b/.test(row.attribs.class) ? 'terrainPark' : undefined)
    };
  }
};
