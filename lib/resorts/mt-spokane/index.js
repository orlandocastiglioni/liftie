import coerce from '../../tools/coerce.js';
import { tables } from './tables.js';

// The lift table is the one headed "Lift/Area Name"; its "Uphill Route" and
// "Terrain Parks" rows are areas, not lifts.
export default function parse(dom) {
  const status = {};
  for (const table of tables(dom).filter(t => /^lift/i.test(t.header))) {
    for (const { name, status: s } of table.rows) {
      if (!/uphill|terrain park/i.test(name)) {
        status[name] = coerce(s);
      }
    }
  }
  return status;
}
