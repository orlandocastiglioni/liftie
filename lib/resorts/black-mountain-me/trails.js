import select from '../../select.js';

/**
 * The mountain report is five sibling `table.custom-table-block`; their order
 * changes between seasons, so the trail table is the one whose first header
 * cell reads exactly "Trail" (the uphill table is "Osekare Uphil Trail ").
 * The column set changes too - a "Groomed" column appeared mid 2024/25 - so
 * the status column is resolved by its "Day Status" header, never by index.
 * The site publishes no lift status at all, hence trails only.
 */

// difficulty is a glyph prefixed to the trail name, sometimes wrapped in a
// coloured <span> ("<span>♦</span> Kennebago"), sometimes a bare character
const levels = [
  [/^🟢/, 'green'],
  [/^🟦/, 'blue'],
  [/^♦\s*♦/, 'doubleBlack'],
  [/^♦/, 'black']
];

function text(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(text).join('');
}

function cell(node) {
  return text(node).replace(/\s+/g, ' ').trim();
}

function trail(raw) {
  for (const [glyph, level] of levels) {
    const match = raw.match(glyph);
    if (match) {
      return { name: raw.slice(match[0].length).trim(), level };
    }
  }
  return { name: raw, level: /^terrain park$/i.test(raw) ? 'terrainPark' : undefined };
}

/**
 * the report only ever writes 'open' or 'open*' (the asterisk points at the
 * notes column) - "closed" is never typed, a blank cell is how they close a
 * trail, and coerce would read both as 'scheduled'
 */
function status(raw) {
  if (!raw) {
    return 'closed';
  }
  return /^open\W*$/i.test(raw) ? 'open' : raw;
}

export default function parse(dom) {
  const table = select(dom, 'table.custom-table-block').find(t =>
    select(t, 'thead th').some((th, i) => i === 0 && cell(th) === 'Trail')
  );
  if (!table) {
    return [];
  }
  const header = select(table, 'thead th').map(cell);
  const statusColumn = header.findIndex(h => /day status/i.test(h));
  if (statusColumn < 0) {
    return [];
  }
  const rows = [];
  for (const tr of select(table, 'tr.table-row')) {
    const cells = select(tr, 'td.table-cell').map(cell);
    const { name, level } = trail(cells[0] ?? '');
    if (name) {
      rows.push({ name, status: status(cells[statusColumn]), level });
    }
  }
  return rows;
}
