import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

/**
 * Apex publishes no discrete per-lift status: the #grooming-report section is a
 * sequence of <h3> lift-group headers, each followed by trail <table>s (the long
 * groups are split across two side-by-side tables). Both the lift parser and the
 * trail parser share this reader.
 *
 * Each trail <tr> carries:
 *   TD1 = <span class="text-{color}"><svg .../></span><span>NAME</span> (the name
 *         span is malformed - it opens a stray inner <span> - so NAME is the text
 *         of the second span)
 *   TD2 (Open)    = td.text-green-600 (check) => open | td.text-red-600 (X) => closed
 *   TD3 (Groomed) = ignored
 *
 * Level comes from the TD1 icon, NOT Apex's legend words (Apex calls a single
 * diamond "extreme", which coerce would mis-map to doubleBlack):
 *   text-green-500   => green
 *   text-primary-500 => blue
 *   text-yellow-500  => terrainPark
 *   text-support-900 => black (1 diamond <path>) or doubleBlack (2 diamond <path>)
 */
function levelFrom(colorClass, pathCount) {
  if (/text-green-500/.test(colorClass)) return 'green';
  if (/text-primary-500/.test(colorClass)) return 'blue';
  if (/text-yellow-500/.test(colorClass)) return 'terrainPark';
  if (/text-support-900/.test(colorClass)) return pathCount >= 2 ? 'doubleBlack' : 'black';
}

export default function groups(dom) {
  const section = select(dom, '#grooming-report')[0];
  if (!section) {
    return [];
  }
  const out = [];
  let current = null;
  for (const node of select(section, 'h3, table')) {
    if (node.name === 'h3') {
      current = { lift: allText(node).trim(), trails: [] };
      out.push(current);
    } else if (current) {
      for (const tr of select(node, 'tr')) {
        const tds = select(tr, 'td');
        if (tds.length < 2) {
          continue; // header row (th only)
        }
        const spans = select(tds[0], 'span');
        const name = (allText(spans[1]) || '').trim();
        if (!name) {
          continue;
        }
        const level = levelFrom(spans[0]?.attribs?.class || '', select(tds[0], 'svg path').length);
        const open = /text-green-600/.test(tds[1]?.attribs?.class || '');
        current.trails.push({ name, level, open, status: open ? 'open' : 'closed' });
      }
    }
  }
  return out.filter(g => g.trails.length);
}
