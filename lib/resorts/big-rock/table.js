import select from '../../select.js';

/**
 * The whole report is one WYSIWYG rich-text block holding three or four bare
 * <table> elements with no id or class, and winter pages carry an extra promo
 * table on top - so nothing may be located positionally. Tables are matched by
 * the text of their header row and columns by the text of their header cell.
 */

// domutil.allText only reads direct text children, and the trail difficulty
// glyph sits in td > h2 > span, so collect text recursively
export function text(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(text).join('');
}

function cell(node) {
  return text(node).replace(/\s+/g, ' ').trim();
}

/**
 * find the table whose header row mentions `label` and return its data rows
 * (the header row is a plain <td><strong>, not a <th>, so it is dropped by
 * index) together with a column lookup keyed on header text
 */
export default function report(dom, label) {
  for (const table of select(dom, 'table')) {
    const trs = select(table, 'tbody > tr');
    if (trs.length < 2) {
      continue;
    }
    const header = select(trs[0], 'td').map(cell);
    if (!header.some(h => h.includes(label))) {
      continue;
    }
    return {
      // the status column header carries the open count ("Open ( 18/25 )"),
      // so callers pass the last column as a fallback in case it is reworded
      column(regex, fallback = -1) {
        const index = header.findIndex(h => regex.test(h));
        return index < 0 ? fallback : index;
      },
      last: header.length - 1,
      rows: trs.slice(1).map(tr => select(tr, 'td').map(cell))
    };
  }
  return { column: () => -1, last: -1, rows: [] };
}
