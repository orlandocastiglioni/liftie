import select from '../../select.js';
import { findText } from '../../tools/domutil.js';
import rows from './rows.js';

// Portes du Soleil grades on the full four-tier French scale - verte, bleue,
// rouge, noire - published twice per row: li[data-color] (green|blue|red|black)
// and a screen-reader span carrying the French word. liftie's level map knows
// green, blue and black but not red, so passing data-color straight through
// would drop the level entirely from every rouge - a third of the network.
// Shift the top half down one slot instead: rouge takes black and noire becomes
// doubleBlack, which keeps all four grades distinct and in the source's order.
// The resort's own word rides along untranslated in `grade`, so a consumer can
// render the real French scale rather than this lossy four-into-four reading.
const levels = {
  green: 'green',
  blue: 'blue',
  red: 'black',
  black: 'doubleBlack'
};

// rows under 'Pistes' also include the snowpark, the two boardercross runs and
// the sledging areas - the operator files them there and grades them like any
// other piste, so they keep whatever data-color it gave them rather than being
// reclassified. Names repeat across sectors ('Zone débutants' is published for
// both Nyon and Pleney); trails are a list, not a map, so both survive.
export default function parse(dom) {
  return rows(dom, 'trails').map(({ node, name, status }) => {
    const trail = { name, status };
    const level = levels[node.attribs['data-color']];
    if (level) {
      trail.level = level;
    }
    // 'Piste rouge' -> 'rouge': the bare colour word is the resort's own grade
    const grade = findText(select(node, 'span.show-for-sr')[0])
      ?.replace(/^\s*piste\s+/i, '')
      .trim();
    if (grade) {
      trail.grade = grade;
    }
    return trail;
  });
}
