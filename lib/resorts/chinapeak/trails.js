import select from '../../select.js';
import { allText, findText } from '../../tools/domutil.js';

// difficulty is only encoded in the icon image; no green image exists on this page
const levels = {
  level_mod: 'blue',
  level_diff: 'black',
  level_dd: 'doubleBlack'
};

// single-letter statuses: coerce knows 'O' but not 'C'
const statuses = {
  C: 'closed'
};

// run cells sit under each .chair-bar header:
// <div class="run-status ..."><table><tr>
//   <td><img src="/Content/images/level_mod.jpg"/></td>
//   <td>Academy - Upper &nbsp; <span class="O">O</span></td>
// </tr></table></div>
export default {
  selector: '.run-status',
  parse: node => {
    const span = select(node, 'span')[0];
    if (!span) {
      return;
    }
    const status = findText(span)?.trim();
    const img = select(node, 'img')[0];
    return {
      name: allText(span.parent).trim(),
      status: statuses[status] ?? status,
      level: levels[img?.attribs?.src?.match(/level_\w+/)?.[0]]
    };
  }
};
