import select from '../../select.js';

// Difficulty is encoded as a Unicode symbol prefixing the trail name, which
// normalizeLevel doesn't understand - map it here to a level token it accepts.
// Order matters: the double diamond must be tested before the single one.
const PREFIXES = [
  ['◆◆', 'doubleBlack'], // ◆◆
  ['◆', 'black'], //             ◆
  ['🟢', 'green'], //       🟢 green circle
  ['🟦', 'blue'] //         🟦 blue square
];

// concatenate every descendant text node (status can be wrapped in a colored
// <span>, e.g. <td><span style="color:#339966">Open</span></td>)
function deepText(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(deepText).join('');
}

function classify(raw) {
  const name = raw.replace(/\s+/g, ' ').trim();
  for (const [prefix, level] of PREFIXES) {
    if (name.startsWith(prefix)) {
      return { name: name.slice(prefix.length).trim(), level };
    }
  }
  if (/terrain park/i.test(name)) {
    return { name, level: 'terrainPark' };
  }
  return { name };
}

// The conditions page has one <table> per chairlift (South, Snoopy, North).
// Data rows use <td>; the header row uses <th> (0 td cells, skipped). Cell 0 is
// the emoji-prefixed trail name, cell 1 the Open/Closed status; an optional
// cell 2 is the grooming flag (ignored). This handles both the current
// three-column (Trail Name | Status | Groomed) layout and the older
// two-column (Runs for X Chairlift | Status) layout.
export default function parse(dom) {
  const rows = [];
  for (const table of select(dom, 'table')) {
    for (const tr of select(table, 'tr')) {
      const tds = (tr.children ?? []).filter(c => c.name === 'td');
      if (tds.length < 2) {
        continue;
      }
      const raw = deepText(tds[0]);
      const status = deepText(tds[1]).trim();
      if (!raw.trim() || !status) {
        continue;
      }
      const { name, level } = classify(raw);
      rows.push({ name, status, level });
    }
  }
  return rows;
}
