import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

// same platform as granite-peak: flat component rows, status icon title attr
export default {
  selector: '.lift.component-row',
  parse: row => {
    const title = select(row.children, '.cell.title')[0];
    const status = select(row.children, '.status .f-icon')[0];
    if (!title || !status) {
      return;
    }
    return { name: allText(title), status: status.attribs.title };
  }
};
