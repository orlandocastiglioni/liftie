import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

// Same rendered page as the lifts (see index.js). Trails are
// li[data-status-trail] rows grouped under h3 span.trail-group-title
// headings - Easiest / More Difficult / Most Difficult / Extreme Difficulty /
// Freestyle Terrain - inside one wrapper div per group. The page script only
// ever sets data-state to open, closed or unavailable for a trail; an
// unavailable row (the status call failed) is dropped.
//
// "Extreme Difficulty" is not in the levels map in lib/trails/parse.js, so
// the groups are mapped here; the rest would normalize on their own but are
// listed for one obvious table.
const levels = {
  easiest: 'green',
  'more difficult': 'blue',
  'most difficult': 'black',
  'extreme difficulty': 'doubleBlack',
  'freestyle terrain': 'terrainPark'
};

function clean(node) {
  return allText(node ?? {})
    .replace(/\s+/g, ' ')
    .trim();
}

export default function parse(dom) {
  const rows = [];
  for (const group of select(dom, 'div:has(> div > h3 .trail-group-title)')) {
    const heading = clean(select(group, '.trail-group-title')[0]);
    const level = levels[heading.toLowerCase()];
    for (const row of select(group, 'li[data-status-trail]')) {
      const label = select(row, '> span').find(
        span => !('data-status-label' in span.attribs) && !('data-status-features' in span.attribs)
      );
      const name = clean(label);
      const status = row.attribs['data-state'];
      if (!name || (status !== 'open' && status !== 'closed')) {
        continue;
      }
      rows.push({ name, status, level });
    }
  }
  return rows;
}
