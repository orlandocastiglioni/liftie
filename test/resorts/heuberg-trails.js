import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import descriptor from '../../lib/resorts/heuberg/trails.js';
import collect from '../../lib/trails/parse.js';
import trails from '../trails/index.js';

/*
 * The 15 rows tagged data-berg="heuberg" in #pisten, in page order, from the
 * 2026-02-10 snapshot: 10 geöffnet, 5 geschlossen. No ski routes in this
 * sector, so all three tiers of the Austrian scale and nothing else - none of
 * which normalizeLevel knows, so an unmapped parser would publish all 15 with
 * no level at all.
 */
trails('heuberg', [
  { name: 'Parsenn-Abfahrt', status: 'open', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Hubertus-Piste', status: 'open', level: 'black', grade: 'Piste Mittel' },
  { name: 'Heuberg-Abfahrt', status: 'open', level: 'black', grade: 'Piste Mittel' },
  { name: 'Heubergmulde-Piste', status: 'open', level: 'black', grade: 'Piste Mittel' },
  { name: 'Schöntal-Piste', status: 'open', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Heuberg-Parsenn-Piste', status: 'open', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Parsenn-Heuberg-Piste', status: 'open', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Burmi-Abfahrt', status: 'open', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Hirschegg-Mittelberg-Gleitweg', status: 'open', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Mittelberg-Hirschegg Gleitweg', status: 'open', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Sonnenhang-Piste', status: 'closed', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Luggi-Leitner-Abfahrt', status: 'closed', level: 'doubleBlack', grade: 'Piste Schwer' },
  { name: 'Schlössle Abfahrt', status: 'closed', level: 'black', grade: 'Piste Mittel' },
  { name: 'Skikulipiste', status: 'closed', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Zaferna Waldabfahrt', status: 'closed', level: 'black', grade: 'Piste Mittel' }
]);

test('heuberg trails reportedAt', (_t, done) => {
  const html = readFileSync(resolve(import.meta.dirname, 'example/heuberg.html'), 'utf8');
  parseHtml(
    html,
    dom => collect(dom, descriptor),
    (err, list) => {
      assert.ifError(err);
      assert.equal(list.reportedAt, '2026-02-10T08:54:44.000Z');
      // the piste board is never emptied - all 98 rows survive into August,
      // flipped to 'geschlossen' - so the stamp is what tells a live report
      // from a frozen one. It must not become a sixteenth trail.
      assert.equal(list.length, 15);
      done();
    }
  );
});
