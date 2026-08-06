import select from '../../select.js';

/**
 * /zima/vleky-a-sjezdovky serves lifts and slopes from one server-rendered
 * page (no javascript, no Cloudflare), so one fetch feeds both pipelines.
 *
 * The catch: the two tables carry the IDENTICAL class attribute
 * (table.table-slopes.pricelist-table) and differ only in column layout -
 * slopes first, lifts second - and the cross-country page adds a third with
 * the same class again. Picking by class or by index is a coin flip the day
 * the CMS reorders them, so select by the caption in the thead instead.
 */

// cells are pretty-printed and use &nbsp; between the digit groups
// ("1&nbsp;000\n m"), so normalise rather than reading a single text child.
// The slope named "Pomezky " also carries a trailing space in the markup.
export function text(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(text).join('').replace(/\s+/g, ' ').trim();
}

/**
 * @param caption - thead title, 'PROVOZ VLEKŮ' (lifts) or 'PROVOZ SJEZDOVEK'
 * @returns one entry per data row: { state span, cells }
 */
export default function rows(dom, caption) {
  const table = select(dom, 'table.table-slopes').find(t => text(select(t, 'thead .global-title .tit')[0]) === caption);
  if (!table) {
    return [];
  }
  return (
    select(table, 'tbody tr')
      .map(tr => ({
        state: select(tr, 'td.stav span.state')[0],
        cells: select(tr, 'td')
      }))
      // every tbody ends with a "Celkem" totals row that has no status span;
      // without this it would publish as a phantom lift/trail
      .filter(row => row.state)
  );
}
