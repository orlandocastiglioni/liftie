import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

const rank = { open: 0, closed: 1 };

// trail rows are nested under each lift's <details>; the difficulty and
// status icons carry title attributes (occasionally a raw term id, coerced
// away). Beginner trails served by two lifts (Meadows, Mystery, Whitetail)
// are listed under both sections - merge by name, open wins, first level kept
export default function parse(dom) {
  const byName = new Map();
  for (const row of select(dom, '.trail.component-row')) {
    const title = select(row.children, '.cell.title')[0];
    const status = select(row.children, '.status .f-icon')[0];
    const level = title && select(title.children, '.f-icon.level')[0];
    if (!title || !status) {
      continue;
    }
    const trail = {
      name: allText(title).trim(),
      status: status.attribs.title,
      level: level?.attribs.title
    };
    const prev = byName.get(trail.name);
    if (!prev) {
      byName.set(trail.name, trail);
    } else {
      if (rank[trail.status] < rank[prev.status]) {
        prev.status = trail.status;
      }
      prev.level ??= trail.level;
    }
  }
  return [...byName.values()];
}
