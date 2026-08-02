import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// trails sit on the same page as the lifts in six <table class="w-full">
// (the lift table uses min-w-full/mb-16, so it never matches): td0 = status
// svg aria-label ('Green circle with checkmark' | 'Red circle with X' |
// 'Yellow circle with triangle'), td1 = feature icons (groomer/snowmaking),
// td2 = difficulty svg aria-label ('Green circle' | 'Blue Square' |
// 'Black diamond'), td3 = name, optional td4 = free-text note
export default {
  selector: 'table.w-full tr',
  parse: row => {
    const tds = row.children.filter(c => c.name === 'td');
    if (tds.length < 4) {
      return;
    }
    const name = findText(tds[3]);
    const aria = select(tds[0].children, 'svg[role=img]')[0]?.attribs['aria-label'];
    const color = aria?.match(/red|green|yellow/i)?.[0];
    if (!name || !color) {
      return;
    }
    return {
      name,
      // coerce knows red/green but not yellow (On Hold)
      status: /yellow/i.test(color) ? 'hold' : color,
      level: select(tds[2].children, 'svg[role=img]')[0]?.attribs['aria-label']
    };
  }
};
