import select from '../../select.js';
import { findText } from '../../tools/domutil.js';
import status from './status.js';

// Ninox publishes no lift status at all (see "no": {"lifts": true} in
// resort.json), so this block is the resort's only live data.
//
// Difficulty is not in the status block; it comes from the operator's own
// course page, https://www.ninox.co.jp/course/, which rates エンジョイコース
// 初級 and ジョイフルコース 中級 (neither Japanese word is in the levels map in
// lib/trails/parse.js, so they are translated here: 初級 -> green,
// 中級 -> blue). nino park is described there as a slopestyle スノーパーク;
// フリーライドパーク is what the same park was called through 2024, and the
// roster is seasonal, so both names are carried.
//
// スマイルクロス is green on purpose. The course page rates it 初級 - it is a
// gentle weight-shift fun lane for beginners - even though the name reads like
// ski cross. Note the two pages do NOT agree on its name (the course page calls
// it スマイルなんちゃってクロス), so this map is keyed on the status block's
// spelling and the pages are never joined by name.
const levels = {
  エンジョイコース: 'green',
  ジョイフルコース: 'blue',
  スマイルクロス: 'green',
  'nino park': 'terrainPark',
  フリーライドパーク: 'terrainPark'
};

// ul.todayBlk04__list > li, each li one <dl>: dt > span is the course name and
// dd the status. A course with no entry in `levels` simply publishes without
// one rather than being dropped - the roster changes between seasons.
export default function parse(dom) {
  const list = [];
  for (const li of select(dom, '.todayBlk04__list > li')) {
    const name = findText(select(li, 'dt span')[0])?.trim();
    if (!name) {
      continue;
    }
    list.push({
      name,
      status: status(findText(select(li, 'dd')[0])),
      level: levels[name]
    });
  }
  const at = reportedAt(dom);
  if (at) {
    // non-enumerable: metadata about the list, not one of its rows
    Object.defineProperty(list, 'reportedAt', { value: at });
  }
  return list;
}

// The widget dates itself in span.todayDl01__dt01__01__04 as ［2026/02/11
// 7:36］ (fullwidth brackets, JST; the same value repeats in
// .todayBlk03Dl__02). Publishing it matters more here than at most resorts:
// out of season the block is not cleared, it FREEZES - the live page on
// 2026-08-06 still served ［2026/05/19 13:25］ with every course at ☓ - and
// because 'closed' is a legitimate value that frozen report is indistinguishable
// from a fresh one without the stamp.
function reportedAt(dom) {
  const m = findText(select(dom, '.todayDl01__dt01__01__04')[0])?.match(
    /(\d{4})\/(\d{1,2})\/(\d{1,2})\s+(\d{1,2}):(\d{2})/
  );
  if (!m) {
    return;
  }
  const [, y, mo, d, h, min] = m;
  const date = new Date(`${y}-${pad(mo)}-${pad(d)}T${pad(h)}:${min}:00+09:00`);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function pad(n) {
  return String(n).padStart(2, '0');
}
