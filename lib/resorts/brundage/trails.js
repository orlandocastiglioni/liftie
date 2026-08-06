import select from '../../select.js';
import { allText, findText } from '../../tools/domutil.js';

// Grooming is folded into the status column, so the raw strings include
// "Groomed This Morning", "Groomed Last Night" and "Open - Closes at 3:15 PM
// Daily". coerce() only knows bare "Open"/"Closed"/"Groomed" - the rest
// collapse to unmapped keys and would silently become 'scheduled', which is
// roughly half of the open trails. Normalize on the leading word instead.
function status(raw = '') {
  if (/^groomed|^open/i.test(raw)) {
    return 'open';
  }
  if (/^closed/i.test(raw)) {
    return 'closed';
  }
  return raw;
}

// Trail rows live on the same page as the lifts, in one table.tablepress per
// zone inside section.trail-report. Three cells: name, difficulty (icon + the
// level word), status. Scope to #grooming-report - the page header carries a
// summer bike-trail widget outside it.
export default function parse(dom) {
  const rows = [];
  for (const tr of select(dom, '#grooming-report .trail-report table.tablepress tr')) {
    const cells = select(tr, 'td');
    if (cells.length < 3) {
      continue;
    }
    const name = findText(cells[0]);
    if (!name) {
      continue;
    }
    rows.push({
      name,
      // the level cell holds an <img> before the word, so read its own text
      // nodes rather than descending into the first child
      level: allText(cells[1]).trim(),
      status: status(findText(cells[2])?.trim())
    });
  }
  return rows;
}
