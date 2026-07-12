import { findText } from '../../tools/domutil.js';

// the runs table also has id="mpw-lifts" - anchor on the heading;
// columns are Name | Status | Accessed from | Grade
export default {
  selector: '.elementor-widget-heading:contains(Alpine run Status) + .elementor-widget-shortcode #mpw-lifts tbody tr',
  parse: row => {
    const tds = row.children.filter(c => c.name === 'td');
    const byClass = cls => tds.find(td => td.attribs?.class === cls);
    const name = findText(byClass('name'));
    const status = findText(byClass('status'));
    const level = findText(byClass('grade'));
    if (name && status) {
      return { name, status, level };
    }
  }
};
