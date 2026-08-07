import select from '../../select.js';
import { findText } from '../../tools/domutil.js';
import status from './status.js';

/**
 * The Serlesbahnen area page on the SKI plus CITY network site renders its
 * report tables - here table.lift and table.slope, this area publishes no ski
 * routes - as siblings inside div#pisten_anlagen. Scope every selector to that
 * div: the same page also prints a weather forecast table, and the report
 * tables are told apart only by their class.
 *
 * A lift row is <td> status glyph, <td> lift-type icon, <td> name, so the name
 * is always the last cell. Five lifts: the Gondelbahn out of Mieders, three
 * drag lifts and the Kinderland carpet at the valley station.
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
