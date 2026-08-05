import select from '../../select.js';
import { normalizeLevel } from '../../trails/parse.js';

// Lost Valley hand-maintains its report as three Divi text modules ("Beginner
// Trails Open" / "INTERMEDIATE TRAILS OPEN" / "ADVANCED TERRAIN & TERRAIN
// PARKS"), each a bold heading followed by one bold trail name per <br>.
// Rather than depend on the Divi module indexes (et_pb_text_3/_4/_5) we look
// at every text module and keep the ones whose FIRST bold run reads like one
// of those headings; the heading also supplies the level.
const LEVEL = /\b(beginner|easiest|easy|novice|intermediate|advanced|expert)\b/i;
const HEADING = /trails?\s+open|terrain/i;

// the page lists only what is OPEN, and when everything is open the resort
// collapses each column to a single "All Trails" line (the advanced column
// adds "All Glades Except <names>" / "All Glades Closed"). Those are not
// trails, and there is no inventory anywhere on the site to expand them
// into names, so they are dropped - the report degenerates to zero rows
// exactly when the mountain is 100% open.
const NOT_A_TRAIL = /^all\s+(trails|glades)|trails?\s+open$|^advanced terrain|^terrain parks?$/i;

function textOf(node) {
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(textOf).join('');
}

// \s also covers the &nbsp; the editor sprinkles around the names
function clean(node) {
  return textOf(node).replace(/\s+/g, ' ').trim();
}

export default function parse(dom) {
  const rows = [];
  for (const module of select(dom, '.et_pb_text_inner')) {
    const bold = select(module, 'strong, b');
    const heading = bold.length ? clean(bold[0]) : '';
    const level = HEADING.test(heading) && normalizeLevel(heading.match(LEVEL)?.[1]);
    if (!level) {
      continue;
    }
    // the terrain-park column mixes parks in with the black trails and
    // sometimes appends a sentence ("Bear Parks is Open")
    const parks = /terrain park/i.test(heading);
    for (const el of bold.slice(1)) {
      const name = clean(el).replace(/\s+is\s+open\.?$/i, '');
      if (!name || NOT_A_TRAIL.test(name)) {
        continue;
      }
      rows.push({
        name,
        // no per-trail token is published - the list IS the open list
        status: 'open',
        level: parks && /\bparks?\b/i.test(name) ? 'terrainPark' : level
      });
    }
  }
  return rows;
}
