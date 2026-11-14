import select from '../../select.js';

/**
 * mtspokane.com moved to Duda in 2026: the report is /trail-maps ("Trail
 * Reports & Maps"), a set of table.table blocks whose first header cell names
 * the table (Lift/Area Name, Trail Name, Run Name) and whose rows are
 * name | status [| groomed]. Empty spacer rows are skipped. (Upstream's
 * /trail-reports/ page is a 404.)
 */
function text(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(text).join('');
}

const clean = s => s.replace(/ /g, ' ').replace(/\s+/g, ' ').trim();

export function tables(dom) {
  return select(dom, 'table.table').map(table => ({
    header: clean(text(select(table, 'th')[0])),
    rows: select(table, 'tr')
      .map(tr => select(tr, 'td').map(td => clean(text(td))))
      .filter(cells => cells.length >= 2 && cells[0])
      .map(([name, status]) => ({ name, status }))
  }));
}
