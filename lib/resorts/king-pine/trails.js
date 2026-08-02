import select from '../../select.js';
import { childText } from '../../tools/domutil.js';

// difficulty comes from the enclosing section's h2 icon class
const levels = {
  easiest: 'green', // Easiest
  'more-difficult': 'blue', // More Difficult
  'most-difficult': 'black', // Most Difficult
  'expert-only': 'doubleBlack', // Expert
  terrain: 'terrainPark', // Freestyle Terrain
  glades: 'black' // Tree Skiing
};

// alpine trail articles sit on the same snow report page as the lifts,
// grouped in section.SnowReport-section--trails by difficulty; the first
// span.SnowReport-item-status icon is the true status (open | open-partial |
// closed), optional later ones are snowmaking/groomed/night badges - skip
// them; open-partial maps to open since coerce doesn't know 'openpartial'
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
