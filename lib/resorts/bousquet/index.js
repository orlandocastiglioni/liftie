import select from '../../select.js';
import { squish, text, visibleStatus } from './rows.js';

// column headers ("Status", "Condition") are rows with a heading but no
// status widget - guard against them anyway
const HEADER = /^(status|condition)s?$/i;

// the name doubles as an operating-hours note: "blue chair (open @3pm
// midweek)", "blue chair - OPENS @ 3 MON - THU", "Beginner area carpet
// (Closes 1 hr. before lifts)". Drop the trailing clause when it is a note.
function liftName(name) {
  return name.replace(/\s*[-–(].*$/, m => (/\b(open|clos)/i.test(m) ? '' : m)).trim();
}

// lift rows are the inner sections WITHOUT an icon-box (that widget marks a
// trail row). The legend has no heading, the staff cards and the header rows
// have no status widget, so requiring both a name and a visible status leaves
// exactly the 4 lifts. Status vocabulary is OPEN / CLOSED / ON HOLD /
// SCHEDULED, all already known to coerce.
export default {
  selector: 'section.elementor-inner-section:not(:has(.elementor-widget-icon-box))',
  parse(node) {
    const name = liftName(squish(text(select(node, '.elementor-heading-title')[0])));
    if (!name || HEADER.test(name)) {
      return;
    }
    // skip rather than report <scheduled>: when every status variant is
    // hidden the page is simply not telling us anything about this lift
    const status = visibleStatus(node);
    if (!status) {
      return;
    }
    return { name, status };
  }
};
