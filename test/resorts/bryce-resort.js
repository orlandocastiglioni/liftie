import assert from 'node:assert/strict';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parser from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/bryce-resort/index.js';
import lifts from '../lifts/index.js';

// wayback capture of bryceresort.com/mountain-info/conditions from 2026-03-16
// (late season - the carpets advertise 'Re-opening 3/17', so every lift shows
// the red ClosedSymbols icon while half the ski trails are still open)
lifts('bryce-resort', 'html', {
  'Bunny Slope Carpet': 'closed',
  'Lift 3': 'closed',
  'Lift One': 'closed',
  'Lift Two': 'closed',
  'Little Nip Carpet': 'closed'
});

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
test('bryce-resort reports no lifts once the report goes stale', async () => {
  globalThis.Date = pin('2026-11-17T12:00:00Z');
  try {
    const stale = await new Promise((res, rej) => {
      createReadStream(resolve(import.meta.dirname, 'example/bryce-resort.html')).pipe(
        parser(parse, (e, v) => (e ? rej(e) : res(v)))
      );
    });
    assert.deepEqual(stale, {});
  } finally {
    globalThis.Date = Pinned;
  }
});
