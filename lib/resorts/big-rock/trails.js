import report from './table.js';

// difficulty is published as a coloured glyph rather than a word, so none of
// them are known to normalizeLevel and they are mapped here:
// '●' (green span) circle, '■' (blue span) square, '◆' bare diamond
const levels = {
  '●': 'green',
  '■': 'blue',
  '◆': 'black',
  '◆◆': 'doubleBlack'
};

// trail table: [Difficulty, Trail Name, Night, Open (18/25)]. The Night column
// is a night-skiing designation (YES/NO), not a status - ignore it. Status
// vocabulary is {OPEN, CLOSED}, both known to coerce.
export default function parse(dom) {
  const { column, last, rows } = report(dom, 'Trail Name');
  const nameColumn = column(/trail name/i);
  if (nameColumn < 0) {
    return [];
  }
  const levelColumn = column(/difficulty/i);
  const statusColumn = column(/open/i, last);
  return rows
    .filter(cells => cells[nameColumn])
    .map(cells => ({
      name: cells[nameColumn],
      status: cells[statusColumn],
      level: levels[cells[levelColumn]?.replace(/\s+/g, '')]
    }));
}
