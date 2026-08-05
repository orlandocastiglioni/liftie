import select from '../../select.js';
import { cells, textLines, walk } from './dom.js';

// difficulty is only ever encoded by the icon in front of the name;
// the basenames map straight onto normalizeLevel (park -> terrainPark,
// doubleblack -> doubleBlack)
const ICON = /\/trail_conditions\/([^/.]+)\.\w+$/i;

/**
 * Hunt Hollow's trail table (left-hand column of /The_Mountain) packs two
 * trails into a single <tr> on four of its rows, and does it two different
 * ways: either two sibling <h3> blocks or one <h3> split by a <br>. The
 * status cell is just as inconsistent - sometimes two <b>/<strong> elements,
 * sometimes one <b> holding both statuses separated by <br>.
 *
 * So instead of assuming one trail per row we read the name cell as a
 * sequence of difficulty icons (each icon starts a trail, the text after it
 * is the name) and the status cell as <br>-separated fragments, then zip the
 * two - they line up 1:1 on every row.
 *
 * Statuses read "CLOSED" or "OPEN - SC", i.e. the status optionally suffixed
 * with a condition code (PP, VC, P, MG, FG, VG, SC, BS, HP per the page's own
 * legend). The code has to be sliced off before coerce(), otherwise
 * "OPEN - SC" would silently degrade to 'scheduled'.
 */
export default function parse(dom) {
  const rows = [];
  for (const row of select(dom, 'div[id$="_TextArea_Large_divCol1"] table tr')) {
    const [nameCell, statusCell] = cells(row);
    const trails = namedTrails(nameCell);
    if (trails.length === 0) {
      continue;
    }
    const statuses = textLines(statusCell);
    trails.forEach((trail, i) => {
      rows.push({
        name: trail.name,
        status: statuses[i]?.split('-')[0],
        level: trail.level
      });
    });
  }
  return rows;
}

// every difficulty icon in the cell opens a new trail; the text following it
// (up to the next icon) is that trail's name
function namedTrails(cell) {
  const trails = [];
  walk(cell, node => {
    if (node.type === 'tag' && node.name === 'img') {
      const level = node.attribs.src?.match(ICON)?.[1];
      if (level) {
        trails.push({ name: '', level });
      }
    } else if (node.type === 'text' && trails.length > 0) {
      trails[trails.length - 1].name += node.data;
    }
  });
  return trails.filter(trail => (trail.name = trail.name.replace(/\s+/g, ' ').trim()));
}
