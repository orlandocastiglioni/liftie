import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/kaunertaler-gletscher/index.js';
import lifts from '../lifts/index.js';

// /kaunertaler-gletscher/nowbox.html as archived on 2026-01-15, mid season:
// 8 of 10 lifts open. Status is a coloured dot with no text at all, and the
// open dot's class token is the empty string - the two closed rows are the
// only ones that say anything, so a parser that let coerce see the raw token
// would publish all eight open lifts as 'scheduled'.
lifts('kaunertaler-gletscher', 'html', {
  Nörderjoch: 'open',
  Fernerlift: 'closed',
  Sonnenlift: 'open',
  'Ochsenalmbahn I': 'open',
  'Ochsenalmbahn II': 'open',
  Karlesjochbahn: 'open',
  Weißseejochbahn: 'open',
  Falginjochbahn: 'closed',
  Zauberteppich: 'open',
  'Dorflift in Feichten': 'open'
});

test('kaunertaler-gletscher reportedAt', (_t, done) => {
  const html = readFileSync(resolve(import.meta.dirname, 'example/kaunertaler-gletscher.html'), 'utf8');
  parseHtml(
    html,
    dom => parse(dom),
    (err, ls) => {
      assert.ifError(err);
      // 'Aktualisiert am 15.01.2026 um 09:05', Europe/Vienna wall clock (CET)
      assert.equal(ls.reportedAt, '2026-01-15T08:05:00.000Z');
      // and it must not count as an eleventh lift
      assert.equal(Object.keys(ls).length, 10);
      done();
    }
  );
});
