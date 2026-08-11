import rows from './rows.js';

// Trails from the same block plugin. The difficulty dot carries the grade as a
// modifier class - green / blue / black / double-black - which normalizeLevel
// resolves directly once the hyphen is dropped. `grade` keeps the resort's own
// word so a consumer can render the local scale.
//
// The list is grouped by an area heading (Biking / Hiking / Multi-Use in
// summer). Those rows are published as the resort publishes them, the same way
// Kaunertal's Rodelbahn and Avoriaz's snowparks are - the operator decides what
// counts as terrain, not this parser.
const LEVELS = {
  green: 'green',
  blue: 'blue',
  black: 'black',
  'double-black': 'doubleBlack'
};

export default function parse(dom) {
  return rows(dom, 'trails').map(({ name, status, level }) => ({
    name,
    status,
    level: LEVELS[level],
    grade: level
  }));
}
