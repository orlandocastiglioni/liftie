import select from '../../select.js';
import { findText } from '../../tools/domutil.js';
import translate from './status.js';

// the only structured per-trail data the resort publishes is the terrain
// park table in the same condition block the lifts come from
export default {
  selector: '.condition-park table tr',
  parse: row => {
    const name = findText(select(row.children, 'th')[0]);
    const state = findText(select(row.children, 'td')[0]);
    if (name && state) {
      return { name, status: translate(state), level: 'terrainPark' };
    }
  }
};
