import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

/**
 * Shared row reader for terrypeak.com's server-rendered status tables. Lifts
 * (#liftStatus) and trails (#trailStatus) use the same .o-status markup.
 */

// Status is an <img> whose filename is icon-open.svg / icon-closed.svg. The
// alt text carries the same word but as 'open Icon' / 'closed Icon', and
// coerce would read that as 'openicon' -> unknown -> 'scheduled', so the src
// is the safer hook. Restricting the match to real status filenames also keeps
// the neighbouring icons out: the lift table's second column holds
// icon-triple/quad/surface (the lift type) and the trail table's holds
// icon-snow/icon-groomed (snowmaking and grooming), all with the same class.
const STATUS_ICON = /icon-(open|closed|hold|scheduled)\.svg/;

export function status(node) {
  for (const img of select(node, 'img.o-status__table-column-icon')) {
    const match = img.attribs?.src?.match(STATUS_ICON);
    if (match) {
      return match[1];
    }
  }
}

export function name(node) {
  const raw = findText(select(node, 'span.o-status__table-column-text')[0]);
  if (!raw) {
    return;
  }
  // names carry stray leading/trailing whitespace, and the crew annotates rows
  // in season ('Ben Hur (upper closed)', 'Homestake (upper closed)') - drop the
  // parenthetical so a trail keeps one identity across polls
  return raw.replace(/\s*\([^)]*\)\s*$/, '').trim();
}
