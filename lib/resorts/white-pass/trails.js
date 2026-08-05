import select from '../../select.js';
import cellText from './text.js';

// White Pass runs Expert as its single-black tier and Double Black Diamond on
// top of it. The stock levels map sends both to doubleBlack, so translate the
// group header here and hand back already-normalized level names.
const levels = {
  beginner: 'green',
  intermediate: 'blue',
  expert: 'black',
  'double black diamond': 'doubleBlack'
};

// The grooming report is one table in div.content.prose holding four kinds of
// row, all 4 cells wide: a colspan advisory, the Runs/Groomed/Status header
// (<h3> cells), difficulty group headers (an <h6> in the first cell, the rest
// empty) and the trail rows themselves. The group headers are the only source
// of difficulty, so walk the rows in order and carry the last one forward.
//
// Column 2 is grooming ('✔' / 'NO'), not status - liftie has no grooming
// field, and feeding it in as status would report every ungroomed run closed.
export default function parse(dom) {
  const rows = [];
  let level;
  for (const row of select(dom, 'div.content.prose table tr')) {
    const cells = select(row, 'td');
    if (cells.length < 3) {
      continue;
    }
    const header = select(row, 'h6')[0];
    if (header) {
      level = levels[cellText(header).toLowerCase()];
      continue;
    }
    const name = cellText(cells[0]);
    const status = cellText(cells[2]);
    if (!name || !status || /^status$/i.test(status)) {
      continue;
    }
    rows.push({ name, status, level });
  }
  return rows;
}
