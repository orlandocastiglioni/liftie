import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

// Trail rows sit on the same mountain report page as the lifts, grouped under
// <details> headers named after the serving lift - the names are unique
// across groups, so no de-duplication is needed (unlike granite-peak).
//
// The difficulty badge is `.level_category` here, not `.f-icon.level` as on
// granite-peak/snowriver; its title is Beginner / Intermediate / Advanced /
// Park, all of which normalizeLevel already knows.
//
// In winter each row grows an extra `.cell.detail` holding groomed/snowmaking
// icons. It is a sibling of `.cell.title`, not a child, so it can pollute
// neither the name nor the level lookup.
export default {
  selector: '.trail.component-row',
  parse: row => {
    const title = select(row.children, '.cell.title')[0];
    const status = select(row.children, '.cell.status .status-block')[0];
    if (!title || !status) {
      return;
    }
    const level = select(title.children, '.level_category')[0];
    return {
      name: allText(title),
      status: allText(status),
      level: level?.attribs.title
    };
  }
};
