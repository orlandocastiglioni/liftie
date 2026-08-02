import select from '../../select.js';
import { allText, findText } from '../../tools/domutil.js';

// same hand-posted table as the lifts: trail rows come before the
// "Lift Report" marker row; difficulty is an icon image in the name cell
export default function parse(dom) {
  const rows = [];
  for (const row of select(dom, 'table tr')) {
    const tds = row.children.filter(c => c.name === 'td');
    if (tds.some(td => td.children.some(c => c.name === 'h2'))) {
      break; // reached the Lift Report (or a later) section
    }
    if (tds.length < 2) {
      continue;
    }
    const icon = select(tds[0].children, 'img')[0];
    if (!icon) {
      continue; // header or filler row
    }
    const name = allText(tds[0])
      .replace(/^\s*\d+\.\s*/, '')
      .trim();
    // a blank status cell on this hand-posted report means the trail is not open
    const status = (findText(tds[1]) ?? '').trim() || 'closed';
    if (name) {
      rows.push({
        name,
        status,
        // prefer the icon src: terrain park rows use icon-terrain_park.png
        // but carry a hand-copied alt="black-diamond"
        level: icon.attribs.src?.match(/icon-([a-z_]+)\.png/)?.[1] ?? icon.attribs.alt
      });
    }
  }
  return rows;
}
