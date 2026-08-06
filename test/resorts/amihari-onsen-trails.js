import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import descriptor from '../../lib/resorts/amihari-onsen/trails.js';
import collect from '../../lib/trails/parse.js';
import trails from '../trails/index.js';

// all 8 courses, in page order; levels come from the SLOPE OVERVIEW section
trails('amihari-onsen', [
  { name: 'Ｋ（カラマツスロープ）', status: 'open', level: 'green' },
  { name: 'ＦＲ（双子林間コース）', status: 'open', level: 'blue' },
  { name: 'ＳＳ（白樺スロープ）', status: 'open', level: 'blue' },
  { name: 'Ｔ（トドマツスロープ）', status: 'open', level: 'blue' },
  { name: 'ＦＫ（双子滑降コース）', status: 'open', level: 'blue' },
  { name: 'Ｍ１（ミズナラスロープ上部）', status: 'open', level: 'black' },
  { name: 'Ｍ２（ミズナラスロープ下部）', status: 'open', level: 'black' },
  { name: 'ＳＬ（スラロームバーン）', status: 'open', level: 'black' }
]);

// 2024-02-28 lists the same 8 courses in a different order, closes Ｍ１, and
// appends ※notes after a <br> in two of the status cells
trails(
  'amihari-onsen',
  [
    { name: 'Ｋ（カラマツスロープ）', status: 'open', level: 'green' },
    { name: 'ＳＳ（白樺スロープ）', status: 'open', level: 'blue' },
    { name: 'Ｔ（トドマツスロープ）', status: 'open', level: 'blue' },
    { name: 'ＦＫ（双子滑降コース）', status: 'open', level: 'blue' },
    { name: 'ＦＲ（双子林間コース）', status: 'open', level: 'blue' },
    { name: 'Ｍ１（ミズナラスロープ上部）', status: 'closed', level: 'black' },
    { name: 'Ｍ２（ミズナラスロープ下部）', status: 'open', level: 'black' },
    { name: 'ＳＬ（スラロームバーン）', status: 'open', level: 'black' }
  ],
  { example: 'amihari-onsen-2024' }
);

function parse(html) {
  return new Promise((res, rej) => {
    parseHtml(
      html,
      dom => collect(dom, descriptor),
      (err, list) => (err ? rej(err) : res(list))
    );
  });
}

function fixture(name) {
  return readFileSync(resolve(import.meta.dirname, `example/${name}.html`), 'utf8');
}

test('amihari-onsen trails carry the board timestamp', async () => {
  // p.txt_update reads '2026年2月7日9：50更新', JST
  assert.equal((await parse(fixture('amihari-onsen'))).reportedAt, '2026-02-07T00:50:00.000Z');
  // the 2024 snapshot doubles the suffix: '2024年2月28日7：30更新更新'
  assert.equal((await parse(fixture('amihari-onsen-2024'))).reportedAt, '2024-02-27T22:30:00.000Z');
});

test('amihari-onsen publishes nothing off-season', async () => {
  // out of season the whole div.con_movement_info is dropped from the page,
  // while an unrelated div.box_table survives inside .con_description
  const list = await parse(
    '<html><body><div class="con_description"><div class="box_table">' +
      '<table><tr><th>総コース数</th><td>7本</td></tr></table></div></div></body></html>'
  );
  assert.deepEqual(list, []);
});
