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
  if (/glades/i.test(header)) {
    return 'black';
  }
}

// dashes stand for "not running today" even in peak winter
const status = (text = '') => (/^[-—]+$/.test(text) ? 'closed' : text);

// heading text split on <br> - some headings pack two trails (or two
// statuses) into one node, e.g. "Upper Buckshot<br>Lower Buckshot"
function segments(node) {
  const parts = [''];
  for (const child of node.children ?? []) {
    if (child.name === 'br') {
      parts.push('');
    } else if (child.type === 'text') {
      parts[parts.length - 1] += child.data;
    } else {
      parts[parts.length - 1] += allText(child);
    }
  }
  return parts.map(t => t.replace(/[​\s]+/g, ' ').trim()).filter(Boolean);
}

// trail status page is a grid of elementor headings flowing in triplets
// (trail name, status, snowmaking state) under per-difficulty section
// headers like "Easy (Green)" followed by "Trail Status"/"Snowmaking"
export default function parse(dom) {
  const rows = [];
  let level;
  let pos = -1; // -1 outside a section, then cycling name/status/snowmaking
  let prev;
  let names = [];
  for (const node of select(dom, 'h3.elementor-heading-title')) {
    const parts = segments(node);
    const text = parts.join(' ');
    if (/^trail status$/i.test(text)) {
      level = sectionLevel(prev);
      pos = -1;
      names = [];
    } else if (/^snowmaking$/i.test(text) && pos === -1) {
      pos = 0;
    } else if (pos === 0) {
      names = parts;
      pos = 1;
    } else if (pos === 1) {
      for (const [i, name] of names.entries()) {
        rows.push({ name, status: status(parts[i] ?? parts[0]), level });
      }
      pos = 2;
    } else if (pos === 2) {
      pos = 0;
    }
    prev = text;
  }
  return rows;
}
