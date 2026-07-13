import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// runs tables group trails under lift heading rows (tr.label-status-row)
export default {
  selector: 'table.runs-table tr.label-status-row',
  parse: row => {
    const name = findText(select(row.children, 'td.label')[0]);
    const status = select(row.children, 'td.main-status')[0]?.attribs.class.match(/status-([a-z]+)/)?.[1];
    if (name && status) {
      return { name, status };
    }
  }
};
