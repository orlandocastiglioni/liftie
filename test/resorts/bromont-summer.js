import assert from 'node:assert/strict';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parser from '../../lib/lifts/parser.js';
import lifts from '../../lib/resorts/bromont/index.js';
import trailRows from '../../lib/resorts/bromont/trails.js';
import collect from '../../lib/trails/parse.js';

// Wayback capture of 2026-06-11: the summer board (bike trails, water park, and
// three bike lifts under #recap-remontes) at the same URL, freshly dated. With
// no #recap-pistes block it is not the ski report, so nothing is published -
// not even the lifts, which would otherwise show summer bike-lift hours.
const file = resolve(import.meta.dirname, 'example/bromont-summer.html');

test('bromont summer board publishes no lifts and no trails', (_t, done) => {
  createReadStream(file).pipe(
    parser(
      dom => ({ lifts: lifts(dom), trails: collect(dom, trailRows) }),
      (err, out) => {
        assert.ifError(err);
        assert.deepEqual(out.lifts, {});
        assert.deepEqual(out.trails, []);
        done();
      }
    )
  );
});
