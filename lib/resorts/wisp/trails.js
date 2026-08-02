import { findText } from '../../tools/domutil.js';

// run tables use the same data-title cells; difficulty is an icon
// (green/blue/black/park svg) in the untitled first cell - icons are
// lazy-loaded, so the real url lives in data-lazy-src, not src
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
    const src = icon?.attribs['data-lazy-src'] ?? icon?.attribs.src;
    const level = src?.match(/(\w+)\.svg$/)?.[1];
    return { name, status, level };
  }
};
