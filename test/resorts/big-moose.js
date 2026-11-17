import assert from 'node:assert/strict';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parser from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/big-moose/index.js';
import lifts from '../lifts/index.js';

lifts('big-moose', 'html', {
  'Triple Chair': 'open',
  'Beginner Conveyor': 'closed'
});

// The parser drops a report older than 45 days (lib/tools/stale.js), so the
// clock is pinned to just after the fixture's own stamp ("Last Updated : 03/28/26"). `node --test`
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
const Pinned = pin('2026-03-29T12:00:00Z');
globalThis.Date = Pinned;

// On 2026-11-17 the live page still served this same 03/28/26 report (Triple Chair
// OPEN, 6 runs open); read outside the window it must publish nothing.
test('big-moose reports no lifts once the report goes stale', async () => {
  globalThis.Date = pin('2026-11-17T12:00:00Z');
  try {
    const stale = await new Promise((res, rej) => {
      createReadStream(resolve(import.meta.dirname, 'example/big-moose.html')).pipe(
        parser(parse, (e, v) => (e ? rej(e) : res(v)))
      );
    });
    assert.deepEqual(stale, {});
  } finally {
    globalThis.Date = Pinned;
  }
});
