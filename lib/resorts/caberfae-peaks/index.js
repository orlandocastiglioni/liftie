import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// Enfold/avia icon list on /snow-report/: the first-column icon list holds the lifts;
// status is the entypo-fontello glyph in data-av_icon: U+E812 (check) = open,
// U+E813 (cross) = closed; treat anything else as closed.
// Do not scope by the generated av-XXXX hash classes - they change on page edits.
const OPEN_ICON = '\ue812'; // '\ue813' when closed

export default {
  selector: '.flex_column.first ul.avia-icon-list li',
  parse: {
    name: node => findText(select(node.children, 'h4.av_iconlist_title')[0]),
    status: node =>
      select(node.children, 'span.iconlist-char')[0]?.attribs?.['data-av_icon'] === OPEN_ICON ? 'open' : 'closed'
  }
};
