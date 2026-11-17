import assert from 'node:assert/strict';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parser from '../../lib/lifts/parser.js';
import lifts from '../../lib/resorts/ski-saint-bruno/index.js';
import trailRows from '../../lib/resorts/ski-saint-bruno/trails.js';
import collect from '../../lib/trails/parse.js';

// Wayback capture of 2026-05-15: the season is over (10 degrees in the
// forecast) but the board still shows lifts B and 2 and seven trails "Open".
// The page carries no date, so the calendar gate is what keeps this from
// publishing; the winter fixture read in summer must be suppressed the same
// way, and suppressed means no rows, never "closed" ones.
function parseAt(when, name) {
  const RealDate = Date;
  globalThis.Date = class extends RealDate {
    constructor(...args) {
      super(...(args.length ? args : [when]));
    }
    static now() {
      return RealDate.parse(when);
    }
  };
  const file = resolve(import.meta.dirname, `example/${name}.html`);
  return new Promise((res, rej) =>
    createReadStream(file).pipe(
      parser(
        dom => ({ lifts: lifts(dom), trails: collect(dom, trailRows) }),
        (err, out) => {
          globalThis.Date = RealDate;
          return err ? rej(err) : res(out);
        }
      )
    )
  );
}

test('ski-saint-bruno publishes nothing from the stale spring board', async () => {
  const out = await parseAt('2026-05-15T12:00:00Z', 'ski-saint-bruno-spring');
  assert.deepEqual(out, { lifts: {}, trails: [] });
});

test('ski-saint-bruno publishes nothing in summer, even from a winter board', async () => {
  const out = await parseAt('2026-07-01T12:00:00Z', 'ski-saint-bruno');
  assert.deepEqual(out, { lifts: {}, trails: [] });
});

test('ski-saint-bruno publishes the board again from November', async () => {
  const out = await parseAt('2026-11-20T12:00:00Z', 'ski-saint-bruno');
  assert.equal(Object.keys(out.lifts).length, 8);
  assert.equal(out.trails.length, 27);
});
