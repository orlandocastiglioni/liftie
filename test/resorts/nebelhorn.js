import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/nebelhorn/index.js';
import lifts from '../lifts/index.js';

// 2026-02-10 snapshot (Live-Status 10.02.2026 09:54:44) of the shared
// Oberstdorf Kleinwalsertal Bergbahnen status page, which lists all six of the
// operator's mountains in one #lifte box. These are the 7 rows tagged
// data-berg="nebelhorn" out of the page's 46 lift rows; midwinter, all 7 are
// 'in Betrieb'.
lifts('nebelhorn', 'html', {
  'Nebelhornbahn I': 'open',
  'Nebelhornbahn II': 'open',
  'Nebelhorn Gipfelbahn': 'open',
  Koblat: 'open',
  Sonngehren: 'open',
  'NTC-Wintererlebnispark': 'open',
  'Seealp-Lift': 'open'
});

// deepEqual above cannot see reportedAt - it is deliberately non-enumerable -
// so assert it separately, together with the count that would give it away if
// it ever became enumerable.
test('nebelhorn reportedAt', (_t, done) => {
  const html = readFileSync(resolve(import.meta.dirname, 'example/nebelhorn.html'), 'utf8');
  parseHtml(
    html,
    dom => parse(dom),
    (err, ls) => {
      assert.ifError(err);
      // 'Live-Status: 10.02.2026 09:54:44', Europe/Berlin wall clock (CET)
      assert.equal(ls.reportedAt, '2026-02-10T08:54:44.000Z');
      // and it must not count as an 8th lift
      assert.equal(Object.keys(ls).length, 7);
      done();
    }
  );
});
