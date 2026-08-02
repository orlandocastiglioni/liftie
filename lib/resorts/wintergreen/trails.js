import { findText } from '../../tools/domutil.js';

// run tables use the same data-title cells; difficulty is an icon
// (green/blue/black/doubleblack/park svg) in the untitled first cell
export default {
  selector: 'tr:has(td[data-title="Run Name"])',
  parse: row => {
    const tds = row.children.filter(c => c.name === 'td');
    const byTitle = t => tds.find(td => td.attribs?.['data-title'] === t);
    const name = findText(byTitle('Run Name'));
    const status = byTitle('Status')?.attribs.class;
    if (!name || !status) {
      return;
    }
    const icon = byTitle('')?.children.find(c => c.name === 'img');
    const level = icon?.attribs.src?.match(/(\w+)\.svg$/)?.[1];
    return { name, status, level };
  }
};
