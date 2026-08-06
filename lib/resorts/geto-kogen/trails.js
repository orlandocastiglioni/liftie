import layers from './layers.js';
import { courseStatus } from './status.js';

// The 14 named general courses, as .png overlay polygons. Like the lifts, the
// objectId -> name table is hardcoded because the A1/B2/C4… badges only exist
// as pixels on the base map; the difficulty colour of each badge matches the
// 初級/中級/上級 rating published on /winter/01trail/index.html. Levels are
// emitted as green/blue/black because normalizeLevel knows those words and does
// not know 初級/中級/上級.
//
// Order is the resort's own course numbering.
const courses = [
  ['1619069114', 'A1コース', 'green'],
  ['1619241875', 'A2コース', 'blue'],
  ['1619241893', 'A3コース', 'black'],
  ['1619241919', 'A4コース', 'blue'],
  ['1619148933', 'A5コース', 'green'],
  ['1619241961', 'A6コース', 'green'],
  ['1619242156', 'B1コース', 'blue'],
  ['1618995343', 'B2コース', 'black'],
  ['1639534249', 'B3コース', 'black'],
  ['1619242211', 'C1コース', 'black'],
  ['1619242231', 'C2コース', 'blue'],
  ['1618995355', 'C3コース', 'blue'],
  ['1619243939', 'C4コース', 'green'],
  ['1619242289', 'C5コース', 'black']
];

// The page also carries ~22 further .png polygons - the ツリーランエリア, the
// park and assorted misc shapes. They do carry live status, but the resort
// publishes no names for them anywhere (the tree-run areas are only numbered on
// a Google MyMap used for rescue location), so they are skipped rather than
// given invented names. That is a gap in what Geto publishes, not in the parse.
//
// Iterate the fixed list, not the page: a course missing from the HTML is
// groomed and OPEN.
export default function parse(dom) {
  const state = layers(dom);
  return courses.map(([id, name, level]) => ({
    name,
    status: courseStatus(state[id]),
    level
  }));
}
