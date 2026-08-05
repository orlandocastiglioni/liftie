import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// hatleypointe.com/slope-report/ is only an iframe around the PropApps snow
// report (same white-label platform as bolton-valley and jay-peak), so the
// data comes from hatleypointe.propapps.io - server rendered, no JS needed.
//
// an article can hold several span.SnowReport-item-status: the first is the
// real status, the later ones are modifiers (Groomed, Snowmaking, ...). The
// status label is a SIBLING of its <i> while a modifier label is INSIDE its
// <i>, so the direct-child selector picks the status and never a modifier.
//
// published lift vocabulary is Open | Closed | On Hold, all known to coerce.
export default {
  selector: 'section.SnowReport-section--lifts article.SnowReport-Lift',
  parse: {
    name: node => findText(select(node, 'h3.SnowReport-feature-title')[0]),
    status: node => findText(select(node, '.SnowReport-item-status > .SnowReport-sr-label')[0])
  }
};
