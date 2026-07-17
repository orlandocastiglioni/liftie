import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// each .chair-header.row starts with a "Chair Status" label block; the lift
// name lives in .chair-header-right h2 and the state in the status icon alt
export default {
  selector: '.chair-header.row',
  parse: row => {
    const name = findText(select(row.children, '.chair-header-right h2')[0]);
    const status = select(row.children, '.chair-status img')[0]?.attribs.alt;
    if (name && status) {
      return { name, status };
    }
  }
};
