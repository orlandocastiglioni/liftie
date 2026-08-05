import select from '../../select.js';
import { childText } from '../../tools/domutil.js';

// skitenney.com only iframes the PropApps widget, so we fetch the widget host
// directly; its markup is the same SnowReport-* shape jay-peak uses.
// The status is taken from the icon class (pti-open | pti-closed) of the first
// span.SnowReport-item-status - an article can carry a second one holding a
// grooming badge, which must never be read as a status
export default {
  selector: 'article.SnowReport-Lift',
  parse(node) {
    const name = childText(node, 0);
    const status = select(node, '.SnowReport-item-status i')[0]?.attribs.class?.match(/pti-([\w-]+)/)?.[1];
    if (!name || !status) {
      return;
    }
    return { name, status };
  }
};
