import { findText } from '../../tools/domutil.js';

// Pacific Group Resorts theme: cells are tagged with data-title attributes,
// the Status cell carries the state as a class (text/images vary)
export default {
  selector: 'tr:has(td[data-title="Lift Name"])',
  parse: row => {
    const tds = row.children.filter(c => c.name === 'td');
    const byTitle = t => tds.find(td => td.attribs?.['data-title'] === t);
    const name = findText(byTitle('Lift Name'));
    const status = byTitle('Status')?.attribs.class;
    if (name && status) {
      return { name, status };
    }
  }
};
