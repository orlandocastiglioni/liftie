import slopes from './slopes.js';

/**
 * Trail rows come off the same __NEXT_DATA__ blob as the lifts. The published
 * status vocabulary is just 'open' | 'closed' and the difficulty vocabulary is
 * 'beginner' | 'intermediate' | 'advanced' - coerce() and normalizeLevel()
 * already know all five, so both are passed through untouched.
 *
 * The one exception is the terrain park: Ober publishes it as an ordinary row
 * named "Terrain Park" graded 'advanced'. Grading it black would file it with
 * the expert runs, so it is tagged terrainPark like every other liftie resort
 * that lists a park among its trails.
 */
export default function parse(dom) {
  return slopes(dom).map(slope => ({
    name: slope.name,
    status: slope.status,
    level: /terrain park/i.test(slope.name) ? 'terrainPark' : slope.difficulty
  }));
}
