import select from '../../select.js';
import { classStatus } from './status.js';

// 初級 / 中級 / 上級 are not in the levels map of lib/trails/parse.js, so they
// are translated here to the words normalizeLevel does know. No doubleBlack or
// terrainPark tokens are published - the parks are documented on
// /gelande-guide/ but are not drawn in the status SVG.
const levels = {
  初級: 'green',
  中級: 'blue',
  上級: 'black'
};

// Courses live in the gelände map SVG on the homepage, one <path> per drawn
// segment. data-name packs three fields:
//   `白樺ゲレンデ 中級（第1ペアリフト）` = name, difficulty, serving lift
// (full-width parentheses U+FF08/U+FF09). The serving lift is dropped: six
// courses credit 第10ペアリフト, which has no row in either status source, so
// trails must not be keyed off lift names.
//
// Status is the path's class, translated by classStatus - the legend for those
// classes is rendered on the same page (.m__gelandemap_courseSample:
// 運行中 / 準備中 / 運休). Course status is genuinely independent of lift
// status: on 2026-01-12 第7ペアリフト was is-close while all seven of its
// courses were is-ready.
//
// Scope to .m__gelandemap_courseSvg so the lift <g data-name> elements in the
// sibling .m__gelandemap_liftSvg can never leak in.
export default function parse(dom) {
  const rows = [];
  const seen = new Set();
  for (const path of select(dom, '.m__gelandemap_courseSvg[data-map="course"] path[data-name]')) {
    const m = path.attribs['data-name']?.match(/^(.+?)\s*(初級|中級|上級)\s*（(.+)）\s*$/);
    const state = classStatus(path.attribs.class);
    // an unrecognised class means an unknown state; publishing it would coerce
    // to 'scheduled', so drop the row rather than advertise a closed run
    if (!m || !state || seen.has(m[1])) {
      continue;
    }
    seen.add(m[1]);
    rows.push({ name: m[1], status: state, level: levels[m[2]] });
  }
  return rows;
}
