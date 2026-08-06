import reportedAt from './reported-at.js';
import status from './status.js';

// Norefjell runs the full 4-tier Scandinavian scale and all four grades are in
// use here: green (9 runs), blue (11), red (7) and black (3). normalizeLevel
// has no 'red' at all, so 7 of the 30 slopes - including the terrain park,
// which Fnugg types 'red' rather than as a park - would publish with no level
// whatsoever. Fold red down to black and promote black to
// doubleBlack, which keeps all four grades distinct and correctly ordered
// (same idiom as lib/resorts/glencoe/trails.js, and identical to how the other
// Scandinavian resorts in the registry read their 4-tier scale).
//
// Fnugg's fifth value, "uknown" (sic), is deliberately absent: it does not
// occur at Norefjell and an unmapped level is simply dropped by collect().
const levels = {
  green: 'green',
  blue: 'blue',
  red: 'black',
  black: 'doubleBlack'
};

// Same single request as the lifts - _source.slopes.list[] on the same
// document. Names arrive pre-numbered by the resort ("1. Gamleveien"); leave
// them as published so they line up with the piste map.
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
    Object.defineProperty(list, 'reportedAt', { value: at });
  }
  return list;
}
