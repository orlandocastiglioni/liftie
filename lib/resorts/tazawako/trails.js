import { courses, reportedAt } from './rows.js';
import { course } from './status.js';

// The ゲレンデ整備状況 table carries no difficulty, and the course page
// https://www.tazawako-ski.com/cou/ that does ("初級コース" / "中級コース" /
// "上級コース") uses different names for four of them - 国体コース is one run there
// and two rows here, ユートピアコース is listed as ぎんれいユートピアコース and
// ぎんれいパラダイス as ぎんれいパラダイスコース - so there is nothing to join on
// and the mapping is hardcoded, keyed on the names the status table uses.
//
// スノーパーク and 道場パーク are freestyle terrain. スキルアップコース and
// ミニクロスコース are practice areas with no published rating and are left
// unlevelled rather than guessed at; the site's own '全13コース' counts only the
// rated runs, but all 18 rows are real terrain and all 18 are published.
const levels = {
  白樺コース: 'green',
  水沢コース: 'green',
  かもしかコース: 'green',
  かもしかジュニアコース: 'green',

  かもしか林間コース: 'blue',
  駒ケ岳第2コース: 'blue',
  '国体コース（上部）': 'blue',
  '国体コース（下部）': 'blue',
  ユートピアコース: 'blue',

  黒森山コース: 'black',
  駒ケ岳第3コース: 'black',
  ぎんれい第2コース: 'black',
  ぎんれいパラダイス: 'black',
  水沢チャンピオンコース: 'black',

  スノーパーク: 'terrainPark',
  道場パーク: 'terrainPark'
};

export default function parse(dom) {
  const list = courses(dom)
    .filter(row => row.name)
    .map(row => ({
      name: row.name,
      status: course(row.status),
      level: levels[row.name]
    }));
  const at = reportedAt(dom);
  if (at) {
    // non-enumerable: metadata about the list, not one of its rows
    Object.defineProperty(list, 'reportedAt', { value: at });
  }
  return list;
}
