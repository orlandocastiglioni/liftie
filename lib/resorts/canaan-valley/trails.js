import select from '../../select.js';

// rebuilt (2026) template: <div class="block-accordions trail-report"> holds one
// <div class="block-accordion"> per difficulty; the h3.accordion-toggle button id
// carries the level; each section has a single table with trail rows in <tbody>
// (empty out of season - 'Trails are Closed for the Season').
const sections = {
  'accordion-beginner': 'green',
  'accordion-moderate': 'blue',
  'accordion-expert': 'black'
};

function textContent(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(textContent).join('');
}

// legend icons at /assets/images/icons/: trail-open.svg, open-with-snowmaking.svg,
// open-with-natural-snow.svg -> open; trail-closed.svg -> closed; modifiers like
// snowmaking.svg / uphill-skiing.svg / tubing.svg match neither and are skipped
function statusToken(str) {
  if (!str) {
    return;
  }
  if (/closed/i.test(str)) {
    return 'closed';
  }
  if (/open/i.test(str)) {
    return 'open';
  }
}

// populated rows of the new template have never been archived, so parse defensively:
// prefer a status icon in the second cell, fall back to the cell text
function cellStatus(td) {
  for (const img of select(td.children ?? [], 'img')) {
    const status = statusToken(img.attribs?.src);
    if (status) {
      return status;
    }
  }
  const text = textContent(td).trim();
  return statusToken(text) ?? text;
}

export default function parse(dom) {
  const rows = [];
  for (const section of select(dom, 'div.block-accordions.trail-report div.block-accordion')) {
    const toggle = select(section.children, 'h3.accordion-toggle button')[0];
    const level = sections[toggle?.attribs?.id];
    for (const row of select(section.children, 'tbody tr')) {
      const tds = select(row.children, 'td');
      if (tds.length < 2) {
        continue;
      }
      const name = textContent(tds[0]).trim();
      if (!name) {
        continue;
      }
      rows.push({ name, status: cellStatus(tds[1]), level });
    }
  }
  return rows;
}
