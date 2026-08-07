import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/soellereck/trails.js';
import collect from '../../lib/trails/parse.js';
import trails from '../trails/index.js';

// Same 2026-02-10 snapshot: the 13 rows tagged data-berg="soellereck" in the
// shared #pisten box (of the page's 98), 9 of them 'geöffnet'. 8 leicht,
// 4 mittel, 1 schwer, no ski routes - the family mountain of the network.
trails('soellereck', [
  { name: 'Familienabfahrt', status: 'open', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Panoramahang', status: 'open', level: 'black', grade: 'Piste Mittel' },
  { name: 'Schrattenwang', status: 'open', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Hexenschuss', status: 'open', level: 'doubleBlack', grade: 'Piste Schwer' },
  { name: 'Ochsenhöfle', status: 'open', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Slalomhang', status: 'open', level: 'black', grade: 'Piste Mittel' },
  { name: 'Höllenritt', status: 'open', level: 'black', grade: 'Piste Mittel' },
  { name: 'Söllis Home-Run', status: 'open', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Söllis Winterwelt', status: 'open', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Drückeberger', status: 'closed', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Himmelfahrt', status: 'closed', level: 'black', grade: 'Piste Mittel' },
  { name: 'Wannebe', status: 'closed', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Zauberwald', status: 'closed', level: 'blue', grade: 'Piste Leicht' }
]);

test('soellereck trails reportedAt', (_t, done) => {
  const html = readFileSync(resolve(import.meta.dirname, 'example/soellereck.html'), 'utf8');
  parseHtml(
    html,
    dom => collect(dom, parse),
    (err, list) => {
      assert.ifError(err);
      // 'Live-Status: 10.02.2026 09:54:44', Europe/Berlin wall clock (CET)
      assert.equal(list.reportedAt, '2026-02-10T08:54:44.000Z');
      // non-enumerable, so it is not counted as a 14th piste
      assert.equal(list.length, 13);
      done();
    }
  );
});
