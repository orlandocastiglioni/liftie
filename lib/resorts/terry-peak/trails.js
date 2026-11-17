import select from '../../select.js';
import { isDor, trails } from './dor.js';
import { name, status } from './row.js';

// The site was rebuilt in 2026-11 (DOR status widget, see dor.js: level from
// the column heading's --beginner|intermediate|advanced modifier).
//
// Pre-rebuild fallback: difficulty was published twice, as an img alt
// ('beginner Icon') and as a row class. The class is the cleaner hook - no
// ' Icon' suffix to strip - and beginner/intermediate/advanced all normalise
// (green/blue/black). The list has no doubleBlack or terrain-park tier;
// /the-mountain/terrain-park/ carries no status rows at all.
const LEVEL = /\btrail-(beginner|intermediate|advanced)\b/;

const legacy = {
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

export default function parse(dom) {
  if (isDor(dom)) {
    return trails(dom);
  }
  return select(dom, legacy.selector).map(legacy.parse).filter(Boolean);
}
