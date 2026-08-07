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

// Every piste on this page is graded, and several are published once per grade
// where the run splits - 'Les favieres verte' and 'Les favieres bleue',
// 'Graydon bleue' / 'Graydon rouge', 'Les lanches' three times. Those are the
// operator's own row names, kept verbatim. A row with no data-color and no
// grade span would publish with neither field rather than a guessed one.
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
