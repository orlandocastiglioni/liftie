import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

function iconLevel(td) {
  const icons = select(td.children, '[uk-icon]').map(n => n.attribs['uk-icon']);
  if (icons.some(i => i.includes('poker-diamonds'))) {
    return icons.filter(i => i.includes('poker-diamonds')).length > 1 ? 'doubleBlack' : 'black';
  }
  if (icons.some(i => i.includes('--square'))) {
    return 'blue';
  }
  if (icons.some(i => i.includes('circle'))) {
    return 'green';
  }
}

function hasClass(node, className) {
  if (node?.attribs?.class?.includes(className)) return true;
  if (node?.children) return node.children.some(c => hasClass(c, className));
  return false;
}

// several fs-tables (main trails, glades, terrain parks) share the layout;
// column sets vary (Open+Closed in season, single Closed column off season),
// so columns are located by their header text
export default function parse(dom) {
  const rows = [];
  for (const table of select(dom, 'table')) {
    const headers = select(table.children, 'thead th').map(th => (findText(th) ?? '').trim());
    const nameCol = headers.indexOf('Trail Name');
    if (nameCol < 0) {
      continue;
    }
    const statusCols = headers.map((h, i) => (['Open', 'Closed', 'Status'].includes(h) ? i : -1)).filter(i => i >= 0);
    for (const tr of select(table.children, 'tbody tr')) {
      const tds = tr.children.filter(c => c.name === 'td');
      const name = findText(tds[nameCol])?.trim();
      if (!name) {
        continue;
      }
      let status;
      if (statusCols.some(i => hasClass(tds[i], 'uk-text-success'))) {
        status = 'open';
      } else if (statusCols.some(i => hasClass(tds[i], 'uk-text-danger'))) {
        status = 'closed';
      } else {
        continue;
      }
      rows.push({ name, status, level: iconLevel(tds[0]) });
    }
  }
  return rows;
}
