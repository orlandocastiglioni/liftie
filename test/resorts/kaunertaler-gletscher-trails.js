import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/kaunertaler-gletscher/trails.js';
import collect from '../../lib/trails/parse.js';
import trails from '../trails/index.js';

// Same 2026-01-15 winter capture as the lifts: all 27 rows of #pistenStatus in
// page order, mixed open/closed, with every one of the resort's three grades
// represented. `grade` is the German word the page actually prints; `level` is
// the local blau->blue / rot->black / schwarz->doubleBlack reading, since
// normalizeLevel knows neither the German words nor 'red'.
trails('kaunertaler-gletscher', [
  { 'name': 'Rodelbahn Sonnleiten', 'status': 'closed', 'level': 'blue', 'grade': 'Leicht' },
  { 'name': 'Funslope bei Piste Nr. 15 / Karlesjochbahn', 'status': 'open', 'level': 'blue', 'grade': 'Leicht' },
  { 'name': 'Snowpark Kaunertal', 'status': 'closed', 'level': 'blue', 'grade': 'Leicht' },
  { 'name': 'Tubingbahn beim Gletscherrestaurant', 'status': 'closed', 'level': 'blue', 'grade': 'Leicht' },
  { 'name': 'Murml', 'status': 'open', 'level': 'blue', 'grade': 'Leicht' },
  { 'name': 'Kanonenrohr', 'status': 'open', 'level': 'black', 'grade': 'Mittel' },
  { 'name': 'Nörder West', 'status': 'open', 'level': 'blue', 'grade': 'Leicht' },
  { 'name': 'Nörder Ost', 'status': 'open', 'level': 'blue', 'grade': 'Leicht' },
  { 'name': 'Promenade', 'status': 'open', 'level': 'blue', 'grade': 'Leicht' },
  { 'name': 'Express', 'status': 'open', 'level': 'blue', 'grade': 'Leicht' },
  { 'name': 'Weißseegenuss', 'status': 'closed', 'level': 'black', 'grade': 'Mittel' },
  { 'name': 'Eisschwung', 'status': 'closed', 'level': 'black', 'grade': 'Mittel' },
  { 'name': 'Weißseeclassic', 'status': 'closed', 'level': 'blue', 'grade': 'Leicht' },
  { 'name': 'Black Ibex', 'status': 'closed', 'level': 'doubleBlack', 'grade': 'Schwer' },
  { 'name': 'Ferner Ost', 'status': 'closed', 'level': 'blue', 'grade': 'Leicht' },
  { 'name': 'Südtirolerweg', 'status': 'open', 'level': 'blue', 'grade': 'Leicht' },
  { 'name': 'Karles-Easy', 'status': 'open', 'level': 'blue', 'grade': 'Leicht' },
  { 'name': 'Karles-Expert', 'status': 'open', 'level': 'black', 'grade': 'Mittel' },
  { 'name': 'Vronipiste', 'status': 'open', 'level': 'black', 'grade': 'Mittel' },
  { 'name': 'Wiesejaggl', 'status': 'open', 'level': 'black', 'grade': 'Mittel' },
  { 'name': 'Vronitunnel', 'status': 'open', 'level': 'doubleBlack', 'grade': 'Schwer' },
  { 'name': 'Freier Fall', 'status': 'closed', 'level': 'doubleBlack', 'grade': 'Schwer' },
  { 'name': 'Adlerpiste', 'status': 'closed', 'level': 'doubleBlack', 'grade': 'Schwer' },
  { 'name': 'Schmugglerin', 'status': 'open', 'level': 'black', 'grade': 'Mittel' },
  { 'name': 'Wallfahrer', 'status': 'closed', 'level': 'doubleBlack', 'grade': 'Schwer' },
  { 'name': 'Gletscherstraße: Mautstelle - Ochsenalm', 'status': 'open', 'level': 'blue', 'grade': 'Leicht' },
  { 'name': 'Gletscherstraße: Ochsenalm - Gletscherparkplatz', 'status': 'open', 'level': 'blue', 'grade': 'Leicht' }
]);

test('kaunertaler-gletscher trails reportedAt', (_t, done) => {
  const html = readFileSync(resolve(import.meta.dirname, 'example/kaunertaler-gletscher.html'), 'utf8');
  parseHtml(
    html,
    dom => collect(dom, parse),
    (err, list) => {
      assert.ifError(err);
      assert.equal(list.reportedAt, '2026-01-15T08:05:00.000Z');
      // non-enumerable, so it is not counted as a 28th piste
      assert.equal(list.length, 27);
      done();
    }
  );
});
