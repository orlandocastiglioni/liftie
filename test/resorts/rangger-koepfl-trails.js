import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/rangger-koepfl/trails.js';
import collect from '../../lib/trails/parse.js';
import trails from '../trails/index.js';

// Same 2026-08-07 capture as the lifts: all 9 rows under the "Slopes" caption,
// in page order, every one closed for the summer. The two Legend rows ("open",
// "closed") use the identical markup and must not appear here.
//
// `grade` is the colour the row's slope_diff icon actually paints - blue 320,
// red 288, black 326 - and `level` the local blue->blue / red->black /
// black->doubleBlack reading of Austria's three tiers, since normalizeLevel has
// no 'red' at all.
trails('rangger-koepfl', [
  { name: '1a Egghof-Talstation', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '1a Stiglreith-Egghof', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '1b Stiglreith-Egghof', status: 'closed', level: 'black', grade: 'red' },
  { name: '1c Egghof-Talstation', status: 'closed', level: 'doubleBlack', grade: 'black' },
  { name: 'F1 Rangger Köpfl-Rosskogelhütte', status: 'closed', level: 'black', grade: 'red' },
  { name: 'F1 Rangger Köpfl-Sulzstich', status: 'closed', level: 'blue', grade: 'blue' },
  { name: 'F1 Sulzstich-Stiglreith', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '2 Rangger Köpfl-Sulzstich', status: 'closed', level: 'black', grade: 'red' },
  { name: '3 Rangger Köpfl-Mitte Schlepplift', status: 'closed', level: 'black', grade: 'red' }
]);

test('rangger-koepfl trails reportedAt', (_t, done) => {
  const html = readFileSync(resolve(import.meta.dirname, 'example/rangger-koepfl.html'), 'utf8');
  parseHtml(
    html,
    dom => collect(dom, parse),
    (err, list) => {
      assert.ifError(err);
      assert.equal(list.reportedAt, '2026-08-04T17:02:47.000Z');
      // non-enumerable, so it is not counted as a tenth piste
      assert.equal(list.length, 9);
      done();
    }
  );
});
