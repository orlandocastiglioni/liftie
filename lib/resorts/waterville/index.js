import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// features.waterville.com/propsnow is a PropApps snow report: one
// article.SnowReport-Lift per lift, whose span.SnowReport-item-status holds a
// pti-(open|closed|hold|hold-check) icon plus a screen-reader label.
//
// Read the icon, not the label: the legend calls pti-hold "Wind Delay" and
// pti-hold-check "On Hold". coerce knows 'onhold' but not 'winddelay', so the
// label route reported a wind-delayed lift as 'scheduled'. The icon is also
// what trails.js reads.
const statuses = {
  'hold-check': 'hold'
};

export default {
  selector: '.SnowReport-section--lifts article.SnowReport-Lift',
  parse(node) {
    const name = findText(select(node, 'h3.SnowReport-feature-title')[0])?.trim();
    const icon = select(node, 'span.SnowReport-item-status i.pti')[0];
    const status = icon?.attribs.class.match(/pti-([a-z-]+)/)?.[1];
    if (!name || !status) {
      return;
    }
    return { name, status: statuses[status] ?? status };
  }
};
