import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import status from '../../lib/resorts/ninox-snow-park/status.js';
import descriptor from '../../lib/resorts/ninox-snow-park/trails.js';
import collect from '../../lib/trails/parse.js';
import collectTrails from '../trails/index.js';

// 2024-03-02, mid-season and mixed: three courses at ：○ and スマイルクロス at
// ：☓ (U+2613, not ×). This is the season the park was still called
// フリーライドパーク.
collectTrails('ninox-snow-park', [
  { name: 'エンジョイコース', status: 'open', level: 'green' },
  { name: 'ジョイフルコース', status: 'open', level: 'blue' },
  { name: 'フリーライドパーク', status: 'open', level: 'terrainPark' },
  { name: 'スマイルクロス', status: 'closed', level: 'green' }
]);

// 2024-12-19, early season: the two pistes are open while the park rows carry a
// bare '-' because the park is not built yet. '-' must not read 'scheduled'.
collectTrails(
  'ninox-snow-park',
  [
    { name: 'エンジョイコース', status: 'open', level: 'green' },
    { name: 'ジョイフルコース', status: 'open', level: 'blue' },
    { name: 'nino park', status: 'closed', level: 'terrainPark' },
    { name: 'スマイルクロス', status: 'closed', level: 'green' }
  ],
  { example: 'ninox-snow-park-early' }
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

test('ninox-snow-park trails carry the widget timestamp', async () => {
  // span.todayDl01__dt01__01__04 reads ［2024/03/02 7:00］, JST
  assert.equal((await parse(fixture('ninox-snow-park'))).reportedAt, '2024-03-01T22:00:00.000Z');
  assert.equal((await parse(fixture('ninox-snow-park-early'))).reportedAt, '2024-12-18T23:02:00.000Z');
});

test('ninox-snow-park publishes nothing when the widget is absent', async () => {
  assert.deepEqual(await parse('<html><body><div class="todayBlk05">本日のお知らせ</div></body></html>'), []);
});

test('ninox-snow-park status vocabulary', () => {
  // the leading fullwidth colon belongs to the label, not the value
  assert.equal(status('：○'), 'open');
  assert.equal(status('：☓'), 'closed'); // U+2613 SALTIRE
  assert.equal(status('：×'), 'closed'); // U+00D7, in case the CMS swaps glyph
  assert.equal(status('：-'), 'closed');
  assert.equal(status('：△'), 'hold');
  assert.equal(status('：準備中'), 'scheduled');
  // anything else is handed back untouched so coerce logs it
  assert.equal(status('：謎'), '謎');
});
