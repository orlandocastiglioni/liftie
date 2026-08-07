import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { allText } from '../../tools/domutil.js';
import reportedAt from './reported-at.js';
import status from './status.js';

/**
 * pila.it renders its lift board server-side (WordPress plugin cdh-viewer)
 * TWICE: a desktop table and a mobile one with identical rows. The
 * .cdh-table-desktop qualifier is mandatory - a bare .cdh-lift-table selector
 * doubles every lift.
 *
 * Row: td1 holds '<number> - <name>' in div.xs-pl5, td2 the status, td3 a type
 * icon, td4 wind and td5 a static spec string. Each tbody.accordion also holds
 * a tr.accordion-body with elevation stats, which tr.accordion-header excludes.
 */
const selector = 'table.cdh-lift-table.cdh-table-desktop tbody.accordion tr.accordion-header';

// ' 1 - Aosta - Pila' -> 'Aosta - Pila'. Split on the FIRST ' - ' only: four of
// the fifteen lift names contain one themselves (Aosta - Pila, Pila - Gorraz,
// Gorraz - Couis, Couis - Platta de Grevon).
function trimNumber(text) {
  return text.match(/^\s*\S+\s+-\s+(\S.*)$/)?.[1] ?? text;
}

export default function lifts(dom) {
  const ls = {};
  for (const row of select(dom, selector)) {
    const cells = select(row, 'td');
    const label = select(cells[0], 'div.xs-pl5')[0];
    if (!label) {
      continue;
    }
    const name = trimNumber(allText(label).replace(/\s+/g, ' ')).trim();
    if (!name) {
      continue;
    }
    ls[name] = coerce(status(cells[1]));
  }
  const at = reportedAt(dom, '#cdh-lift');
  if (at) {
    Object.defineProperty(ls, 'reportedAt', { value: at });
  }
  return ls;
}
