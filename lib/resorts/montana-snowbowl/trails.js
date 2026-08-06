import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

/**
 * Difficulty comes from the class list of the row's direct span.icon.
 * Mapped explicitly rather than left to normalizeLevel because
 * 'double-diamond' is not in its levels map and would come back undefined.
 * Reading only the outer span.icon also avoids the double-diamond trap: its
 * markup nests two bare '.black-diamond' spans inside, which a descendant
 * match would mistake for a single black.
 */
const levels = {
  'green-circle': 'green',
  'blue-square': 'blue',
  'black-diamond': 'black',
  'double-diamond': 'doubleBlack'
};

/**
 * 56 trails in six location blocks ('.table-responsive.mb-18'), on the same
 * page as the lifts. Columns are name, Status, Condition, Comments - status is
 * strictly Open/Closed, while the Condition column holds grooming words like
 * 'Groomed' that coerce would happily turn into 'open', so only td 2 is read.
 * Trail names are unique across all six blocks, so the grouping is dropped.
 */
export default function parse(dom) {
  const rows = [];
  for (const row of select(dom, '.table-responsive.mb-18 table tbody tr')) {
    const cells = select(row, 'td');
    if (cells.length < 2) {
      continue;
    }
    const name = allText(cells[0]).trim();
    if (!name) {
      continue;
    }
    const classes = (select(cells[0], 'span.icon')[0]?.attribs.class ?? '').split(/\s+/);
    rows.push({
      name,
      status: allText(cells[1]).trim(),
      level: classes.map(c => levels[c]).find(Boolean)
    });
  }
  return rows;
}
