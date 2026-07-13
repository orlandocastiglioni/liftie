import select from '../../select.js';
import { allText, findText } from '../../tools/domutil.js';

// trail rows carry a difficulty-circle span in the name cell;
// lift heading rows (label-status-row) have none and are skipped
export default {
  selector: 'table.runs-table tr',
  parse: row => {
    const tds = row.children.filter(c => c.name === 'td');
    const circle = tds[0] && select(tds[0].children, '.difficulty-circle')[0];
    if (!circle) {
      return;
    }
    const name = allText(tds[0]).trim();
    const status = findText(tds[1]);
    if (name && status) {
      return {
        name,
        status,
        level: circle.attribs.class.match(/difficulty-circle difficulty-([a-z-]+)/)?.[1]
      };
    }
  }
};
