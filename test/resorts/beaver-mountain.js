import assert from 'node:assert/strict';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parser from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/beaver-mountain/index.js';
// skithebeav.com/mountain/conditions/ - the page is frozen at the last operating
// day rather than reset for summer, so this capture is the real 3/27/26 closing
// day report: 3 of the 6 lifts open, 3 closed. Status vocabulary is the
// lowercase pair open/closed and nothing else.
import lifts from '../lifts/index.js';

// The parser drops a report older than 14 days, so the clock is pinned to the
// day after the fixture's own stamp (3/27/26). `node --test` gives each file its
// own process, so the override stays here. Anything that re-pins it must restore
// `Pinned`, not RealDate, or the shared lifts() test below reads a stale page.
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
const Pinned = pin('2026-03-28T12:00:00Z');
globalThis.Date = Pinned;

lifts('beaver-mountain', 'html', {
  'The LittleEEZY conveyor': 'closed',
  'The BigEEZY conveyor': 'open',
  'Little Beaver Triple Lift': 'open',
  "Beaver's Face Lift": 'closed',
  "Marge's Triple Lift": 'closed',
  "Harry's Dream Lift": 'open'
});

// Beaver leaves closing-day data up all summer: fetched 2026-08-05 the page
// still served that same 3/27/26 report with 3 of 6 lifts open. Read outside the
// freshness window it must report nothing rather than a half-open mountain.
test('beaver-mountain reports nothing once the report goes stale', async () => {
  globalThis.Date = pin('2026-08-05T12:00:00Z');
  try {
    const stale = await new Promise((res, rej) => {
      createReadStream(resolve(import.meta.dirname, 'example/beaver-mountain.html')).pipe(
        parser(parse, (e, v) => (e ? rej(e) : res(v)))
      );
    });
    assert.deepEqual(stale, {});
  } finally {
    globalThis.Date = Pinned;
  }
});
