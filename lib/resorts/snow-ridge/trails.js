import select from '../../select.js';
import { allText, findText } from '../../tools/domutil.js';

// same hand-posted table as the lifts: trail rows come before the
// "Lift Report" marker row; difficulty is an icon image in the name cell
export default function parse(dom) {
  const rows = [];
  for (const row of select(dom, 'table tr')) {
    const tds = row.children.filter(c => c.name === 'td');
    if (tds.some(td => td.children.some(c => c.name === 'h2'))) {
      break; // reached the Lift Report (or a later) section
    }
    if (tds.length < 2) {
      continue;
    }
    const icon = select(tds[0].children, 'img')[0];
    if (!icon) {
      continue; // header or filler row
    }
    const name = allText(tds[0])
      .replace(/^\s*\d+\.\s*/, '')
      .trim();
    const status = findText(tds[1]);
    if (name && status) {
      rows.push({
        name,
        status,
        level: icon.attribs.alt || icon.attribs.src.match(/icon-([a-z_]+)\.png/)?.[1]
      });
    }
  }
  return rows;
}
