import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// conditions page is one feature list mixing weather, parking and the two
// lifts - keep only the lift-shaped entries
export default {
  selector: '.eael-feature-list-content-box',
  parse: box => {
    const name = findText(select(box.children, '.eael-feature-list-title')[0])?.trim();
    const status = findText(select(box.children, '.eael-feature-list-content')[0])?.trim();
    if (name && status && /lift|tow|chair|carpet/i.test(name)) {
      return { name, status };
    }
  }
};
