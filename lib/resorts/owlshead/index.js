import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// the conditions page groups trails under lift sections; numbered
// .slope-name titles ("1. Summit") are the lifts, while the unnumbered
// "Snowparks" / "Alpine touring" sections are not
export default {
  selector: '.section-piste .slope-name',
  parse: row => {
    const title = findText(select(row.children, '.label-title')[0]);
    const m = title?.match(/^\d+\.\s*(.+)$/);
    const status = findText(select(row.children, '[class^=section-]')[0]);
    if (m && status) {
      return { name: m[1].trim(), status };
    }
  }
};
