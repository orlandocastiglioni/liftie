/**
 * Alpine Media difficulty codes translated to liftie levels. This mapping
 * must stay explicit: Alpine's `expert` is labelled "Most Difficult", i.e. a
 * SINGLE black diamond, while liftie's normalizeLevel reads `expert` as
 * doubleBlack - passing the raw code through would render half the mountain
 * as double-black. `advanced-intermediate`, `extreme-terrain` and
 * `terrain-park-easy` are not in liftie's levels map at all and would be
 * dropped silently.
 */
const levels = {
  easy: 'green', // "Easiest"
  intermediate: 'blue', // "More Difficult (Intermediate)"
  'advanced-intermediate': 'black', // "More Difficult (Advanced Intermediate)"
  expert: 'black', // "Most Difficult"
  'extreme-terrain': 'doubleBlack', // "Extreme Terrain"
  'terrain-park': 'terrainPark', // "Freestyle Terrain"
  'terrain-park-easy': 'terrainPark' // "Freestyle Terrain"
};

/**
 * Same feed as the lifts (see index.js for the header requirement), trails
 * service. Here the boolean `open` carries the status - the `status` field
 * is null on every row and the app only consults it to swap in the hold
 * icon when open is true. The `type` field is NOT the difficulty: it is a
 * free-text grouping label that currently holds lift names.
 */
export default function parse(body) {
  return (body?.data ?? []).map(trail => ({
    name: (trail.displayName || trail.name || '').trim(),
    status: trail.open ? (trail.status === 'hold' ? 'hold' : 'open') : 'closed',
    level: levels[trail.difficulty]
  }));
}
