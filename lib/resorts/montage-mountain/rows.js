import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

/**
 * Montage publishes trails AND lifts in one hand-maintained table, #tgtable on
 * /trails/, so a single fetch feeds both parsers. The trail block comes first,
 * then a second header row (<th>LIFT</th><th>STATUS</th>) introduces the lifts.
 * There is no class or wrapper distinguishing the two blocks - the header row
 * is the only marker - so this walks the rows in order and flips a mode flag
 * whenever a header row goes by.
 *
 * The table is pasted into the WordPress editor by hand: row order, row
 * membership and even the icons drift between edits, so nothing here is keyed
 * to a position or a known name.
 *
 * Data rows carry four <td>: [0] difficulty / lift-type icon (a background
 * image in the inline style), [1] name, [2] status, [3] grooming - which is
 * present in the header but empty on every row ever captured, so it is ignored.
 */
export default function statusRows(dom) {
  const rows = [];
  let isLift = false;
  for (const tr of select(dom, '#tgtable tr')) {
    const headers = select(tr, 'th');
    if (headers.length > 0) {
      const label = headers.map(allText).join(' ');
      if (/lift/i.test(label)) {
        isLift = true;
      } else if (/trail/i.test(label)) {
        isLift = false;
      }
      continue;
    }
    const cells = select(tr, 'td');
    if (cells.length < 3) {
      continue;
    }
    const name = allText(cells[1]).trim();
    const status = allText(cells[2]).trim();
    if (!name || !status) {
      continue;
    }
    rows.push({ name, status, icon: icon(cells[0]), isLift });
  }
  return rows;
}

// the icon is a background image on the first cell:
// style="background: url('/wp-content/uploads/2016/09/Diamond.png'); ..."
// rows with no icon carry a literal url('') and yield an empty string
function icon(cell) {
  return cell.attribs.style?.match(/url\('([^']*)'\)/)?.[1] ?? '';
}
