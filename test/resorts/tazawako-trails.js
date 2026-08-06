import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import descriptor from '../../lib/resorts/tazawako/trails.js';
import collect from '../../lib/trails/parse.js';
import trails from '../trails/index.js';

// All 18 rows of ゲレンデ整備状況 in page order - the nine of the left column
// followed by the nine of the right. Levels are hardcoded from
// https://www.tazawako-ski.com/cou/, which names four of them differently.
//
// 2026-01-05: 本日圧雪 / 昨夜圧雪 (groomed) and 非圧雪 (ungroomed) all mean the run
// is open. 非圧雪 is the permanent state of 駒ケ岳第3コース, ぎんれいパラダイス and
// 水沢チャンピオンコース, so reading "not groomed" as closed would shut three of
// the five black runs for the whole season. 準備中 / ※準備中 is 'scheduled'.
trails('tazawako', [
  { name: '白樺コース', status: 'open', level: 'green' },
  { name: '水沢コース', status: 'open', level: 'green' },
  { name: 'かもしかコース', status: 'open', level: 'green' },
  { name: 'かもしかジュニアコース', status: 'open', level: 'green' },
  { name: '国体コース（上部）', status: 'open', level: 'blue' },
  { name: '国体コース（下部）', status: 'open', level: 'blue' },
  { name: 'ユートピアコース', status: 'open', level: 'blue' },
  { name: 'スノーパーク', status: 'scheduled', level: 'terrainPark' },
  { name: '道場パーク', status: 'scheduled', level: 'terrainPark' },
  { name: '駒ケ岳第2コース', status: 'open', level: 'blue' },
  { name: '駒ケ岳第3コース', status: 'open', level: 'black' },
  { name: 'ぎんれい第2コース', status: 'open', level: 'black' },
  { name: 'ぎんれいパラダイス', status: 'open', level: 'black' },
  { name: '水沢チャンピオンコース', status: 'open', level: 'black' },
  { name: '黒森山コース', status: 'scheduled', level: 'black' },
  { name: 'かもしか林間コース', status: 'open', level: 'blue' },
  { name: 'スキルアップコース', status: 'scheduled' },
  { name: 'ミニクロスコース', status: 'scheduled' }
]);

// 2026-02-11, peak season: adds the two tokens the January capture lacks -
// オープン on the parks and コースの一部規制 on 白樺コース. 'part of the course is
// roped off' still means the run is skiable, so it stays open.
trails(
  'tazawako',
  [
    { name: '白樺コース', status: 'open', level: 'green' },
    { name: '水沢コース', status: 'open', level: 'green' },
    { name: 'かもしかコース', status: 'open', level: 'green' },
    { name: 'かもしかジュニアコース', status: 'open', level: 'green' },
    { name: '国体コース（上部）', status: 'open', level: 'blue' },
    { name: '国体コース（下部）', status: 'open', level: 'blue' },
    { name: 'ユートピアコース', status: 'open', level: 'blue' },
    { name: 'スノーパーク', status: 'open', level: 'terrainPark' },
    { name: '道場パーク', status: 'open', level: 'terrainPark' },
    { name: '駒ケ岳第2コース', status: 'open', level: 'blue' },
    { name: '駒ケ岳第3コース', status: 'open', level: 'black' },
    { name: 'ぎんれい第2コース', status: 'open', level: 'black' },
    { name: 'ぎんれいパラダイス', status: 'open', level: 'black' },
    { name: '水沢チャンピオンコース', status: 'open', level: 'black' },
    { name: '黒森山コース', status: 'open', level: 'black' },
    { name: 'かもしか林間コース', status: 'open', level: 'blue' },
    { name: 'スキルアップコース', status: 'open' },
    { name: 'ミニクロスコース', status: 'scheduled' }
  ],
  { example: 'tazawako-feb' }
);

// 2026-08-06, off-season: 今シーズンの営業終了 on the courses and クローズ on the
// parks. Both are closed; neither is in coerce.js, so unmapped the whole
// mountain would advertise itself as about to open all summer.
trails(
  'tazawako',
  [
    { name: '白樺コース', status: 'closed', level: 'green' },
    { name: '水沢コース', status: 'closed', level: 'green' },
    { name: 'かもしかコース', status: 'closed', level: 'green' },
    { name: 'かもしかジュニアコース', status: 'closed', level: 'green' },
    { name: '国体コース（上部）', status: 'closed', level: 'blue' },
    { name: '国体コース（下部）', status: 'closed', level: 'blue' },
    { name: 'ユートピアコース', status: 'closed', level: 'blue' },
    { name: 'スノーパーク', status: 'closed', level: 'terrainPark' },
    { name: '道場パーク', status: 'closed', level: 'terrainPark' },
    { name: '駒ケ岳第2コース', status: 'closed', level: 'blue' },
    { name: '駒ケ岳第3コース', status: 'closed', level: 'black' },
    { name: 'ぎんれい第2コース', status: 'closed', level: 'black' },
    { name: 'ぎんれいパラダイス', status: 'closed', level: 'black' },
    { name: '水沢チャンピオンコース', status: 'closed', level: 'black' },
    { name: '黒森山コース', status: 'closed', level: 'black' },
    { name: 'かもしか林間コース', status: 'closed', level: 'blue' },
    { name: 'スキルアップコース', status: 'closed' },
    { name: 'ミニクロスコース', status: 'closed' }
  ],
  { example: 'tazawako-offseason' }
);

function parse(name) {
  const html = readFileSync(resolve(import.meta.dirname, `example/${name}.html`), 'utf8');
  return new Promise((res, rej) => {
    parseHtml(
      html,
      dom => collect(dom, descriptor),
      (err, list) => (err ? rej(err) : res(list))
    );
  });
}

test('tazawako trails carry the panel timestamp', async () => {
  // .box01_text reads '2026 <span>1/5</span> (月)　06:47更新', JST - the year, the
  // month/day and the time are three separate text nodes
  assert.equal((await parse('tazawako')).reportedAt, '2026-01-04T21:47:00.000Z');
  // off-season the panel is hidden but still stamped with the season's last
  // update, '2026 4/1 (水)　12:00更新', which is how the report ages out
  assert.equal((await parse('tazawako-offseason')).reportedAt, '2026-04-01T03:00:00.000Z');
});
