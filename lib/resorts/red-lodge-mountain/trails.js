import select from '../../select.js';
import { allText, findText } from '../../tools/domutil.js';

// runs live on the same snow report page as the lifts: each chair header is
// followed by a .runs-wrapper with div.run.row rows; level and status are
// icon alts (green_circle/blue_square/black_diamond/double_black_diamond/park
// and open/closed/scheduled/hold); 'closed-contest' (the Closed (Race) icon)
// is unknown to coerce, so pre-map it to closed
const statusMap = {
  'closed-contest': 'closed'
};

export default {
  selector: 'div.run.row',
  parse: row => {
    const nameNode = select(row.children, '.run-name')[0];
    if (!nameNode) {
      return;
    }
    const status = select(row.children, '.run-status img')[0]?.attribs.alt;
    return {
      name: allText(nameNode).trim() || findText(nameNode),
      status: statusMap[status] ?? status,
      level: select(row.children, '.run-level img')[0]?.attribs.alt
    };
  }
};
