import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/fellhorn-kanzelwand/trails.js';
import collect from '../../lib/trails/parse.js';
import trails from '../trails/index.js';

// Same 2026-02-10 snapshot: the 28 rows tagged data-berg="fellhorn" in the
// shared #pisten box (of the page's 98), 19 of them 'geöffnet'. 8 leicht,
// 13 mittel, 2 schwer and 5 ski routes, 4 of which are schwere Routen.
// Both 'Familienabfahrt' rows are real - pistes 3 and 4 share the name.
trails('fellhorn-kanzelwand', [
  { name: 'Faistenoy-Abfahrt', status: 'open', level: 'black', grade: 'Piste Mittel' },
  { name: 'Schlappold-Abfahrt', status: 'open', level: 'black', grade: 'Piste Mittel' },
  { name: 'Familienabfahrt', status: 'open', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Familienabfahrt', status: 'open', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Stieralp-Piste', status: 'open', level: 'black', grade: 'Piste Mittel' },
  { name: 'Heubichl-Piste', status: 'open', level: 'black', grade: 'Piste Mittel' },
  { name: 'Bierenwangpiste', status: 'open', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Möser-Piste', status: 'open', level: 'black', grade: 'Piste Mittel' },
  { name: 'Damenabfahrt', status: 'open', level: 'black', grade: 'Piste Mittel' },
  { name: 'Katzenkopf-Piste', status: 'open', level: 'black', grade: 'Piste Mittel' },
  { name: 'Obere Geren-Piste', status: 'open', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Walsergund-Piste', status: 'open', level: 'blue', grade: 'Piste Leicht' },
  { name: '2-Länder-Piste', status: 'open', level: 'black', grade: 'Piste Mittel' },
  { name: 'Standard-Piste', status: 'open', level: 'black', grade: 'Piste Mittel' },
  { name: 'Zwerenalp-Piste', status: 'open', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Kanzelwand Talabfahrt', status: 'open', level: 'black', grade: 'Piste Mittel' },
  { name: 'Kessler-Hang', status: 'open', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Schwandlift-Piste', status: 'open', level: 'black', grade: 'Piste Mittel' },
  { name: 'Ideallift-Abfahrt', status: 'open', level: 'blue', grade: 'Piste Leicht' },
  { name: 'Fellhorn-Steilhang', status: 'closed', level: 'doubleBlack', grade: 'Piste Schwer' },
  { name: 'Branntwein-Piste', status: 'closed', level: 'doubleBlack', grade: 'Piste Schwer' },
  { name: 'Lifttrasse', status: 'closed', level: 'black', grade: 'Piste Mittel' },
  { name: 'Buckelpiste Haushang', status: 'closed', level: 'doubleBlack', grade: 'Route Schwer' },
  { name: 'Route Stieralp', status: 'closed', level: 'black', grade: 'Route' },
  { name: 'Möserroute', status: 'closed', level: 'doubleBlack', grade: 'Route Schwer' },
  { name: 'Route Katzenkopf', status: 'closed', level: 'doubleBlack', grade: 'Route Schwer' },
  { name: 'Buckelpiste Zweiländerbahn', status: 'closed', level: 'doubleBlack', grade: 'Route Schwer' },
  { name: 'Skiweg Schwand-Kessler', status: 'closed', level: 'black', grade: 'Piste Mittel' }
]);

test('fellhorn-kanzelwand trails reportedAt', (_t, done) => {
  const html = readFileSync(resolve(import.meta.dirname, 'example/fellhorn-kanzelwand.html'), 'utf8');
  parseHtml(
    html,
    dom => collect(dom, parse),
    (err, list) => {
      assert.ifError(err);
      // 'Live-Status: 10.02.2026 09:54:44', Europe/Berlin wall clock (CET)
      assert.equal(list.reportedAt, '2026-02-10T08:54:44.000Z');
      // non-enumerable, so it is not counted as a 29th piste
      assert.equal(list.length, 28);
      done();
    }
  );
});
