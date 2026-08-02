import select from '../../select.js';
import { allText, findText } from '../../tools/domutil.js';

// trail rows carry a difficulty span in the name cell - a shape class paired
// with a color class: 'difficulty-circle difficulty-green',
// 'difficulty-square difficulty-blue', 'difficulty-diamond difficulty-black';
// lift heading rows (label-status-row) have none and are skipped
export default {
  selector: 'table.runs-table tr',
  parse: row => {
    const tds = row.children.filter(c => c.name === 'td');
    const span = tds[0] && select(tds[0].children, '[class*="difficulty-"]')[0];
    if (!span) {
      return;
    }
    const name = allText(tds[0]).trim();
    const status = findText(tds[1]);
    if (name && status) {
      return {
        name,
        status,
        // the site CSS also defines difficulty-none/difficulty-unknown -
        // leave the level out for those
        level: span.attribs.class.match(/difficulty-(green|blue|black)/)?.[1]
      };
    }
  }
};
