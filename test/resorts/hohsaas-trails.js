import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/hohsaas/trails.js';
import collect from '../../lib/trails/parse.js';
import trails from '../trails/index.js';

/*
 * All thirteen Pisten rows in page order, off the same single fetch as the
 * lifts. Every run carries the resort's own German colour word on `grade`;
 * `level` is the local blau -> blue / rot -> black reading, because
 * normalizeLevel knows none of these words and has no red tier at all.
 *
 * Two rows are the interesting ones. '8 Talabfahrt Saas-Balen' and 'Hohkraut
 * Gelb' are gelb - the Swiss yellow ski ROUTE, marked but ungroomed and
 * unpatrolled - which is not a fourth difficulty and gets no level, only the
 * grade. And 'Hohkraut Gelb' carries state icon 0, 'keine Meldung': the resort
 * has filed nothing for it, so it reads 'scheduled' rather than a 'closed' we
 * would be making up.
 */
trails('hohsaas', [
  { name: '1 Gletscher rot', status: 'closed', level: 'black', grade: 'rot' },
  { name: '1a Gletscher Hohkraut', status: 'closed', level: 'black', grade: 'rot' },
  { name: '2 Weissmiespiste', status: 'closed', level: 'black', grade: 'rot' },
  { name: '2a Tälli', status: 'closed', level: 'black', grade: 'rot' },
  { name: '3 Kreuzboden', status: 'closed', level: 'black', grade: 'rot' },
  { name: '4 Sandiger Boden', status: 'closed', level: 'blue', grade: 'blau' },
  { name: '5 Snowland', status: 'closed', level: 'blue', grade: 'blau' },
  { name: '6 Trift', status: 'closed', level: 'black', grade: 'rot' },
  { name: '7 Talabfahrt Saas-Grund', status: 'closed', level: 'black', grade: 'rot' },
  { name: '8 Talabfahrt Saas-Balen', status: 'closed', grade: 'gelb' },
  { name: '9 Ziebel', status: 'closed', level: 'blue', grade: 'blau' },
  { name: '10 Bodu (Saas-Balen)', status: 'closed', level: 'blue', grade: 'blau' },
  { name: 'Hohkraut Gelb', status: 'scheduled', grade: 'gelb' }
]);

test('hohsaas trails reportedAt', (_t, done) => {
  const html = readFileSync(resolve(import.meta.dirname, 'example/hohsaas.html'), 'utf8');
  parseHtml(
    html,
    dom => collect(dom, parse),
    (err, list) => {
      assert.ifError(err);
      // saison=1 keeps the winter board up in August, all closed - without the
      // date that is indistinguishable from a live all-closed report
      assert.equal(list.reportedAt, '2026-08-07T03:16:00.000Z');
      // non-enumerable, so it is not counted as a fourteenth piste
      assert.equal(list.length, 13);
      done();
    }
  );
});
