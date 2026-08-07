import select from '../../select.js';
import { findText } from '../../tools/domutil.js';
import status from './status.js';

/**
 * Nordkette's area page on the SKI plus CITY network site renders three
 * sibling tables - table.lift, table.slope, table.skiroute - inside
 * div#pisten_anlagen. Scope every selector to that div: the same page also
 * prints a weather forecast table, and the three report tables are told apart
 * only by their class.
 *
 * A lift row is <td> status glyph, <td> lift-type icon, <td> name; the name is
 * always the last cell, which also holds for the two-cell ski route rows the
 * trail parser walks. Six lifts: the Hungerburgbahn funicular plus the two
 * cable-car sections to Hafelekar are one system and stay one area.
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
