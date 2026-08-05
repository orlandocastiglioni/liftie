import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

/**
 * Bear Creek hand-maintains its conditions report as Elementor widgets.
 * `section.lifts` holds one heading per group ("Lifts", then one per
 * difficulty) followed by alternating name widgets (`.teal-uppercase p`) and
 * icon widgets (`.ski-icon img`). css-select returns the combined selector in
 * document order, so one pass rebuilds the rows: a heading switches the
 * current group, a name opens a row, and the icons that follow belong to it
 * until the next name.
 *
 * The Legend block sits inside the same section and is built from the same
 * widgets, so the pass stops at its heading - otherwise its two labels
 * ("TRAILS / TERRAIN PARKS" and "Lifts") would surface as phantom rows.
 *
 * The `<p>` class is not consistent (most rows are `p.p1`, "EASY STREET" and
 * "SUN BEAR" are `p.SnowReport-feature-title`), hence the widget-level
 * `.teal-uppercase p` rather than `p.p1`.
 */
const SELECTOR = 'section.lifts .subhead-1 h3, section.lifts .teal-uppercase p, section.lifts .ski-icon img[title]';

// status is only ever an icon title, and the icons are not in a stable order
// (lifts render [type, status], trails [status, ...modifiers]) so it is picked
// by title membership rather than position. Everything else - lift types
// (Quad/Triple/Carpet), trail modifiers (Groomed/Moguls/Snow Making/Teaching
// Area) and the difficulty icons - is ignored. Note that grooming is a
// separate icon and must never be used as a status.
const STATUS = /^(open|closed|on hold)$/i;

export default function statusRows(dom) {
  const rows = [];
  let group = '';
  for (const node of select(dom, SELECTOR)) {
    if (node.name === 'h3') {
      group = findText(node)?.trim() ?? '';
      if (/^legend$/i.test(group)) {
        break;
      }
    } else if (node.name === 'p') {
      const name = findText(node)?.trim();
      if (name) {
        rows.push({ name, group });
      }
    } else {
      const row = rows.at(-1);
      const title = node.attribs.title.trim();
      if (row && !row.status && STATUS.test(title)) {
        row.status = title;
      }
    }
  }
  // a name with no status icon is not a report row
  return rows.filter(row => row.status);
}

export function isLift(row) {
  return /^lifts$/i.test(row.group);
}
