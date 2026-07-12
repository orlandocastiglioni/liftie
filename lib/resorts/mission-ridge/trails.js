import { findText } from '../../tools/domutil.js';

// trail tables are `table.status.trail` (the lift table is bare `table.status`);
// difficulty is an icon image, status is O / X text
export default {
  selector: 'table.status.trail tr',
  parse: row => {
    const tds = row.children.filter(c => c.name === 'td');
    const byClass = cls => tds.find(td => td.attribs?.class === cls);
    const name = findText(byClass('trail'));
    const status = findText(byClass('status'));
    const icon = byClass('difficulty')?.children.find(c => c.name === 'img');
    const level = icon?.attribs.src.match(/mark-([a-z-]+)\.svg/)?.[1];
    if (name && status) {
      return { name, status, level };
    }
  }
};
