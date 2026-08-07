import select from '../../select.js';
import { findText } from '../../tools/domutil.js';
import rows from './snowflake.js';

// Portes du Soleil grades on the four-tier French scale: verte / bleue /
// rouge / noire, published as li[data-color] green|blue|red|black. liftie's
// level map knows green, blue and black but not red, so a rouge would publish
// with no level at all - a third of the network. Shift the top two down one
// step to keep the ordering intact (rouge -> black, noire -> doubleBlack)
// rather than collapsing rouge and noire onto the same level.
const levels = {
  green: 'green',
  blue: 'blue',
  red: 'black',
  black: 'doubleBlack'
};

// span.show-for-sr carries the resort's own grade name, 'Piste rouge'. Publish
// the bare colour word verbatim as `grade` so the real four-tier French scale
// survives the lossy normalisation above. Rows with neither attribute (Torgon
// files 'Freeride tronchey' ungraded) get neither field.
export default function parse(dom) {
  return rows(dom, 'trails').map(({ node, name, status }) => {
    const trail = { name, status };
    const level = levels[node.attribs['data-color']];
    if (level) {
      trail.level = level;
    }
    const grade = findText(select(node, 'span.show-for-sr')[0])
      ?.replace(/^piste\s+/i, '')
      .trim();
    if (grade) {
      trail.grade = grade;
    }
    return trail;
  });
}
