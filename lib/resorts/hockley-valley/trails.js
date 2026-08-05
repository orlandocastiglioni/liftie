import select from '../../select.js';

// hockley.com/ski-snowboarding/ publishes runs in table#tablepress-2, a
// six-column TablePress grid = three repeating (Trail Name, Status) pairs per
// row. Status is plain text ("Open"/"Closed"), but difficulty is icon-encoded
// inside each name cell:
//   <i class="fa fa-circle"> -> green circle (beginner)
//   <i class="fa fa-stop">   -> blue square (intermediate)
//   <img src=".../black_diamond.svg"> -> black diamond (advanced)
// Name cells are frequently empty (the grid is ragged) and are skipped.
const LEVEL_SELECTORS = [
  ['i.fa-circle', 'green'],
  ['i.fa-stop', 'blue'],
  ['img[src*="black_diamond"]', 'black']
];

function textOf(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children || []).map(textOf).join('');
}

function levelOf(cell) {
  for (const [selector, level] of LEVEL_SELECTORS) {
    if (select(cell, selector).length) {
      return level;
    }
  }
}

export default function parse(dom) {
  const rows = [];
  for (const tr of select(dom, 'table#tablepress-2 tbody tr')) {
    const cells = select(tr, 'td');
    for (let i = 0; i + 1 < cells.length; i += 2) {
      const nameCell = cells[i];
      const name = textOf(nameCell).trim();
      if (!name) {
        continue;
      }
      rows.push({
        name,
        status: textOf(cells[i + 1]).trim(),
        level: levelOf(nameCell)
      });
    }
  }
  return rows;
}
