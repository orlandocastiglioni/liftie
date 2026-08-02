import select from '../../select.js';
import coerce from '../../tools/coerce.js';

// deep text - status/name cells sometimes wrap their text in <strong>
function textOf(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(textOf).join('');
}

// flexible-table-block table whose header row says 'Lift'; data rows are
// [swatch td, lift td, run td, status th] - the status lives in a th CELL
// that the site removes entirely in summer, so off-season rows have no th
// and yield no lifts; the swatch color is decorative (red even when open)
export default function parse(dom) {
  const liftStatus = {};
  for (const figure of select(dom, 'figure.wp-block-flexible-table-block-table')) {
    const rows = select(figure.children, 'tr');
    const header = rows.length ? select(rows[0].children, 'th').map(th => textOf(th).trim()) : [];
    if (!header.includes('Lift')) {
      continue;
    }
    for (const row of rows) {
      const tds = row.children.filter(c => c.name === 'td');
      const status = row.children.find(c => c.name === 'th');
      const lift = tds.length >= 3 && textOf(tds[1]).trim();
      if (!lift || !status) {
        continue;
      }
      liftStatus[`${lift} (${textOf(tds[2]).trim()})`] = coerce(textOf(status).trim());
    }
  }
  return liftStatus;
}
