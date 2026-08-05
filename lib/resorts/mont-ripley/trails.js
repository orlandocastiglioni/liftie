import select from '../../select.js';
import { allText } from '../../tools/domutil.js';
import tableRows, { status } from './rows.js';

// "Run Status" rows are <td>NAME</td><td>STATUS</td><td><img alt="LEVEL"></td>.
// Difficulty is the icon's alt text; 'green circle', 'blue square' and
// 'black diamond' are known to normalizeLevel, the house 'orange oval' icon
// (used for Rhythm Terrain Park only) is not, and two identical black-diamond
// icons in one cell mean double black.
const ICONS = {
  'orange oval': 'terrain park'
};

function level(cell) {
  const alts = select(cell, 'img')
    .map(img => img.attribs?.alt?.trim())
    .filter(Boolean);
  // a 2024 capture wrote the level as plain text instead of an <img>
  const icons = alts.length > 0 ? alts : [allText(cell).trim()].filter(Boolean);
  const [first] = icons;
  if (!first) {
    return;
  }
  if (icons.length > 1 && icons.every(alt => alt === first) && /black/i.test(first)) {
    return 'double black';
  }
  return ICONS[first.toLowerCase()] ?? first;
}

export default function parse(dom) {
  const trails = [];
  for (const cells of tableRows(dom, 'Run Status')) {
    // the "*Dependent on fresh snow" legend is a single-cell row; the column
    // header is all <th> (and unwrapped by <tr> in today's markup)
    if (cells.length < 3 || cells[0].name !== 'td') {
      continue;
    }
    // a trailing '*' marks a snow-dependent run, it is not part of the name
    const name = allText(cells[0])
      .replace(/\*+\s*$/, '')
      .trim();
    if (name) {
      trails.push({ name, status: status(allText(cells[1])), level: level(cells[2]) });
    }
  }
  return trails;
}
