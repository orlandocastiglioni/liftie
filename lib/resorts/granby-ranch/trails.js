import select from '../../select.js';
import { findText } from '../../tools/domutil.js';
import isFresh from './fresh.js';

// Until 2026-11, trails sat in four accordion cards after the LIFTS one (East
// Mountain, West Mountain, Uphill, Nordic), all div.trail-status-table. Neither
// difficulty nor status was text: the level was the 'difficulty-<x>' class
// token and an open trail also carried 'trailopen'. The template emitted an
// unpredictable number of spaces between class tokens, hence the
// attribute-contains selector and the regexes.
function legacy(dom) {
  return select(dom, '.trail-status-table .trailrow[class*="difficulty-"]').map(node => {
    const cls = node.attribs.class ?? '';
    const name = findText(select(node, '.col-9')[0]);
    if (!name) {
      return;
    }
    return {
      name,
      status: /(^|\s)trailopen(\s|$)/.test(cls) ? 'open' : 'closed',
      level: cls.match(/difficulty-(\w+)/)?.[1]
    };
  });
}

// Since 2026-11: the same cards as div.gbr-trail-section, one
// div.gbr-trail-row per trail (lift rows carry 'gbr-trail-row--lift' and are
// skipped), status in the 'gbr-trail-row--<status>' modifier and the level in
// the 'gbr-diff--<level>' marker span ('terrain-park' normalizes to terrainPark).
function redesign(dom) {
  return select(dom, '.gbr-trail-row')
    .filter(node => !/gbr-trail-row--lift\b/.test(node.attribs.class ?? ''))
    .map(node => {
      const name = findText(select(node, '.gbr-trail-row__name')[0]);
      const status = node.attribs.class?.match(/gbr-trail-row--(\w+)/)?.[1];
      if (!name || !status) {
        return;
      }
      const diff = select(node, '[class*="gbr-diff--"]')[0];
      return { name, status, level: diff?.attribs.class.match(/gbr-diff--([\w-]+)/)?.[1] };
    });
}

export default function parse(dom) {
  if (!isFresh(dom)) {
    return [];
  }
  return [...legacy(dom), ...redesign(dom)].filter(Boolean);
}
