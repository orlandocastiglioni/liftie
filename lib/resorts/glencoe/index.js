import select from '../../select.js';
import { findText } from '../../tools/domutil.js';
import status from './status.js';

// table.snow-lift under the Lift Status header: name td + status image td
export default {
  selector: 'table.snow-lift tbody tr',
  parse: row => {
    const tds = row.children.filter(c => c.name === 'td');
    const img = select(tds[1]?.children ?? [], 'img')[0];
    const name = findText(tds[0])?.trim();
    if (name && img) {
      return { name, status: status(img.attribs.src) };
    }
  }
};
