import select from '../../select.js';
import { child, findText } from '../../tools/domutil.js';

// 初級 / 中級 / 上級 are not in the levels map of lib/trails/parse.js.
const levels = {
  初級: 'green',
  中級: 'blue',
  上級: 'black'
};

const courseNo = className => className?.match(/\bgc(\d+)\b/)?.[1];

// Course data is split across two blocks of /today/ that have to be joined.
//
// (a) 現在閉鎖中のコース (two `.today-w3` blocks, gc1-gc13 and gc14-gc26):
//     `<div class='gcourse gcN TdayL'><!-- N --></div><div class='TdayR'>OPEN`.
//     The label cell is EMPTY in the HTML - the printed course number is a CSS
//     decoration - so the `gcN` class is the only join key, and the status is
//     the immediately following sibling.
//
// (b) [各コース説明] (`#course_calc .course_num`) carries name and difficulty,
//     keyed by the same gcN class on its own (also empty) `.course_c1` cell.
//
// Iterate the catalogue and look the status up, never by position: the resort
// published 25 courses in 2024-03 and 2025-03 and 26 from 2025-09 (gc26
// ロイヤルパウダー was added), so the two blocks can legitimately differ in
// length.
export default function parse(dom) {
  const state = {};
  for (const cell of select(dom, '.today-w3 .gcourse')) {
    const n = courseNo(cell.attribs.class);
    const text = findText(child(cell, '+'))?.trim();
    if (n && text) {
      state[n] = text;
    }
  }

  const rows = [];
  for (const row of select(dom, '#course_calc .course_num')) {
    const n = courseNo(select(row, '.course_c1')[0]?.attribs.class);
    const name = findText(select(row, '.course_c2 .tds')[0])?.trim();
    if (!n || !name || !(n in state)) {
      continue;
    }
    // the column is headed 閉鎖理由 ('reason for closure'), so in principle a
    // free-text Japanese reason could replace CLOSE/CLOSED. Nothing but
    // OPEN/CLOSE/CLOSED has been observed since 2024-03, but treating anything
    // that is not OPEN as closed keeps an unrecognised reason from coercing to
    // 'scheduled' and advertising a shut run as about to open.
    const status = /^open$/i.test(state[n]) ? 'open' : 'closed';
    const level = levels[findText(select(row, '.course_c3 .tds')[0])?.trim()];
    // .course_c4 holds 圧雪 / 未圧雪 - a static catalogue value, not today's
    // grooming - so it is deliberately not published as a status.
    rows.push({ name, status, level });
  }
  return rows;
}
