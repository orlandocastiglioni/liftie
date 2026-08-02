import select from '../../select.js';
import { findText } from '../../tools/domutil.js';
import status from './status.js';

// UK runs use a red grade that liftie's global level map does not know;
// map it locally (red sits between blue and black, black by local convention)
function level(str) {
  if (str === 'red') {
    return 'black';
  }
  return str;
}

// Runs Status rows: name td + td with "Difficulty:<span>green</span>" and a
// status image (same 0/2 images as lifts). The markup is malformed: every
// name cell is closed with a stray </th>, and several rows (Sledging Area,
// Coire Pollach Run, Wall Crossover, Beginners Run, Old Mugs Alley) have no
// opening <div> but a stray </div>, which makes htmlparser2's recovery close
// the surrounding column <div> and tear those rows out of their <table>.
// Don't rely on <tr> grouping - walk all <td>s in document order and pair
// each "Difficulty:" cell with the closest preceding text-bearing cell.
export default function parse(dom) {
  const rows = [];
  let name;
  for (const td of select(dom, 'td')) {
    const text = findText(td)?.trim();
    if (!text?.startsWith('Difficulty:')) {
      if (text) {
        name = text;
      }
      continue;
    }
    const img = select(td.children, 'img')[0];
    if (name && img) {
      rows.push({
        name,
        status: status(img.attribs.src),
        level: level(findText(select(td.children, 'span')[0])?.trim())
      });
      name = undefined;
    }
  }
  return rows;
}
