import assert from 'node:assert/strict';
import test from 'node:test';
import jp from '../../lib/tools/jp-status.js';

test('jp-status: the open vocabulary', () => {
  for (const t of ['○', '◯', '〇', '運行中', '営業中', '〇　8：30～16：00', '○ 9:00']) {
    assert.equal(jp(t), 'open', t);
  }
});

test('jp-status: the closed vocabulary', () => {
  for (const t of ['×', '✕', '✖', '運休', '営業終了', '運行終了', '×　8：30～16：00', '強風のため運休']) {
    assert.equal(jp(t), 'closed', t);
  }
});

test('jp-status: unrecognised tokens return undefined, never a guess', () => {
  // each of these is resort-specific - see the header of lib/tools/jp-status.js
  for (const t of ['△', '▲', '準備中', '整備中', '要確認', 'STANDBY', '8：35～19：50', '滑走不可']) {
    assert.equal(jp(t), undefined, t);
  }
});

test('jp-status: empty and blank input return undefined', () => {
  assert.equal(jp(), undefined);
  assert.equal(jp(''), undefined);
  assert.equal(jp('   '), undefined);
});

test('jp-status: zero-width spaces do not defeat the match', () => {
  assert.equal(jp('運​行​中'), 'open');
  assert.equal(jp('﻿運休'), 'closed');
});

test('jp-status: a resort can layer its own vocabulary on top', () => {
  const local = t => (/準備中/.test(t) ? 'scheduled' : undefined);
  const status = t => jp(t) ?? local(t) ?? 'closed';
  assert.equal(status('〇'), 'open');
  assert.equal(status('準備中'), 'scheduled');
  assert.equal(status('運休'), 'closed');
});
