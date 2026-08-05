import select from '../../select.js';
import { childText, findText } from '../../tools/domutil.js';

// massresort.com renders the same SnowReport-* component as jay-peak and
// tenney-mountain, but two details differ here:
//
// 1. the selector has to be scoped to section.SnowReport-section--lifts. The
//    legend at the bottom of the page is built out of an
//    <article class="SnowReport-Lift"> holding the *trail* key (and an
//    article.SnowReport-Trail holding the lift key), so a bare
//    article.SnowReport-Lift matches 8 nodes instead of 7.
//
// 2. the status has to come from the sr-label TEXT, not the pti-* icon class.
//    This site's legend maps pti-hold to the label "Scheduled" and
//    pti-hold-check to "On Hold" - inverted relative to what coerce() makes of
//    those class names - so an icon parser would report scheduled lifts as
//    hold and vice versa. The published labels (Open / Closed / Scheduled /
//    On Hold) all coerce correctly on their own.
//
// The label is matched as a DIRECT child of the status span: badge spans nest
// their sr-label inside the <i>, so `>` keeps grooming badges out of the way.
export default {
  selector: 'section.SnowReport-section--lifts article.SnowReport-Lift',
  parse(node) {
    const name = childText(node, 0);
    const status = findText(select(node, '.SnowReport-item-status > .SnowReport-sr-label')[0]);
    if (!name || !status) {
      return;
    }
    return { name, status };
  }
};
