import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

/**
 * bryceresort.com/mountain-info/conditions renders three
 * `div.lift-trails-table` blocks inside `section#lift-status`: Lifts, Ski
 * Trails and Bike Trails. Their visual order is set by `small-order-N`
 * classes on the wrappers, so the block has to be picked by its header
 * (`.type-title`) text rather than by DOM position.
 */
export function tableRows(dom, title) {
  for (const table of select(dom, '.lift-trails-table')) {
    const heading = findText(select(table, '.type-title')[0])?.trim();
    if (heading === title) {
      return select(table, '.table-data');
    }
  }
  return [];
}

export function rowName(row) {
  return findText(select(row, '.hours-title h6')[0])?.trim();
}

/**
 * the status cell holds an inline SVG and nothing else - no text, no title,
 * no aria-label. The only discriminator is the id of the outermost <g>:
 * 'Symbols' wraps #OpenIcon (green), 'ClosedSymbols' wraps #ClosedIcon (red).
 * Anything else is handed to coerce untouched so a new icon shows up as an
 * unknown status instead of being silently reported as open/closed.
 */
export function rowStatus(row) {
  const id = select(row, '.hours-status g[id]')[0]?.attribs.id;
  if (id === 'Symbols') {
    return 'open';
  }
  if (id === 'ClosedSymbols') {
    return 'closed';
  }
  return id;
}
