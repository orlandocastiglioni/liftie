import select from '../../select.js';
import { childText } from '../../tools/domutil.js';

// each article carries one or two span.SnowReport-item-status entries: the
// first holds the base status (open | open-partial | closed), an optional
// second is a hold badge (the Aerial Tram shows open + hold on wind hold),
// so hold wins; open-partial maps to open - coerce doesn't know 'openpartial'
export default {
  selector: '.SnowReport-Lift',
  parse(node) {
    const name = childText(node, 0);
    if (!name) {
      return;
    }
    const statuses = select(node, '.SnowReport-item-status i')
      .map(i => i.attribs.class?.match(/pti-([\w-]+)/)?.[1])
      .filter(Boolean);
    if (statuses.length === 0) {
      return;
    }
    const status = statuses.includes('hold') ? 'hold' : statuses[0];
    return { name, status: status === 'open-partial' ? 'open' : status };
  }
};
