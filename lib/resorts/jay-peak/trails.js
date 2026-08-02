import select from '../../select.js';
import { childText } from '../../tools/domutil.js';

// difficulty comes from the enclosing section's h2 icon class
const levels = {
  easiest: 'green', // Beginner
  'more-difficult': 'blue', // Intermediate
  'most-difficult': 'black', // Advanced
  terrain: 'terrainPark', // Terrain Park
  'glades--more-difficult': 'blue', // Intermediate Glade
  'glades--most-difficult': 'doubleBlack' // Advanced Glade
};

// trail articles sit on the same snow report page as the lifts, grouped in
// section.SnowReport-section--trails by difficulty; the first
// span.SnowReport-item-status icon is the true status (open | open-partial |
// closed), an optional second is a groomed/snowmaking badge - skip it;
// open-partial maps to open since coerce doesn't know 'openpartial'
export default function parse(dom) {
  const rows = [];
  for (const section of select(dom, 'section.SnowReport-section--trails')) {
    const icon = select(section, 'h2 i.pti')[0]?.attribs.class?.match(/pti-([\w-]+)/)?.[1];
    const level = levels[icon];
    for (const article of select(section, '.SnowReport-Trail')) {
      const name = childText(article, 0);
      const status = select(article, '.SnowReport-item-status i')[0]?.attribs.class?.match(/pti-([\w-]+)/)?.[1];
      if (!name || !status) {
        continue;
      }
      rows.push({
        name,
        status: status === 'open-partial' ? 'open' : status,
        level
      });
    }
  }
  return rows;
}
