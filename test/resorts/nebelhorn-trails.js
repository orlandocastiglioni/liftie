import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/nebelhorn/trails.js';
import collect from '../../lib/trails/parse.js';
import trails from '../trails/index.js';

// Same 2026-02-10 snapshot: the 13 rows tagged data-berg="nebelhorn" in the
// shared #pisten box (of the page's 98), 10 of them 'geöffnet'. 3 leicht,
// 4 mittel, 3 schwer and 3 ski routes, all three plain Routen. 'Pfannenhölzle'
// and 'Talabfahrt Oberstdorf' each appear twice - once as the piste, once as
// the Skiroute beside it, with their own statuses.
trails('nebelhorn', [
  { name: 'Nebelhorn-Gipfelhang', status: 'open', level: 'doubleBlack', grade: 'Piste Schwer' },
  { name: 'Nebelhorn-Gipfelskiweg', status: 'open', level: 'black', grade: 'Piste Mittel' },
  { name: 'Gipfelmulde', status: 'open', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Lifttrasse', status: 'open', level: 'black', grade: 'Piste Mittel' },
  { name: 'Sonngehren', status: 'open', level: 'doubleBlack', grade: 'Piste Schwer' },
  { name: 'Talabfahrt-Seealpe', status: 'open', level: 'doubleBlack', grade: 'Piste Schwer' },
  { name: 'Talabfahrt Oberstdorf', status: 'open', level: 'black', grade: 'Piste Mittel' },
  { name: 'Seealp-Wintersportgelände', status: 'open', level: 'blue', grade: 'Piste Leicht' },
  { name: 'NTC-Rodelpark', status: 'open', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Pfannenhölzle Skiroute', status: 'open', level: 'black', grade: 'Route' },
  { name: 'Pfannenhölzle', status: 'closed', level: 'black', grade: 'Piste Mittel' },
  { name: 'Nebelhornclassic Skiroute', status: 'closed', level: 'black', grade: 'Route' },
  { name: 'Talabfahrt Oberstdorf Skiroute', status: 'closed', level: 'black', grade: 'Route' }
]);

test('nebelhorn trails reportedAt', (_t, done) => {
  const html = readFileSync(resolve(import.meta.dirname, 'example/nebelhorn.html'), 'utf8');
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
