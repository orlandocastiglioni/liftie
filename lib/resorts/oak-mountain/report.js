import select from '../../select.js';
import { allText } from '../../tools/domutil.js';
import isStale from '../../tools/stale.js';

/**
 * oakmountainski.com/the-mountain/snowreport is a hand-filled page of plain
 * tables. The "Lift & Trail Status" ones are table.odd-even-rows.left-align:
 * the first is headed Lifts | Status, then one per difficulty headed Easy /
 * Medium / Expert | Status | Snowmaking | Groomed (classes easy-level,
 * medium-level, expert-level). Status is OPEN / CLOSED text.
 *
 * Oak Mountain's three grades are its own: "Expert" is its hardest tier,
 * which the page's counters call "Difficult Trails Open", so it maps to
 * black - normalizeLevel would read "expert" as double black.
 *
 * The conditions table above it carries the report's date ("Date / Time" -
 * "01.21.2026 - 7::PM", MM.DD.YYYY). The page is hand-updated and not reset
 * at season end, so rows are gated on that date (lib/tools/stale.js; fails
 * open when the row is missing or unreadable).
 */
const LEVELS = { 'easy-level': 'green', 'medium-level': 'blue', 'expert-level': 'black' };

function cellText(cell) {
  return cell ? allText(cell).replace(/\s+/g, ' ').trim() : '';
}

export function reportDate(dom) {
  for (const row of select(dom, 'table.odd-even-rows tr')) {
    const [label, value] = select(row, 'td');
    if (cellText(label) !== 'Date / Time') {
      continue;
    }
    const m = /(\d{1,2})\.(\d{1,2})\.(\d{4})/.exec(cellText(value));
    return m ? new Date(Number(m[3]), Number(m[1]) - 1, Number(m[2])) : undefined;
  }
}

export function rows(dom, kind) {
  if (isStale(reportDate(dom))) {
    return [];
  }
  return select(dom, 'table.odd-even-rows.left-align').flatMap(table => {
    const header = cellText(select(table, 'th')[0]);
    const level = Object.entries(LEVELS).find(([cls]) => table.attribs.class.split(/\s+/).includes(cls))?.[1];
    if (kind === 'lifts' ? header !== 'Lifts' : !level) {
      return [];
    }
    return select(table, 'tr').flatMap(row => {
      const [name, status] = select(row, 'td').map(cellText);
      return name ? [{ name, status, level }] : [];
    });
  });
}
