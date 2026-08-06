import select from '../../select.js';
import rows, { text } from './rows.js';
import status from './status.js';

// Malá Úpa grades on two tiers only, carried as the title of the difficulty
// <i> (note the single quotes there - the status span next to it uses double
// quotes, so a regex keyed to one style silently drops the other):
//   'Lehká'         (state--blue)                easy
//   'Středně těžká' (state--half state--blue-red) the hill's hardest grade;
//     the site's own prose calls these runs' upper sections "náročnosti
//     odpovídající červené barvě", i.e. red-graded
// normalizeLevel knows neither string, and it has no 'red' tier at all, so a
// European red publishes with NO level. This is a 2-tier scale topping out at
// red, so red -> black keeps the two grades distinct and ordered (same idiom
// as lib/resorts/glencoe/trails.js). Map from the title, never the class:
// state--blue and state--blue-red both start with the same colour word.
const levels = {
  Lehká: 'blue',
  'Středně těžká': 'black'
};

// PROVOZ SJEZDOVEK table. Cells: [0] td.stav status span, [1] difficulty <i>,
// [2] name, [3] length, [4] vertical.
//
// The /zima/bezecke-trate cross-country table is deliberately NOT merged in:
// its three loops read 'Mimo provoz' both live and in the 13-Mar-2026
// in-season capture, on a day when this alpine table had nine lifts and ten
// slopes running, so that table is not maintained.
export default function trails(dom) {
  const list = [];
  for (const { state, cells } of rows(dom, 'PROVOZ SJEZDOVEK')) {
    const name = text(cells[2]);
    if (name) {
      list.push({
        name,
        status: status(state),
        level: levels[select(cells[1] ?? [], 'i.state')[0]?.attribs?.title?.trim()]
      });
    }
  }
  return list;
}
