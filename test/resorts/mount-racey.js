import assert from 'node:assert/strict';
import test from 'node:test';
import status from '../../lib/resorts/mount-racey/status.js';
import lifts from '../lifts/index.js';

// 2026-02-09 04:34 UTC (13:34 JST), mid-season: all four lifts in board order,
// two 運行中 and two 準備中. The gondola was suspended for the whole 2025-26
// season; ビギナーズ４リフト was pulled that afternoon for a safety concern.
lifts('mount-racey', 'html', {
  ビギナーズ４リフト: 'closed',
  ダンサーズ４リフト: 'open',
  シャトル６ゴンドラ: 'closed',
  スウィンガーズ2リフト: 'open'
});

// A single capture can only ever show two or three of the tokens, and the
// off-season one (本日営業終了 on every row) is the one this board spends most
// of the year in.
test('mount-racey status vocabulary', () => {
  assert.equal(status('運行中'), 'open');
  assert.equal(status('本日営業終了'), 'closed');
  assert.equal(status('準備中'), 'closed');
  assert.equal(status('点検中'), 'hold');
  assert.equal(status('営業前'), 'scheduled');
  // anything else is handed back untouched so coerce logs it
  assert.equal(status('謎の状態'), '謎の状態');
  assert.equal(status(), '');
});
