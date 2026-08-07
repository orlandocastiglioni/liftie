import select from '../../select.js';
import { findText } from '../../tools/domutil.js';
import rows from './rows.js';

// Portes du Soleil grades on the full four-tier French scale - verte, bleue,
// rouge, noire - published as li[data-color] green|blue|red|black. liftie's
// level map knows green, blue and black but not red, so passing data-color
// straight through would drop the level entirely from every rouge - a third of
// the network. Shift the top half down one slot instead: rouge takes black and
// noire becomes doubleBlack, which keeps all four grades distinct and in the
// source's order rather than collapsing rouge and noire onto one level.
const levels = {
  green: 'green',
  blue: 'blue',
  red: 'black',
  black: 'doubleBlack'
};

// span.show-for-sr carries the resort's own grade name, 'Piste rouge'. Publish
// the bare colour word verbatim as `grade` so the real four-tier French scale
// survives the lossy normalisation above.
//
// Châtel also files an 'Activités annexes' card under the 'Pistes' sub-header:
// a snowpark, a boardercross and three sledging areas, which do carry a
// data-color, plus five ski-touring itineraries which carry neither attribute
// and so publish with no level and no grade rather than being guessed at.
// They are the operator's own on-mountain report and are kept; nothing here is
// dropped by name.
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
