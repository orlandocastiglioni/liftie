import { name, status } from './row.js';

// Difficulty is published twice: as an img alt ('beginner Icon') and as a row
// class. The class is the cleaner hook - no ' Icon' suffix to strip - and
// beginner/intermediate/advanced all normalise (green/blue/black). The list
// has no doubleBlack or terrain-park tier; /the-mountain/terrain-park/ carries
// no status rows at all.
const LEVEL = /\btrail-(beginner|intermediate|advanced)\b/;

export default {
  selector: '#trailStatus .js-trails-container .o-status__table-row.js-trails-item',
  parse(node) {
    const trail = name(node);
    const state = status(node);
    if (!trail || !state) {
      return;
    }
    return {
      name: trail,
      status: state,
      level: node.attribs?.class?.match(LEVEL)?.[1]
    };
  }
};
