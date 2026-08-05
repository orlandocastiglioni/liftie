import select from '../../select.js';

/**
 * The mountain report is a PowerPack "info table" widget: four blocks -
 * Lifts, Trails, Terrain Park, Tubing - each an h4.pp-info-table-title with
 * a p.pp-info-table-subtitle of editorial free text. Only OPEN items are
 * ever published (membership in the list is the status), and the list
 * separator drifts between seasons: <br> per name in the current format,
 * plain commas in older ones. The template also emits malformed `</>`
 * closing tags, which htmlparser2 tolerates.
 */

// some seasons the subtitle is a count or a season notice instead of a list
// of names ('11 Trails - 100% Open', '5 Lanes', 'CLOSED for the 2025
// Season'). Those must yield nothing at all - passing them on would invent a
// lift named after the sentence, and 'CLOSED for the 2025 Season' does not
// coerce to closed either, it silently becomes 'scheduled'.
const NOT_A_LIST = /closed for the|\b\d+\s*(?:trails|lanes)\b|%/i;

export default function names(dom, title) {
  const block = select(dom, 'div.pp-info-table').find(
    node => text(select(node, 'h4.pp-info-table-title')[0]) === title
  );
  const subtitle = block && select(block, 'p.pp-info-table-subtitle')[0];
  if (!subtitle || NOT_A_LIST.test(text(subtitle))) {
    return [];
  }
  let parts = lines(subtitle);
  if (parts.length === 1) {
    parts = parts[0].split(',');
  }
  return parts.map(part => part.trim()).filter(Boolean);
}

// split the subtitle on its <br> elements; the text is often wrapped in a
// styled <span>, so descendants have to be walked rather than read off the
// direct children
function lines(node) {
  const out = [];
  let current = '';
  const walk = parent => {
    for (const child of parent.children ?? []) {
      if (child.type === 'text') {
        current += child.data;
      } else if (child.name === 'br') {
        out.push(current);
        current = '';
      } else {
        walk(child);
      }
    }
  };
  walk(node);
  out.push(current);
  return out.map(line => line.trim()).filter(Boolean);
}

function text(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(text).join('').trim();
}
