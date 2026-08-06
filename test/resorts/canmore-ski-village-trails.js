import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import descriptor from '../../lib/resorts/canmore-ski-village/trails.js';
import collect from '../../lib/trails/parse.js';
import trails from '../trails/index.js';

// all 8 courses in document order, from the 2026-03-06 winter board: four
// ◯滑走可 and four ✕整備中. Levels come from the static /guide/ grading.
trails('canmore-ski-village', [
  { name: 'ラビットコース', status: 'closed', level: 'green' },
  { name: 'メイプルコース', status: 'open', level: 'green' },
  { name: 'ロッキーコース', status: 'open', level: 'blue' },
  { name: 'カリブーコース', status: 'closed', level: 'blue' },
  { name: 'マーモットコース', status: 'open', level: 'blue' },
  { name: 'バッファローコース', status: 'open', level: 'blue' },
  { name: 'キャニオンコース', status: 'closed', level: 'black' },
  { name: 'デスバレーコース', status: 'closed', level: 'doubleBlack' }
]);

function parse(html) {
  return new Promise((res, rej) => {
    parseHtml(
      html,
      dom => collect(dom, descriptor),
      (err, list) => (err ? rej(err) : res(list))
    );
  });
}

function widget(inner) {
  return `<div class="elementor-element elementor-widget elementor-widget-text-editor" data-element_type="widget">${inner}</div>`;
}

test('canmore-ski-village trails carry the board timestamp', async () => {
  // '2026.03.06 14:51更新', JST
  const html = readFileSync(resolve(import.meta.dirname, 'example/canmore-ski-village.html'), 'utf8');
  assert.equal((await parse(html)).reportedAt, '2026-03-06T05:51:00.000Z');
});

test('canmore-ski-village falls back to the span colour', async () => {
  // only ◯滑走可 / ✕整備中 have ever been published; an unseen word still lands
  // on the right side because the inline colour is a second signal
  const list = await parse(
    `<html><body>${widget('テストコース:<span style="color:green;font-weight: 400">滑走OK</span>')}` +
      `${widget('ほかコース:<span style="color:red;font-weight: 400">本日休止</span>')}</body></html>`
  );
  assert.deepEqual(list, [
    { name: 'テストコース', status: 'open' },
    { name: 'ほかコース', status: 'closed' }
  ]);
});

test('canmore-ski-village ignores text widgets that are not status badges', async () => {
  const list = await parse(
    `<html><body>${widget('<p>Conditions<br><em>コース状況</em></p>')}` +
      `${widget(' 2026.03.06 14:51更新 ')}` +
      `${widget('お問い合わせ:<span>0166-00-0000</span>')}` +
      `${widget('ラビットコース:<span style="color:red;font-weight: 400">✕整備中</span>')}</body></html>`
  );
  assert.deepEqual(list, [{ name: 'ラビットコース', status: 'closed', level: 'green' }]);
});
