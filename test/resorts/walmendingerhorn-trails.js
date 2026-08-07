import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import descriptor from '../../lib/resorts/walmendingerhorn/trails.js';
import collect from '../../lib/trails/parse.js';
import trails from '../trails/index.js';

/*
 * The 17 rows tagged data-berg="walmendingerhorn" in #pisten, in page order,
 * from the 2026-02-10 snapshot: 10 geöffnet, 7 geschlossen.
 *
 * This sector has no 'schwer' piste at all, so its hard end is carried by the
 * ski routes - three 'Route Schwer' (square-diamond.schwereRoute) and one
 * plain 'Route' (Route Lüchlemulde). None of leicht/mittel/Route/Route Schwer
 * is in normalizeLevel's map, so an unmapped parser would publish all 17 with
 * no level at all.
 */
trails('walmendingerhorn', [
  { name: 'Walmendingerhorn-Abfahrt', status: 'open', level: 'black', grade: 'Piste Mittel' },
  { name: 'Muttelberg-Abfahrt', status: 'open', level: 'black', grade: 'Piste Mittel' },
  { name: 'Route Muttelberg', status: 'open', level: 'doubleBlack', grade: 'Route Schwer' },
  { name: 'Route Lüchlemulde', status: 'open', level: 'black', grade: 'Route' },
  { name: 'Jedermannpiste', status: 'open', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Wildental-Piste', status: 'open', level: 'black', grade: 'Piste Mittel' },
  { name: 'Wildental Waldabfahrt', status: 'open', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Moosliftpiste', status: 'open', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Skiweg Moos-Jedermann', status: 'open', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Spur Moos-Zaferna', status: 'open', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Talabfahrt Walmendingerhorn', status: 'closed', level: 'black', grade: 'Piste Mittel' },
  { name: 'Doppelsessellift-Abfahrt', status: 'closed', level: 'black', grade: 'Piste Mittel' },
  { name: 'Route Steilhang', status: 'closed', level: 'doubleBlack', grade: 'Route Schwer' },
  { name: 'Route Bühlalpe - Heudohle', status: 'closed', level: 'doubleBlack', grade: 'Route Schwer' },
  { name: 'Wildental Panoramaabfahrt', status: 'closed', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Skiweg Maisäss-Moos', status: 'closed', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Skiweg Zaferna-Moos', status: 'closed', level: 'blue', grade: 'Piste Leicht' }
]);

test('walmendingerhorn trails reportedAt', (_t, done) => {
  const html = readFileSync(resolve(import.meta.dirname, 'example/walmendingerhorn.html'), 'utf8');
  parseHtml(
    html,
    dom => collect(dom, descriptor),
    (err, list) => {
      assert.ifError(err);
      assert.equal(list.reportedAt, '2026-02-10T08:54:44.000Z');
      // the piste board is never emptied - all 98 rows survive into August,
      // flipped to 'geschlossen' - so the stamp is what tells a live report
      // from a frozen one. It must not become an eighteenth trail.
      assert.equal(list.length, 17);
      done();
    }
  );
});
