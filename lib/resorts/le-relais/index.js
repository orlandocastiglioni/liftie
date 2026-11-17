import select from '../../select.js';
import { clean, deepText, status } from './report.js';

/**
 * table.lifts-list: the lift's map letter (td.lift-number span) and its name
 * in the next cell. The letter stays in the name because two lifts are both
 * "Téléski simple" (B and E).
 */
export default function parse(dom) {
  const lifts = {};
  for (const row of select(dom, 'table.lifts-list tr')) {
    const letter = clean(deepText(select(row, 'td.lift-number span')[0]));
    const cells = select(row, 'td');
    const name = clean(deepText(cells[1]));
    const state = status(row);
    if (name && state) {
      lifts[letter ? `${letter} - ${name}` : name] = state;
    }
  }
  return lifts;
}
