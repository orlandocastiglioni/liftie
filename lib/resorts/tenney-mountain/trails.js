import select from '../../select.js';
import { childText } from '../../tools/domutil.js';

// Trails share the snow report page with the lifts. There is one
// section.SnowReport-section--trails per difficulty group and the difficulty
// only lives on the section heading, so rows have to be tagged while walking
// the sections.
//
// The level comes from the heading's icon class, not its text: the visible
// headings are Uphill Route / Easier / Moderate / Advanced / Terrain Park and
// "Moderate" is not in the levels map in lib/trails/parse.js, so 21 of the 53
// trails would silently lose their level. The icon suffixes (easiest,
// more-difficult, most-difficult, terrain) all normalize on their own.
// pti-uphill-route has no equivalent - the two uphill routes are published
// trails so they are kept, just without a level.
export default function parse(dom) {
  const rows = [];
  for (const section of select(dom, 'section.SnowReport-section--trails')) {
    const level = icon(select(section, 'h2 i.pti')[0]);
    for (const article of select(section, 'article.SnowReport-Trail')) {
      const name = childText(article, 0);
      // the first .SnowReport-item-status is the real status, a second one is
      // a grooming badge (pti-groomed) and must not be read as a status
      const status = icon(select(article, '.SnowReport-item-status i')[0]);
      if (!name || !status) {
        continue;
      }
      rows.push({ name, status, level });
    }
  }
  return rows;
}

function icon(node) {
  return node?.attribs.class?.match(/pti-([\w-]+)/)?.[1];
}
