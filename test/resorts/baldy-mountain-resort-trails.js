import assert from 'node:assert/strict';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parser from '../../lib/lifts/parser.js';
import descriptor from '../../lib/resorts/baldy-mountain-resort/trails.js';
import collect from '../../lib/trails/parse.js';
import trails from '../trails/index.js';

// Alpine runs grouped under Eagle Chair, Sugarlump Quad and Magic Carpet from the
// same winter snapshot; level/status decoded from each run's <img alt> keyword.
// The page's separate 'Nordic & Snowshoe Trails' group is excluded (not a lift).
trails('baldy-mountain-resort', [
  { 'name': 'Baldy Trail', 'status': 'open', 'level': 'green' },
  { 'name': 'Stemwinder', 'status': 'open', 'level': 'green' },
  { 'name': 'Jolly Jack', 'status': 'open', 'level': 'blue' },
  { 'name': 'Dividend', 'status': 'open', 'level': 'blue' },
  { 'name': 'Powder Keg', 'status': 'open', 'level': 'blue' },
  { 'name': 'Lower Shaft', 'status': 'open', 'level': 'blue' },
  { 'name': 'Southwinds', 'status': 'closed', 'level': 'blue' },
  { 'name': 'Cabin Trail', 'status': 'open', 'level': 'blue' },
  { 'name': 'Burn Baby Burn', 'status': 'open', 'level': 'blue' },
  { 'name': 'Chix Dig It', 'status': 'open', 'level': 'blue' },
  { 'name': 'J.J. Shortcut', 'status': 'open', 'level': 'blue' },
  { 'name': 'Ponderosa', 'status': 'open', 'level': 'black' },
  { 'name': 'Shaft (Upper)', 'status': 'open', 'level': 'black' },
  { 'name': 'Honky Tonk', 'status': 'open', 'level': 'black' },
  { 'name': 'Maverick', 'status': 'open', 'level': 'black' },
  { 'name': 'Rock Star', 'status': 'open', 'level': 'black' },
  { 'name': 'South Ridge', 'status': 'open', 'level': 'black' },
  { 'name': 'C.D.', 'status': 'open', 'level': 'doubleBlack' },
  { 'name': 'Terrain Park', 'status': 'open', 'level': 'green' },
  { 'name': 'Fairweather', 'status': 'open', 'level': 'green' },
  { 'name': 'NK’Mip', 'status': 'open', 'level': 'green' },
  { 'name': 'Jolly Jack Access', 'status': 'open', 'level': 'green' },
  { 'name': 'Cascade', 'status': 'open', 'level': 'green' },
  { 'name': 'Beaver Trail', 'status': 'open', 'level': 'green' },
  { 'name': 'Haruna’s Way', 'status': 'open', 'level': 'green' },
  { 'name': 'F.W. Prospector', 'status': 'open', 'level': 'blue' },
  { 'name': 'Hulton’s Hollow', 'status': 'open', 'level': 'blue' },
  { 'name': 'The Wizard', 'status': 'open', 'level': 'blue' },
  { 'name': 'MacLeod’s', 'status': 'open', 'level': 'blue' },
  { 'name': 'Jones', 'status': 'open', 'level': 'blue' },
  { 'name': 'Tenning’s Trail', 'status': 'open', 'level': 'blue' },
  { 'name': 'Smith’s Slide', 'status': 'open', 'level': 'black' },
  { 'name': 'Borderline', 'status': 'open', 'level': 'black' },
  { 'name': 'Dash', 'status': 'open', 'level': 'black' },
  { 'name': 'Big Easy', 'status': 'open', 'level': 'green' }
]);

// The parser drops a report older than 45 days (lib/tools/stale.js), so the
// clock is pinned to just after the fixture's own stamp (span.updated 2026-01-16T07:51). `node --test`
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
const Pinned = pin('2026-01-17T12:00:00Z');
globalThis.Date = Pinned;

// On 2026-11-17 the live page ("closed for the 25/26 season") still showed
// Eagle Chair open, stamped 2026-04-16; a stamp that old must publish nothing.
test('baldy-mountain-resort reports no trails once the report goes stale', async () => {
  globalThis.Date = pin('2026-11-17T12:00:00Z');
  try {
    const stale = await new Promise((res, rej) => {
      createReadStream(resolve(import.meta.dirname, 'example/baldy-mountain-resort.html')).pipe(
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
