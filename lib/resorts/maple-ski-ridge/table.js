import select from '../../select.js';

/**
 * The slope report is three Wix table components on one page - trails,
 * lifts and a conditions key/value block, in that order. The component ids
 * (comp-m8i0dt05, ...) and the hashed style classes rotate on every Wix
 * rebuild, so tables are located by their header text and rows/cells by the
 * stable wixui-table__* classes.
 */
export function tableByHeader(dom, label) {
  return select(dom, 'div.wixui-table table').find(table =>
    select(table, 'th.wixui-table__cell').some(th => cellText(th) === label)
  );
}

export function rowsOf(table) {
  return select(table, 'tbody.wixui-table__body tr.wixui-table__row');
}

export function cellsOf(row) {
  return select(row, 'td.wixui-table__cell');
}

// every cell wraps its content in an unnamed inner div (and the name cell
// adds another styled div), so text has to be collected recursively -
// findText/allText would stop too early or miss nested nodes
export function cellText(node) {
  return collectText(node).trim();
}

function collectText(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(collectText).join('');
}
