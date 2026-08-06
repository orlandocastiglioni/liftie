import assert from 'node:assert/strict';
import test from 'node:test';
import status from '../../lib/resorts/muica-snow-resort/status.js';
import lifts from '../lifts/index.js';

// 2026-02-19, mid-season: the full five-lift roster in page order. Four rows
// publish hours (08:30〜16:00 etc.), 第1ペア publishes 随時運行 - both mean the
// lift is running. Names arrive split by <br>: 第1<br class="spDisp">クワッド
// and スノー<br>エスカレーター.
lifts('muica-snow-resort', 'html', {
  第1クワッド: 'open',
  第1ペア: 'open',
  第2ペア: 'open',
  第3ペア: 'open',
  スノーエスカレーター: 'open'
});

// the live summer page: the block is not dropped, every row flips to 営業終了
lifts(
  'muica-snow-resort',
  'html',
  {
    第1クワッド: 'closed',
    第1ペア: 'closed',
    第2ペア: 'closed',
    第3ペア: 'closed',
    スノーエスカレーター: 'closed'
  },
  { example: 'muica-snow-resort-offseason' }
);

test('muica-snow-resort status vocabulary', () => {
  // hours in the status cell are how a running lift is published here
  assert.equal(status('08:30〜16:00'), 'open');
  assert.equal(status('9:00～16:00'), 'open'); // fullwidth tilde U+FF5E
  assert.equal(status('随時運行'), 'open');
  assert.equal(status('営業終了'), 'closed');
  assert.equal(status('運休'), 'closed');
  // 一時運休 contains 運休 and must not collapse into a flat 'closed'
  assert.equal(status('一時運休'), 'hold');
  assert.equal(status('運転見合わせ'), 'hold');
  assert.equal(status('準備中'), 'scheduled');
  // anything else is handed back untouched so coerce logs it
  assert.equal(status('謎の状態'), '謎の状態');
});
