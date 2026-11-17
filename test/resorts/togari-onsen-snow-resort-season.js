import assert from 'node:assert/strict';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parser from '../../lib/lifts/parser.js';
import lifts from '../../lib/resorts/togari-onsen-snow-resort/index.js';
import trailRows from '../../lib/resorts/togari-onsen-snow-resort/trails.js';
import collect from '../../lib/trails/parse.js';

// The page has no update stamp, so the gate is its own "Operating Period"
// (2025.12.20 - 2026.3.29 on both fixtures): after that season has ended,
// nothing is published April-November; from December the board always
// publishes, even if the period was never updated for the new season.
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

test('togari: nothing after the operating period, not a board of closed rows', async () => {
  assert.deepEqual(await parseAt('2026-11-17T03:00:00Z', 'togari-onsen-snow-resort-offseason'), {
    lifts: {},
    trails: []
  });
  assert.deepEqual(await parseAt('2026-05-01T03:00:00Z', 'togari-onsen-snow-resort'), { lifts: {}, trails: [] });
});

test('togari: from December the board publishes even with last season period', async () => {
  const out = await parseAt('2026-12-20T03:00:00Z', 'togari-onsen-snow-resort-offseason');
  assert.equal(Object.keys(out.lifts).length, 4);
  assert.equal(out.trails.length, 17);
  assert.ok(Object.values(out.lifts).every(s => s === 'closed'));
});
