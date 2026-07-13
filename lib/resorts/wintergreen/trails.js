import { findText } from '../../tools/domutil.js';

// run tables use the same data-title cells; no difficulty column
export default {
  selector: 'tr:has(td[data-title="Run Name"])',
  parse: row => {
    const tds = row.children.filter(c => c.name === 'td');
    const byTitle = t => tds.find(td => td.attribs?.['data-title'] === t);
    const name = findText(byTitle('Run Name'));
    const status = byTitle('Status')?.attribs.class;
    if (name && status) {
      return { name, status };
    }
  }
};
