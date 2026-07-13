import select from '../../select.js';
import { allText } from '../../tools/domutil.js';
import status from './status.js';

// h4 Runs section: same items with run-status icons; no difficulty markers
export default {
  selector: '.row.runs .item',
  parse: item => {
    const icon = select(item.children, 'img.run-status')[0];
    const name = allText(item).trim();
    if (name && icon) {
      return { name, status: status(icon.attribs.src) };
    }
  }
};
