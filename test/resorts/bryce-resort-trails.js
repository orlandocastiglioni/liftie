import assert from 'node:assert/strict';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parser from '../../lib/lifts/parser.js';
import descriptor from '../../lib/resorts/bryce-resort/trails.js';
import collect from '../../lib/trails/parse.js';
import trails from '../trails/index.js';

// same page as the lifts; the 14-row 'Bike Trails' table on that page must
// not appear here. Levels come from the difficulty-icon class, statuses from
// the inline svg (g#Symbols = open, g#ClosedSymbols = closed).
trails('bryce-resort', [
  { name: 'Bunny Slope', status: 'open', level: 'green' },
  { name: 'Little Nip', status: 'open', level: 'green' },
  { name: 'Red Eye', status: 'open', level: 'green' },
  { name: 'Speak Easy', status: 'closed', level: 'green' },
  { name: 'Locher Bowl', status: 'open', level: 'blue' },
  { name: 'Bootlegger', status: 'open', level: 'blue' },
  { name: "Revenuer's Run", status: 'closed', level: 'blue' },
  { name: 'White Lightning', status: 'open', level: 'blue' },
  { name: 'Prost', status: 'closed', level: 'blue' },
  { name: '80 Proof', status: 'closed', level: 'blue' },
  { name: 'Hangover', status: 'closed', level: 'black' },
  { name: "Randy's Remedy", status: 'closed', level: 'black' }
]);

// The parser drops a report older than 45 days (lib/tools/stale.js), so the
// clock is pinned to just after the fixture's own stamp ("March 15th, 2026"). `node --test`
// gives each file its own process, so the override stays here.
const RealDate = Date;
const pin = iso =>
  class extends RealDate {
    constructor(...args) {
      super(...(args.length ? args : [iso]));
    }
    static now() {
      return RealDate.parse(iso);
    }
  };
const Pinned = pin('2026-03-16T12:00:00Z');
globalThis.Date = Pinned;

// On 2026-11-17 the live page showed Lift Two open under an "April 18th, 2026"
// report; a report that old must publish nothing.
test('bryce-resort reports no trails once the report goes stale', async () => {
  globalThis.Date = pin('2026-11-17T12:00:00Z');
  try {
    const stale = await new Promise((res, rej) => {
      createReadStream(resolve(import.meta.dirname, 'example/bryce-resort.html')).pipe(
        parser(
          dom => collect(dom, descriptor),
          (e, v) => (e ? rej(e) : res(v))
        )
      );
    });
    assert.deepEqual(stale, []);
  } finally {
    globalThis.Date = Pinned;
  }
});
