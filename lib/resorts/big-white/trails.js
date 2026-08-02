import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// grooming report page lists all runs as <div class="row run-line"> with
// three cells: difficulty icon, run name, status icon
//
// status comes from the icon FILENAME, not its alt text - the page's legend
// carries buggy alts (groomed_icon.png is labeled "Standby"); 'ungroomed' is
// not in the central status vocabulary and means the run is open, just not
// groomed; groomed/open/closed coerce downstream
export default {
  selector: '#block-groomingreportblock .row.run-line',
  parse: node => {
    const name = findText(select(node.children, '.run-name')[0]);
    const levelImg = select(node.children, '.icon img')[0];
    const statusImg = select(node.children, '.left.icon img')[0];
    const token = statusImg?.attribs?.src?.match(/(groomed|ungroomed|open|closed)_icon/)?.[1];
    if (!name || !token) {
      return;
    }
    return {
      name,
      status: token === 'ungroomed' ? 'open' : token,
      // alt is green|blue|black|double_black - normalizeLevel handles all four
      level: levelImg?.attribs?.alt
    };
  }
};
