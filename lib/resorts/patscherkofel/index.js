import select from '../../select.js';
import { allText, collect } from '../../tools/domutil.js';
import status, { cells } from './status.js';

/**
 * div#pisten_anlagen holds the whole live board: a statistics header
 * ("open lifts 4 / 7"), then table.lift and table.slope as siblings. Scope
 * every selector to that div - the same page renders a weather table further
 * down that would otherwise be swept up.
 *
 * 7 lifts: the two Patscherkofelbahn sections, three surface lifts, a carpet
 * and the Kinderlift. The header count and the row count agree for lifts
 * (they do not for slopes, see trails.js).
 */
export default function lifts(dom) {
  return collect(dom, '#pisten_anlagen table.lift tbody tr', row => {
    const tds = cells(row);
    const s = status(tds[0]);
    const name = allText(tds.at(-1) ?? {}).trim();
    if (!name || !s) {
      return;
    }
    return { name, status: s };
  });
}

// exported for trails.js: the widget's row shape is identical across its three
// tables, only the difficulty cell comes and goes
export function rows(dom, selector) {
  return select(dom, selector).map(row => {
    const tds = cells(row);
    return { row, status: status(tds[0]), name: allText(tds.at(-1) ?? {}).trim() };
  });
}
