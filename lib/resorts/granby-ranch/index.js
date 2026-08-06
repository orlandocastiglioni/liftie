import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// The LIFTS accordion card renders one div per lift. Status lives in the BEM
// modifier on the row itself ('trail-status-list__lift--open' /
// '--closed'), never in the icons: every row emits BOTH a closed.svg and a
// checkmark-icon.svg and CSS picks the visible one, so keying off the <img>
// would report every lift as open.
export default {
  selector: '.trail-status-list__lift',
  parse(node) {
    const name = findText(select(node, '.tname')[0]);
    const status = node.attribs.class?.match(/trail-status-list__lift--(\w+)/)?.[1];
    if (!name || !status) {
      return;
    }
    return { name, status };
  }
};
