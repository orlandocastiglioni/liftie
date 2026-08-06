import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// Trails sit in four accordion cards after the LIFTS one (East Mountain, West
// Mountain, Uphill, Nordic) - all of them use div.trail-status-table, so a
// single pass covers alpine plus nordic terrain.
//
// Neither the difficulty nor the status is published as text: the level is the
// 'difficulty-<x>' class token and an open trail simply also carries
// 'trailopen'. The template emits an unpredictable number of spaces between
// class tokens, hence the attribute-contains selector and the regexes rather
// than an exact class match. The <img> in the status cell is not usable - the
// East card marks open rows with checkmark-icon.svg while West/Uphill/Nordic
// render the same <img class="mr-3"> for both states.
export default function parse(dom) {
  return select(dom, '.trail-status-table .trailrow[class*="difficulty-"]')
    .map(node => {
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
    })
    .filter(Boolean);
}
