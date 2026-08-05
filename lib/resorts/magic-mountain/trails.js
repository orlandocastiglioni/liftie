import select from '../../select.js';
import { childText, findText } from '../../tools/domutil.js';
import { normalizeLevel } from '../../trails/parse.js';
import { cellStatus, cleanName } from './table.js';

// Trails live on the same page as the lifts, split over four tables - one per
// difficulty band. The difficulty is not in the row: it sits in the <h1> of
// the section immediately before each table ("Easiest", "More Difficult",
// "Most Difficult", "Experts Only"), all of which normalizeLevel already
// knows. Walking headings and tables together in document order avoids
// hard-coding the four Wix component ids, and naturally skips the lift table -
// its heading reads "Lifts", which is not a level.
export default function parse(dom) {
  const rows = [];
  let level;
  for (const node of select(dom, 'h1, div.wixui-table')) {
    if (node.name === 'h1') {
      level = normalizeLevel(findText(node));
      continue;
    }
    if (!level) {
      continue;
    }
    for (const tr of select(node, 'tbody.wixui-table__body tr.wixui-table__row')) {
      // cells: 0 = trail, 1 = Open, 2 = Grooming, 3 = Snowmaking. Grooming and
      // snowmaking use the same check-mark convention but liftie wants status.
      const name = cleanName(childText(tr, 0));
      if (!name) {
        continue;
      }
      rows.push({
        name,
        status: cellStatus(childText(tr, 1)),
        // the park is a normal row in the Most Difficult table and gets
        // renamed every season ("Terrain Park on Hocus Pocus" / "Terrain Park
        // in Abracadabra Area") - file it under its own level
        level: /terrain park/i.test(name) ? 'terrainPark' : level
      });
    }
  }
  return rows;
}
