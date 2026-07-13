import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

export default {
  selector: '.Trail.component-row',
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
      level: level?.attribs.title
    };
  }
};
