import select from '../../select.js';
import { text } from '../../tools/domutil.js';
import suppressed, { REASONS } from '../../tools/suppressed.js';
import isFresh, { reportDate } from './fresh.js';

// trail table lives on the same TablePress page as the lifts; cells are
// Trail | Difficulty | Status | Groomed | Night Ski - the difficulty cell is
// an icon <img> followed by a text node (EASIER / MORE DIFFICULT / DIFFICULT /
// MOST DIFFICULT - all known to normalizeLevel), hence the 1/1 child path;
// status is plain OPEN / CLOSED text; groomed and night ski are icon-only
// columns that don't fit liftie's trail shape. Gated on the Ski Schedule's
// dates like the lifts - see fresh.js.
export default function parse(dom) {
  if (!isFresh(dom)) {
    return suppressed([], REASONS.stale, reportDate(dom));
  }
  return select(dom, '#tablepress-3 tbody tr').map(row => ({
    name: text(row, 0),
    level: text(row, '1/1'),
    status: text(row, 2)
  }));
}
