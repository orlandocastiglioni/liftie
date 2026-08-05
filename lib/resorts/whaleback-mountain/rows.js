import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

// Whaleback publishes the whole report as one Google Sheet
// (pubhtml/sheet?gid=0) that whaleback.com/trail-report merely iframes: the
// trail block, the lift block and the legend all live in the same grid.
// Shared by index.js (lifts) and trails.js (trails).
//
// Columns: A rating, B name, C open, D lighted (trails) / notes (lifts),
// E groomed, F notes. The operator edits the sheet freely, so every anchor
// here is a marker row ("Rating", "Lifts", "Key"), never a row number.
export const RATING = 0;
export const NAME = 1;
export const OPEN = 2;

/**
 * the published table as rows of { text, img } addressed by spreadsheet
 * column - the banner rows merge cells, so colspan has to be expanded to keep
 * the columns aligned
 */
export function grid(dom) {
  return select(dom, 'tbody tr').map(tr => {
    const row = [];
    for (const td of select(tr, 'td')) {
      row.push({
        text: (allText(td) ?? '').trim(),
        img: select(td, 'img')[0]?.attribs.src
      });
      const span = Number.parseInt(td.attribs.colspan ?? '1', 10) || 1;
      for (let i = 1; i < span; i++) {
        row.push({ text: '' });
      }
    }
    return row;
  });
}

/** cell text compared to a marker label, tolerating case and padding */
export function equals(cell, label) {
  return cell?.text.toLowerCase() === label.toLowerCase();
}

/** index of the row labelled `label` in column B, -1 when absent */
export function marker(rows, label) {
  return rows.findIndex(row => equals(row[NAME], label));
}

// the sheet documents its own vocabulary in the "Key" block:
// O = Open, G = Groomed, R = Race, X = Closed. coerce knows o and x; the
// single letters G and R it does not, and a race day closes the run to the
// public. G belongs in the groomed column but the key lists it as a status.
const statuses = { G: 'groomed', R: 'closed' };

/** raw column C token, translated only where coerce would not know it */
export function status(row) {
  const raw = row[OPEN]?.text ?? '';
  return statuses[raw.toUpperCase()] ?? raw;
}
