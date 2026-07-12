import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

function sectionLevel(title = '') {
  if (/green/i.test(title)) return 'green';
  if (/blue/i.test(title)) return 'blue';
  if (/black diamond/i.test(title)) return 'black';
  if (/backcountry|upper mountain/i.test(title)) return 'doubleBlack';
  if (/terrain park/i.test(title)) return 'terrainPark';
}

// same menu component as the lifts parser; trail sections are 2+ and the
// difficulty comes from the section title (Green Circle Trails, ...)
export default function parse(dom) {
  const levels = {};
  for (const el of select(dom, '[data-aid^=MENU_SECTION_TITLE_]')) {
    const n = el.attribs['data-aid'].match(/_TITLE_(\d+)$/)?.[1];
    const level = sectionLevel(findText(el));
    if (n && level) {
      levels[n] = level;
    }
  }
  const rows = [];
  for (const h4 of select(dom, '[data-aid^=MENU_SECTION]')) {
    const m = h4.attribs['data-aid'].match(/^MENU_SECTION(\d+)_ITEM\d+_TITLE$/);
    if (!m || !(m[1] in levels)) {
      continue;
    }
    const name = findText(h4)?.trim();
    const price = select(h4.parent.children, '[data-ux=PriceMajor]')[0];
    const status = findText(price)?.match(/^\s*(open|closed)/i);
    if (name && status) {
      rows.push({ name, status: status[1], level: levels[m[1]] });
    }
  }
  return rows;
}
