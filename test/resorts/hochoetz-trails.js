import assert from 'node:assert/strict';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parser from '../../lib/lifts/parser.js';
import descriptor from '../../lib/resorts/hochoetz/trails.js';
import collect from '../../lib/trails/parse.js';
import trails from '../trails/index.js';

// The 20 rows under the 'Slopes' caption, in page order (the operator sorts
// "Piste Nr 1, 10, 11, 12, 13, 14, 2, 3..." lexically - that really is the
// published order). The Winterhiking (8 rows), Crosscountry (1 row) and Legend
// (2 rows) blocks below use byte-identical markup and must NOT appear here; the
// count of 20 is what guards the caption walk in rows.js.
//
// No level and no grade: the Skigebietsmanager template publishes no difficulty
// at all for this region. Two runs are NAMED after a colour ('Wetterkreuzbahn
// schwarz' / 'rot'), which is the operator distinguishing two branches of one
// piste, not a grade for the other eighteen.
trails('hochoetz', [
  { name: 'Piste Nr 1 - Brunnenkopf Süd', status: 'closed' },
  { name: 'Piste Nr 10 - Balbachabfahrt', status: 'closed' },
  { name: 'Piste Nr 11 - Balbach Süd', status: 'closed' },
  { name: 'Piste Nr 12 - Wetterkreuzbahn schwarz', status: 'closed' },
  { name: 'Piste Nr 13 - Wetterkreuzbahn rot', status: 'closed' },
  { name: 'Piste Nr 14 - Balbach-Ochsengarten', status: 'closed' },
  { name: 'Piste Nr 2 - Brunnenkopf', status: 'closed' },
  { name: 'Piste Nr 3 - Skiweg Mohrenkopf', status: 'closed' },
  { name: 'Piste Nr 4 - Kühtaileabfahrt', status: 'closed' },
  { name: 'Piste Nr 5 - ehem.Mittelstationsabfahrt', status: 'closed' },
  { name: 'Piste Nr 6 - Panoramarestaurant-Kühtaile Alm', status: 'closed' },
  { name: 'Piste Nr 7 - Verbindung Balbach - Zirbenlift', status: 'closed' },
  { name: 'Piste Nr 8 - Mohrenkopf', status: 'closed' },
  { name: 'Piste Nr 9 - Talabfahrt Ochsengarten', status: 'closed' },
  { name: 'Skiroute 1', status: 'closed' },
  { name: 'Skiroute 2', status: 'closed' },
  { name: 'Skiroute 3', status: 'closed' },
  { name: 'Skiroute 4', status: 'closed' },
  { name: 'Skiroute 5', status: 'closed' },
  { name: 'Skiroute 6', status: 'closed' }
]);

// Every slope reads closed in an August capture, so without the report date a
// board frozen at closing day would be indistinguishable from today's.
test('hochoetz trails should publish the page timestamp', (_t, done) => {
  const filename = resolve(import.meta.dirname, 'example/hochoetz.html');
  createReadStream(filename).pipe(
    parser(
      dom => collect(dom, descriptor),
      (err, list) => {
        assert.ifError(err);
        assert.equal(list.reportedAt, '2026-08-07T12:32:38.000Z');
        assert.equal(list.length, 20);
        done();
      }
    )
  );
});
