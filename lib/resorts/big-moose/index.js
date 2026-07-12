import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { findText } from '../../tools/domutil.js';

// GoDaddy website-builder "menu" component; classes are obfuscated so rows
// are located via data-aid: section 0 is Lifts, each item is an h4 TITLE
// with a sibling PriceMajor div holding OPEN/CLOSED
export default function parse(dom) {
  const liftStatus = {};
  for (const h4 of select(dom, '[data-aid^=MENU_SECTION0_ITEM]')) {
    if (!h4.attribs['data-aid'].endsWith('_TITLE')) {
      continue;
    }
    const name = findText(h4)?.trim();
    const price = select(h4.parent.children, '[data-ux=PriceMajor]')[0];
    const status = findText(price)?.match(/^\s*(open|closed)/i);
    if (name && status) {
      liftStatus[name] = coerce(status[1]);
    }
  }
  return liftStatus;
}
