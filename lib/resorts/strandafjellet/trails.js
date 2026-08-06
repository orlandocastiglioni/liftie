import reportedAt from './reported-at.js';
import status from './status.js';

// Strandafjellet grades on the full 4-tier Norwegian scale (grønn / blå / rød /
// svart) and all four are in use: green 9, blue 2, red 7, black 1 of the 19
// slopes. normalizeLevel in lib/trails/parse.js has no 'red' at all, so seven
// of them - including the marquee Alpinisten and Raudeløypa - would publish
// with no level whatsoever. Fold red down to black and promote black
// to doubleBlack, which keeps all four grades distinct and correctly ordered
// (same idiom as lib/resorts/glencoe/trails.js, and how the other Scandinavian
// resorts in the registry read their 4-tier scale).
//
// Fnugg's fifth value, "uknown" (sic), is left unmapped on purpose: it does
// not occur on Strandafjellet's slopes, and an unmapped level is simply
// dropped by collect() rather than guessed at.
const levels = {
  green: 'green',
  blue: 'blue',
  red: 'black',
  black: 'doubleBlack'
};

// Same single request as the lifts - _source.slopes.list[] on the same
// document. Names are published as the resort writes them, numbering and all
// ("Kuffertløypa 6a" / "6b" are the two halves of run 6), and the roster is
// edited between seasons, so nothing here assumes a fixed set.
export default function trails(body) {
  const source = body?._source ?? {};
  const list = [];
  for (const slope of source.slopes?.list ?? []) {
    const name = slope?.name?.trim();
    if (name) {
      list.push({
        name,
        status: status(slope.status),
        level: levels[slope.slope_difficulty]
      });
    }
  }
  const at = reportedAt(source);
  if (at) {
    // non-enumerable: metadata about the list, not one of its rows
    Object.defineProperty(list, 'reportedAt', { value: at });
  }
  return list;
}
