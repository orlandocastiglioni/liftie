import select from '../../select.js';
import { normalizeLevel } from '../../trails/parse.js';

function deepText(node) {
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(deepText).join('');
}

/*
 * hand-maintained WordPress/Avada tables on the conditions page; the resort
 * publishes no per-lift status at all (see "no": { "lifts": true }).
 *
 * one div.table-1 per difficulty (div.table-2 is the stats box, hence the
 * "-1" suffix), preceded by an <h2> whose text sits next to a difficulty
 * icon - `<h2><img .../>Easiest</h2>` - so the heading needs a deep text
 * read and the level has to be tracked in document order: the "Most
 * Difficult" table is separated from its heading by an empty spacer
 * fusion-title, so sibling walking silently loses the level.
 *
 * rows are `<td><strong>OPEN</strong></td><td>Trigger</td>` - status first,
 * name second - and the first three data rows of every table live inside
 * <thead> next to the <th>Status</th> header row, so the rows are selected
 * unscoped and the header is dropped by its lack of <td> cells.
 * status vocabulary is OPEN/CLOSED only, both known to coerce.
 */
export default function parse(dom) {
  const rows = [];
  let level;
  for (const node of select(dom, '.table-1, h2')) {
    if (node.name === 'h2') {
      // ignore the page title h2s - only real difficulty headings win
      level = normalizeLevel(deepText(node).trim()) ?? level;
      continue;
    }
    for (const tr of select(node, 'tr')) {
      const cells = select(tr.children, 'td');
      if (cells.length < 2) {
        continue;
      }
      const name = deepText(cells[1]).trim();
      if (name) {
        rows.push({ name, status: deepText(cells[0]).trim(), level });
      }
    }
  }
  return rows;
}
