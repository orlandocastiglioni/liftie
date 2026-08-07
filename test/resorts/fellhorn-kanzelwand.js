import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/fellhorn-kanzelwand/index.js';
import lifts from '../lifts/index.js';

// 2026-02-10 snapshot (Live-Status 10.02.2026 09:54:44) of the shared
// Oberstdorf Kleinwalsertal Bergbahnen status page, which lists all six of the
// operator's mountains in one #lifte box. These are the 13 rows tagged
// data-berg="fellhorn" - the operator's 'Fellhorn / Kanzelwand' sector, both
// sides of the German/Austrian border - out of the page's 46 lift rows.
// Midwinter: 12 'in Betrieb', the Fellhornbahn I 'außer Betrieb'.
lifts('fellhorn-kanzelwand', 'html', {
  'Fellhornbahn II': 'open',
  'Fellhorn-Gipfelbahn': 'open',
  'See-Eck Bahn': 'open',
  Scheidtobel: 'open',
  Bierenwangbahn: 'open',
  Möserbahn: 'open',
  Zweiländerbahn: 'open',
  Zwerenalpbahn: 'open',
  Kanzelwandbahn: 'open',
  Kesslerlift: 'open',
  Schwandlift: 'open',
  Ideallift: 'open',
  'Fellhornbahn I': 'closed'
});

// deepEqual above cannot see reportedAt - it is deliberately non-enumerable -
// so assert it separately, together with the count that would give it away if
// it ever became enumerable.
test('fellhorn-kanzelwand reportedAt', (_t, done) => {
  const html = readFileSync(resolve(import.meta.dirname, 'example/fellhorn-kanzelwand.html'), 'utf8');
  parseHtml(
    html,
    dom => parse(dom),
    (err, ls) => {
      assert.ifError(err);
      // 'Live-Status: 10.02.2026 09:54:44', Europe/Berlin wall clock (CET)
      assert.equal(ls.reportedAt, '2026-02-10T08:54:44.000Z');
      // and it must not count as a 14th lift
      assert.equal(Object.keys(ls).length, 13);
      done();
    }
  );
});
