import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import isStale from '../../tools/stale.js';

/**
 * skibowl.com/winter-condition-and-lift-status/ (the apex host: www fails the
 * TLS handshake). An Elementor page of three JetTables, in this order:
 *
 * 1. weather: label | value rows, the first two "Date" ("2.7.26", M.D.YY)
 *    and "Time" ("3:45pm");
 * 2. lifts: name | status | note ("Waiting for snow", "12pm – 8pm");
 * 3. grooming: "Chairlift | Groomed | Runs".
 *
 * Headings above them changed between the February 2026 capture and today, so
 * the lift table is found by its content: the one whose every row has a
 * status word (Open / Closed / Hold) in the second cell. The grooming table
 * ("Groomed" or blank) and the weather table never match.
 *
 * The weather table's "Date" dates the report; lib/tools/stale.js suppresses
 * a board older than its window. A blank date (as on 2026-11-17) fails open.
 */
function text(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(text).join('');
}

function clean(s) {
  return s.replace(/\s+/g, ' ').trim();
}

function rowsOf(table) {
  return select(table, 'tbody tr')
    .map(row => select(row, 'td').map(td => clean(text(td))))
    .filter(cells => cells[0]);
}

const STATUS = /^(open|closed|on hold|hold)\b/i;

export function reportDate(tables) {
  for (const rows of tables) {
    const date = rows.find(cells => /^date$/i.test(cells[0]))?.[1];
    const m = /^(\d{1,2})\.(\d{1,2})\.(\d{2}|\d{4})$/.exec(date ?? '');
    if (m) {
      const year = Number(m[3]) < 100 ? 2000 + Number(m[3]) : Number(m[3]);
      return new Date(year, Number(m[1]) - 1, Number(m[2]));
    }
  }
}

export default function parse(dom) {
  const lifts = {};
  const tables = select(dom, 'table.jet-table').map(rowsOf);
  if (isStale(reportDate(tables))) {
    return lifts;
  }
  const board = tables.find(rows => rows.length > 0 && rows.every(cells => STATUS.test(cells[1] ?? '')));
  for (const [name, status] of board ?? []) {
    lifts[name] = coerce(STATUS.exec(status)[1]);
  }
  return lifts;
}
