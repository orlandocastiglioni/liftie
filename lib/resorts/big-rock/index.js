import coerce from '../../tools/coerce.js';
import report from './table.js';

// lift table: [Lift Type, Lift Name, Open (3/4)] - the type prefixes the map
// letter ("A - Quad Chair") and is dropped, the name column carries the lift
// name. Status vocabulary is {OPEN, CLOSED}, both known to coerce.
export default function parse(dom) {
  const { column, last, rows } = report(dom, 'Lift Name');
  const nameColumn = column(/lift name/i);
  if (nameColumn < 0) {
    return {};
  }
  const statusColumn = column(/open/i, last);
  const status = {};
  for (const cells of rows) {
    const name = cells[nameColumn];
    if (name) {
      status[name] = coerce(cells[statusColumn]);
    }
  }
  return status;
}
