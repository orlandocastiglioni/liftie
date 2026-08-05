import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

/**
 * Trails come off the same renderd fetch as the lifts. Peek'n Peak renders the
 * Trails list and the Terrain Parks list from the same Toolset view id (5737,
 * two different query hashes), so one id-prefix selector picks up all 29
 * published rows in document order: 26 trails then 3 parks.
 *
 * Row markup is identical to a lift row plus a difficulty icon in
 * .list-single-left: <img class="list-single-difficulty green-circle|...">.
 *
 * green-circle / blue-square / black-diamond are already understood by
 * normalizeLevel, so they are passed through untouched. orange-oval is the
 * resort's own terrain-park marker and has no equivalent in the levels map, so
 * it is translated here rather than dropped. Anything else is passed through:
 * a future icon that normalizeLevel does not know simply yields no level
 * instead of a wrong one.
 */
const levels = {
  'orange-oval': 'terrainPark'
};

export default function parse(dom) {
  return select(dom, '[id^="wpv-view-layout-5737-"] .cond-rep-list-single')
    .map(row => {
      const name = findText(select(row, '.list-single-title')[0]);
      if (!name) {
        return;
      }
      const level = select(row, 'img.list-single-difficulty')[0]?.attribs.class?.split(/\s+/)[1];
      return {
        name,
        status: select(row, 'img.list-single-icon')[0]?.attribs.class?.split(/\s+/)[1],
        level: levels[level] ?? level
      };
    })
    .filter(Boolean);
}
