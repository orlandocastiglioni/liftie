import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { findText } from '../../tools/domutil.js';

/**
 * Treetops publishes NO per-lift rows, anywhere. /live/ (the /ski-snow/report/
 * URL is dead) carries a seven-field summary block - div.slope-status-item,
 * each an <h4>LABEL</h4><p>VALUE</p> - and the only lift information in it is
 * the free-text "Lifts Open:" field plus a "Magic Carpet Open:" yes/no.
 *
 * So the inventory is fixed from the resort's own trail map (Triple Chair #1,
 * #3 and #4 - there is no #2 - plus the magic carpets) and a chair counts as
 * open when its number appears in the "Lifts Open:" list. Observed value:
 * '1 & 4 ' (2026-02-09), '' (off season).
 *
 * This is inherently fragile and worth re-validating in December:
 *  - the chair-number list format has exactly ONE observed winter sample;
 *    before the January 2026 rebuild the same field was a bare COUNT ('3',
 *    '2', '0'). A lone digit with no separator is therefore ambiguous, and
 *    everything falls through to 'scheduled' rather than guessing - except
 *    '0', which means nothing is spinning either way.
 *  - a blank value is the off-season state (the page reads "Closed for 25/26
 *    Season" and marks all 31 runs closed), so blank -> closed.
 *  - if they ever add a chair, or renumber, this list has to be edited.
 */
const chairs = [1, 3, 4];

export default function parse(dom) {
  const fields = readFields(dom);
  const lifts = {};
  const status = chairStatus(fields['Lifts Open']);
  for (const n of chairs) {
    lifts[`Chair #${n}`] = typeof status === 'function' ? status(n) : status;
  }
  lifts['Magic Carpet'] = carpetStatus(fields['Magic Carpet Open']);
  return lifts;
}

// label -> value, with the trailing colon stripped off the label. WordPress
// renders an empty <p> off season, which findText reports as undefined.
function readFields(dom) {
  const fields = {};
  for (const item of select(dom, '.slope-status-item')) {
    const label = findText(select(item, 'h4')[0])?.replace(/:\s*$/, '').trim();
    if (label) {
      fields[label] = findText(select(item, 'p')[0])?.trim() ?? '';
    }
  }
  return fields;
}

// returns a status for every chair, or a per-chair function when the value is
// a real list of chair numbers
function chairStatus(value = '') {
  const digits = value.match(/\d+/g) ?? [];
  if (digits.length === 0) {
    // '' off season, or prose like "Closed for the season"
    return 'closed';
  }
  if (digits.length === 1) {
    // legacy bare count - '0' is unambiguous, anything else is not
    return digits[0] === '0' ? 'closed' : 'scheduled';
  }
  return n => (digits.includes(String(n)) ? 'open' : 'closed');
}

// observed 'Yes' (2024, 2026) and '1' (2023); coerce knows both, but not the
// prose the off-season page puts in its neighbouring fields
function carpetStatus(value = '') {
  if (!value) {
    return 'closed';
  }
  if (/^clos/i.test(value)) {
    return 'closed';
  }
  if (/^open/i.test(value)) {
    return 'open';
  }
  return coerce(value);
}
