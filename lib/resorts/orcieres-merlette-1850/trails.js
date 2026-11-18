import { rows } from './widget.js';

/**
 * The slopes category. Each row's class carries the widget's difficulty code,
 * difficulty_<colour>[-<kind>]: V(erte) / B(leue) / R(ouge) / N(oire), with a
 * kind for snow-park, boardercross and slides (luge) runs.
 *
 * The French four-tier scale is shifted down one slot for liftie's levels, as
 * abondance does: verte green, bleue blue, rouge black, noire doubleBlack; the
 * colour word rides along in `grade`. Snow-park and boardercross runs are
 * terrainPark. The two luge runs are sledging, not ski runs, and are left out.
 */
const GRADES = { V: 'verte', B: 'bleue', R: 'rouge', N: 'noire' };
const LEVELS = { V: 'green', B: 'blue', R: 'black', N: 'doubleBlack' };
const PARK = new Set(['snow-park', 'boardercross']);

export default function parse(dom) {
  const list = rows(dom, 'slopes');
  const trails = [];
  for (const { name, status, difficulty = '' } of list) {
    const [colour, ...rest] = difficulty.split('-');
    const kind = rest.join('-');
    if (kind === 'slides') {
      continue;
    }
    const trail = { name, status };
    const level = PARK.has(kind) ? 'terrainPark' : !kind && LEVELS[colour];
    if (level) {
      trail.level = level;
    }
    if (GRADES[colour]) {
      trail.grade = GRADES[colour];
    }
    trails.push(trail);
  }
  if (list.reportedAt) {
    Object.defineProperty(trails, 'reportedAt', { value: list.reportedAt });
  }
  return trails;
}
