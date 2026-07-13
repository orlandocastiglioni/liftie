import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

export default {
  selector: '.trail.component-row',
  parse: row => {
    const title = select(row.children, '.cell.title')[0];
    const status = select(row.children, '.status .f-icon')[0];
    const level = title && select(title.children, '.f-icon.level')[0];
    if (!title || !status) {
      return;
    }
    return {
      name: allText(title),
      status: status.attribs.title,
      level: level?.attribs.title
    };
  }
};
