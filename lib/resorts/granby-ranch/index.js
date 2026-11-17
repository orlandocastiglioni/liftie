import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// Two markups have been live:
//
// - until 2026-11: the LIFTS accordion card renders one
//   div.trail-status-list__lift per lift, status in its BEM modifier
//   ('--open' / '--closed'). Every row emits BOTH a closed.svg and a
//   checkmark-icon.svg and CSS picks the visible one, so the <img> is unusable.
// - since 2026-11: div.gbr-trail-row.gbr-trail-row--lift, status in the
//   'gbr-trail-row--<status>' modifier, name in .gbr-trail-row__name.
const OLD = /trail-status-list__lift--(\w+)/;
const NEW = /gbr-trail-row--(?!lift\b)(\w+)/;

export default {
  selector: '.trail-status-list__lift, .gbr-trail-row--lift',
  parse(node) {
    const cls = node.attribs.class ?? '';
    const name = findText(select(node, '.tname, .gbr-trail-row__name')[0]);
    const status = (cls.match(OLD) ?? cls.match(NEW))?.[1];
    if (!name || !status) {
      return;
    }
    return { name, status };
  }
};
