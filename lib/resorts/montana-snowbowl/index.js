import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

/**
 * The column is headed 'Status / Hours' and is hand-typed by staff: a running
 * lift shows its operating hours rather than a status word, and the phrasing
 * varies ('9:30 AM  to 4:00 PM' with a double space, '9:30 AM 3:15 PM' with no
 * 'to', '10 AM to 3:30 PM'). Only 'Closed' is a real token. coerce would map
 * every hours string to 'scheduled', so translate them here and pass anything
 * unrecognised through for coerce to log.
 */
function toStatus(value) {
  const text = value.trim();
  if (/^closed$/i.test(text)) {
    return 'closed';
  }
  if (/\d\s*:?\d*\s*[ap]\.?\s*m\.?/i.test(text)) {
    return 'open';
  }
  return text;
}

/**
 * The report page carries exactly one '.table-responsive.mb-4' block (the
 * lifts) and six '.table-responsive.mb-18' blocks (the per-location trail
 * tables) - the class pair is what keeps the two apart.
 */
export default {
  selector: '.table-responsive.mb-4 table tbody tr',
  parse(node) {
    const cells = select(node, 'td');
    if (cells.length < 2) {
      return;
    }
    const name = allText(cells[0]).trim();
    const statusNode = select(cells[1], 'span.ms-2')[0];
    if (!name || !statusNode) {
      return;
    }
    return { name, status: toStatus(allText(statusNode)) };
  }
};
