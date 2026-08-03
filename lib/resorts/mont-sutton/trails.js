import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// Trail table table#pistes > tbody; one row per trail section (top/bottom of a
// trail appear as separate rows). td[1] is the name, td[2] holds one or more
// <span class="icon icon_track-XXX"> DIFFICULTY icons and td[4] the OPENING
// status. Both status and difficulty must be read from the CSS class, not the
// text: liftie's default levels map mis-rates Sutton's French vocabulary and the
// French status text is Latin-1 mojibake. Difficulty is mapped by icon class
// (icon_track-* -> liftie level); pick the hardest when a row lists two. The
// td[4] class token (open/closed) is already known to coerce downstream.
const LEVELS = {
  'icon_track-easy': 'green',
  'icon_track-hard': 'blue',
  'icon_track-very-hard': 'black',
  'icon_track-extreme': 'doubleBlack',
  'icon_track-extreme-plus': 'doubleBlack'
};
const RANK = { green: 0, blue: 1, black: 2, doubleBlack: 3 };

export default function parse(dom) {
  const rows = [];
  for (const tr of select(dom, 'table#pistes tbody tr')) {
    const tds = select(tr, 'td');
    if (tds.length < 5) {
      continue;
    }
    const name = findText(tds[1])?.trim();
    if (!name) {
      continue;
    }
    let level;
    for (const span of select(tds[2], 'span')) {
      for (const cls of (span.attribs?.class || '').split(/\s+/)) {
        const mapped = LEVELS[cls];
        if (mapped && (level === undefined || RANK[mapped] > RANK[level])) {
          level = mapped;
        }
      }
    }
    rows.push({ name, status: (tds[4].attribs?.class || '').trim(), level });
  }
  return rows;
}
