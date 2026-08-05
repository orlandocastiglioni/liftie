import select from '../../select.js';
import { findText } from '../../tools/domutil.js';
import { rowName, rowStatus } from './rows.js';

// difficulty is a FontAwesome icon with no text at all, so the level has to
// come from the icon classes. Count the diamonds rather than string-matching
// the markup: the one double black ships a stray closing </i>, which
// htmlparser2 recovers from but a regex would not.
function level(node) {
  const icons = select(node, '.ski-resort-difficulty i');
  const classes = icons.map(i => i.attribs.class || '');
  const diamonds = classes.filter(c => /\bfa-diamond\b/.test(c)).length;
  if (diamonds > 1) {
    return 'doubleBlack';
  }
  if (diamonds === 1) {
    return 'black';
  }
  if (classes.some(c => /\bfa-circle\b/.test(c))) {
    return 'green';
  }
  if (classes.some(c => /\bfa-square\b/.test(c))) {
    return 'blue';
  }
}

// every section except "Lifts" is a trail pod. The "(Open)"/"(Closed)" suffix
// on the section header is a pod-level summary - rows carry their own status
// and disagree with it - so it is only used to spot the terrain park, whose
// two rows are otherwise iconed as an ordinary blue square / green circle.
export default function parse(dom) {
  const rows = [];
  for (const section of select(dom, 'div.ski-resort-section')) {
    const header = findText(select(section, '.ski-resort-header')[0]) || '';
    if (/^\s*lifts\b/i.test(header)) {
      continue;
    }
    const park = /terrain park/i.test(header);
    for (const node of select(section, 'div.ski-resort-item')) {
      const name = rowName(node);
      if (!name) {
        continue;
      }
      rows.push({
        name,
        status: rowStatus(node),
        level: park ? 'terrainPark' : level(node)
      });
    }
  }
  return rows;
}
