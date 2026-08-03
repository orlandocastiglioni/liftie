import select from '../../select.js';

// Grooming report: each run is a div.slope-grid-container.slope-grid-rows with 2
// cells. Nothing is text-labelled, so difficulty and status come from icon
// classes:
//   difficulty (cell 1)  fa-circle -> green, fa-square -> blue,
//                        fa-square.gly-rotate-45 -> black (one diamond) /
//                        doubleBlack (two); a button.terrain-park tag in cell 2
//                        marks the run as a terrain park (wins over difficulty).
//   status (cell 2)      the FIRST icon: fa-snowplow (groomed) / fa-check-circle
//                        -> open, fa-window-close -> closed. Trailing icons are
//                        attribute tags (night skiing, snow making, ...) ignored.
function childDivs(node) {
  return (node.children || []).filter(c => c.type === 'tag' && c.name === 'div');
}

function deepText(node) {
  if (node.type === 'text') {
    return node.data;
  }
  if (node.name === 'br') {
    return ' ';
  }
  return (node.children || []).map(deepText).join('');
}

function difficulty(cell) {
  const icons = select(cell, 'span.fa');
  const diamonds = icons.filter(i => /\bgly-rotate-45\b/.test(i.attribs?.class || ''));
  if (diamonds.length >= 2) {
    return 'doubleBlack';
  }
  if (diamonds.length === 1) {
    return 'black';
  }
  for (const icon of icons) {
    const cls = icon.attribs?.class || '';
    if (/\bfa-circle\b/.test(cls)) {
      return 'green';
    }
    if (/\bfa-square\b/.test(cls)) {
      return 'blue';
    }
  }
}

function status(cell) {
  const cls = select(cell, 'span.fa')[0]?.attribs?.class || '';
  if (/\bfa-window-close\b/.test(cls)) {
    return 'closed';
  }
  if (/\bfa-snowplow\b|\bfa-check-circle\b/.test(cls)) {
    return 'open';
  }
}

export default function parse(dom) {
  const rows = [];
  for (const row of select(dom, 'div.slope-grid-container.slope-grid-rows')) {
    const cells = childDivs(row);
    if (cells.length < 2) {
      continue;
    }
    const [nameCell, statusCell] = cells;
    const name = deepText(nameCell).replace(/\s+/g, ' ').trim();
    if (!name) {
      continue;
    }
    const level = select(statusCell, 'button.terrain-park').length ? 'terrainPark' : difficulty(nameCell);
    rows.push({ name, status: status(statusCell), level });
  }
  return rows;
}
