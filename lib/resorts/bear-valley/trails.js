import select from '../../select.js';
import { venueName, venueStatus } from './rows.js';

/**
 * the difficulty is the icon the widget renders, i.e. the API's `trailIcon` /
 * `difficultyIconPNG` (green_circle, blue_square, black_diamond,
 * double_black_diamond) - all four normalize cleanly. Deliberately NOT the
 * API's `difficulty` field, which disagrees with the icon on half the roster
 * and carries values liftie has no level for (ADVANCED_INTERMEDIATE,
 * UNKNOWN).
 */
function trailLevel(node) {
  return select(node, '.difficulty-icon')[0]?.attribs.src?.match(/difficulty_icons\/([a-z_]+)\./)?.[1];
}

// rendered trails tab of the TE2 widget - see rows.js
export default function parse(dom) {
  const trails = [];
  for (const node of select(dom, 'li.venue-item')) {
    const name = venueName(node);
    if (name) {
      trails.push({ name, status: venueStatus(node), level: trailLevel(node) });
    }
  }
  return trails;
}
