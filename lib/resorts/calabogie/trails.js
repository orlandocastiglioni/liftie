import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

function sectionLevel(header = '') {
  const m = header.match(/\((green|blue|black)\)/i);
  if (m) {
    return m[1];
  }
  if (/terrain park/i.test(header)) {
    return 'terrainPark';
  }
}

// trail status page is a grid of elementor headings flowing in triplets
// (trail name, status, snowmaking state) under per-difficulty section
// headers like "Easy (Green)" followed by "Trail Status"/"Snowmaking"
export default function parse(dom) {
  const rows = [];
  let level;
  let prev;
  let name;
  for (const node of select(dom, 'h3.elementor-heading-title')) {
    const text = allText(node).replace(/[​\s]+/g, ' ').trim();
    if (!text || /^[-—\s]+$/.test(text)) {
      continue;
    }
    if (/^trail status$/i.test(text)) {
      level = sectionLevel(prev);
      name = undefined;
    } else if (/^(open|closed)$/i.test(text)) {
      if (name) {
        rows.push({ name, status: text, level });
        name = undefined;
      }
    } else if (!/^snowmaking$/i.test(text)) {
      name = text;
    }
    prev = text;
  }
  return rows;
}
