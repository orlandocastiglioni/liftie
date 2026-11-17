import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { findText } from '../../tools/domutil.js';
import { repeaterRows } from './rows.js';

// Lift rows are the first repeater on /trail-map. Each row holds four <h5>s:
// name, lift type, status, night-skiing flag.
//
// The status cell merges the status with the operating hours into a single
// text node - "Open 9am - 4pm" - which coerce would strip to 'open9am4pm' and
// silently downgrade to 'scheduled', so only the leading status word is used.
// The fourth cell ("Closed Nights" / "Open for Night Skiing") is a night
// skiing flag, NOT the day status, and is deliberately never coerced.
const LEADING_STATUS = /^\s*(wind\s*hold|weather\s*hold|on\s*hold|hold|open|closed|scheduled|delayed)\b/i;

// The lift rows are hand-edited and NOT reset off-season: in November 2026
// all three still read "Open 9am - 4pm" while the resort is closed, so the
// feed showed 3/3 lifts open before opening day. Every page of the site
// carries an operating-status banner in its header (Wix rich text
// #comp-mjd2dnb2, today "CLOSED" followed by a season-pass line; the
// conditions page shows 0/3 lifts open
// next to it). When that banner LEADS with CLOSED, the rows are not today's
// status and every lift is reported closed. Any other banner text (hours,
// OPEN, a notice) leaves the rows in charge.
const BANNER = '#comp-mjd2dnb2';

function resortClosed(dom) {
  const banner = select(dom, BANNER)[0];
  return Boolean(banner) && /^closed\b/i.test(deepText(banner).replace(/\s+/g, ' ').trim());
}

function deepText(node) {
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(deepText).join(' ');
}

function cell(row, className, index) {
  return findText(select(row, `.${className} h5`)[0] ?? select(row, 'h5')[index]);
}

export default function parse(dom) {
  const lifts = {};
  const closed = resortClosed(dom);
  for (const row of repeaterRows(dom, 'comp-ku2eej1x', 0)) {
    const name = cell(row, 'comp-ku2eej4r1', 0)?.trim();
    const status = cell(row, 'comp-ku2emhj5', 2)?.trim();
    if (!name || !status) {
      continue;
    }
    lifts[name] = closed ? 'closed' : coerce(status.match(LEADING_STATUS)?.[1] ?? status);
  }
  return lifts;
}
