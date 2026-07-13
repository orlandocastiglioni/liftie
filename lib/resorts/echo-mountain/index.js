import select from '../../select.js';
import { allText } from '../../tools/domutil.js';
import status from './status.js';

// h4 Lifts section: div.row.lifts > .item with a status icon and the name as text
export default {
  selector: '.row.lifts .item',
  parse: item => {
    const icon = select(item.children, 'img.lift-status')[0];
    const name = allText(item).trim();
    if (name && icon) {
      return { name, status: status(icon.attribs.src) };
    }
  }
};
