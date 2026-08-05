/**
 * Alpine Media difficulty codes translated to liftie levels. The mapping has
 * to stay explicit: Alpine's `expert` is the section the app titles "Most
 * Difficult", i.e. a SINGLE black diamond, while liftie's normalizeLevel
 * reads `expert` as doubleBlack - passing the raw code through would render
 * 9 of Tyrol's 35 rows as double-black. `advanced-intermediate`,
 * `extreme-terrain` and `terrain-park-easy` are not in liftie's levels map
 * at all and would be dropped silently.
 *
 * `uphill-access` is Tyrol-specific (the resort relabels it "Tree Skiing"
 * via resort.difficultyLabels) and has no liftie equivalent, so those six
 * rows deliberately carry no level. The resort's own widget hides them; they
 * are real terrain, so they are kept here.
 */
const levels = {
  easy: 'green', // "Easiest"
  intermediate: 'blue', // "More Difficult (Intermediate)"
  'advanced-intermediate': 'black', // "More Difficult (Adv. Intermediate)"
  expert: 'black', // "Most Difficult"
  'extreme-terrain': 'doubleBlack', // "Extreme Terrain"
  'terrain-park': 'terrainPark', // "Freestyle Terrain"
  'terrain-park-easy': 'terrainPark' // "Freestyle Terrain"
};

/**
 * Same feed as the lifts (see index.js for the token requirement), trails
 * service. Here the boolean `open` carries the status - `status` is null on
 * every row and the app only consults it to swap in the hold icon when open
 * is true. `type` is NOT the difficulty: it is a free-text grouping label
 * that currently reads 'Tree Skiing' on the uphill rows.
 *
 * Three names appear twice, once as a run and once as a park ('Hans Down',
 * 'Sunrise', 'The Barnyard') - that is the feed's own shape, and the level
 * tells them apart.
 */
export default function parse(body) {
  return (body?.data ?? []).map(trail => ({
    name: (trail.displayName || trail.name || '').trim(),
    status: trail.open ? (trail.status === 'hold' ? 'hold' : 'open') : 'closed',
    level: levels[trail.difficulty]
  }));
}
