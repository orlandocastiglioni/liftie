import assert from 'node:assert/strict';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parser from '../../lib/lifts/parser.js';
import lifts from '../../lib/resorts/onikoube-ski-resort/index.js';
import trailRows from '../../lib/resorts/onikoube-ski-resort/trails.js';
import collect from '../../lib/trails/parse.js';

// Both fixtures are the live pages of 2026-11-17, still showing 22 March. Read
// on the day they were captured they are 240 days old: no rows at all, never a
// board of "closed" claims. Read 44 days after the report they still publish.
function parseAt(when, name, run) {
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
      parser(run, (err, out) => {
        globalThis.Date = RealDate;
        return err ? rej(err) : res(out);
      })
    )
  );
}

test('onikoube-ski-resort: a season-old report yields no rows', async () => {
  assert.deepEqual(await parseAt('2026-11-17T03:00:00Z', 'onikoube-ski-resort', lifts), {});
  const trails = await parseAt('2026-11-17T03:00:00Z', 'onikoube-ski-resort-trails', dom => collect(dom, trailRows));
  assert.deepEqual(trails, []);
});

test('onikoube-ski-resort: survives a 44 day gap', async () => {
  const ls = await parseAt('2026-05-05T00:00:00Z', 'onikoube-ski-resort', lifts);
  assert.equal(Object.keys(ls).length, 7);
});
