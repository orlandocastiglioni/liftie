import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import descriptor from '../../lib/resorts/ifen/trails.js';
import collect from '../../lib/trails/parse.js';
import trails from '../trails/index.js';

/*
 * The 12 rows tagged data-berg="ifen" in #pisten, in page order, from the
 * 2026-02-10 snapshot: 8 geöffnet, 4 geschlossen. Two of them share the piste
 * number IF4, which is why the parser keys on the name.
 *
 * Every grade word is the resort's own: leicht/mittel/schwer is the Austrian
 * three-tier scale (blau/rot/schwarz), and normalizeLevel knows none of them,
 * so an unmapped parser would publish all 12 with no level at all.
 */
trails('ifen', [
  { name: 'Ifen-Abfahrt', status: 'open', level: 'black', grade: 'Piste Mittel' },
  { name: 'Olympiaabfahrt & Olympiahang', status: 'open', level: 'doubleBlack', grade: 'Piste Schwer' },
  { name: 'Hahnenköpfle-Abfahrt (untere Sektion)', status: 'open', level: 'black', grade: 'Piste Mittel' },
  { name: 'Hahnenköpfle-Abfahrt (obere Sektion)', status: 'open', level: 'black', grade: 'Piste Mittel' },
  { name: 'Ifenhütte-Abfahrt', status: 'open', level: 'black', grade: 'Piste Mittel' },
  { name: 'Schäfalp-Abfahrt (blau)', status: 'open', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Ski-Gleitweg Küren', status: 'open', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Gaisbühl-Pisten', status: 'open', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Kellerloch-Abfahrt', status: 'closed', level: 'doubleBlack', grade: 'Piste Schwer' },
  { name: 'Route Kellerloch', status: 'closed', level: 'doubleBlack', grade: 'Route Schwer' },
  { name: 'Schäfalp-Abfahrt (rot)', status: 'closed', level: 'black', grade: 'Piste Mittel' },
  { name: 'Ski-Gleitweg Gottesacker', status: 'closed', level: 'blue', grade: 'Piste Leicht' }
]);

test('ifen trails reportedAt', (_t, done) => {
  const html = readFileSync(resolve(import.meta.dirname, 'example/ifen.html'), 'utf8');
  parseHtml(
    html,
    dom => collect(dom, descriptor),
    (err, list) => {
      assert.ifError(err);
      assert.equal(list.reportedAt, '2026-02-10T08:54:44.000Z');
      // the piste board is never emptied - all 98 rows survive into August,
      // flipped to 'geschlossen' - so the stamp is what tells a live report
      // from a frozen one. It must not become a thirteenth trail.
      assert.equal(list.length, 12);
      done();
    }
  );
});
