import select from '../../select.js';

// status is encoded only by which Font Awesome 6 glyph is inlined: both
// circle-check and circle-xmark start with the same circle outline, the
// check is the part that follows
const OPEN_ICON = 'M369 209';

function deepText(node) {
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(deepText).join('');
}

/*
 * the slope report is a Breakdance page: lifts and trails are option
 * repeaters, one per <h1> section ("Chairs & Tows", "Beginner Slopes", ...).
 * the numeric bde-*-1252-101 style element ids get regenerated whenever a
 * block is rebuilt in the builder (the icon div was already -102 in one
 * capture and -103 in another), so rows are anchored on the section heading
 * plus article.bde-loop-item and read positionally from there.
 *
 * returns [{ heading, rows: [{ name, status }] }] in document order.
 */
export default function sections(dom) {
  const found = [];
  let heading;
  for (const node of select(dom, 'h1, .bde-repeater-element')) {
    if (node.name === 'h1') {
      heading = clean(deepText(node));
      continue;
    }
    const rows = [];
    for (const article of select(node, 'article.bde-loop-item')) {
      // the name is the first non-empty .bde-text - the terrain park rows
      // leave the first one blank - and any later one is a free text
      // operator note ("As Needed", "Closed due to lift maintenance",
      // "Freestyle features") that must never be read as a status
      const name = select(article, '.bde-text')
        .map(t => clean(deepText(t)))
        .find(Boolean);
      const icon = select(article, '.bde-icon svg path')[0]?.attribs.d;
      if (name && icon) {
        rows.push({ name, status: icon.includes(OPEN_ICON) ? 'open' : 'closed' });
      }
    }
    if (rows.length > 0) {
      found.push({ heading, rows });
    }
  }
  return found;
}

function clean(str) {
  return str.replace(/\s+/g, ' ').trim();
}
