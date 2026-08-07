import select from '../../select.js';
import { findText } from '../../tools/domutil.js';
import status from './status.js';

/**
 * The Elferbahnen area page on the SKI plus CITY network site renders three
 * sibling tables - table.lift, table.slope, table.skiroute - inside
 * div#pisten_anlagen. Scope every selector to that div: the same page also
 * prints a weather forecast table, and the three report tables are told apart
 * only by their class.
 *
 * A lift row is <td> status glyph, <td> lift-type icon, <td> name, so the name
 * is always the last cell. Four lifts: the gondola out of Neustift and three
 * drag lifts.
 *
 * This page is the source of record for the area even though Intermaps also
 * carries region 1063, because Intermaps flags that region 'SRM -> OFF' and
 * reports it 4/4 open at moments when this page reports 1/4.
 */
export default {
  selector: '#pisten_anlagen table.lift tbody tr',
  parse(row) {
    const cells = select(row, 'td');
    return {
      name: findText(cells.at(-1)),
      status: status(row)
    };
  }
};
