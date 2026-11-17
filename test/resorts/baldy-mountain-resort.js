import assert from 'node:assert/strict';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parser from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/baldy-mountain-resort/index.js';
import lifts from '../lifts/index.js';

// Baldy has no per-lift status field; each lift's open/closed is inferred from
// whether any of its grouped runs is open (see lib/resorts/baldy-mountain-resort/rows.js).
// Fixture: raw Jan-17-2026 winter wayback snapshot of /baldy-weather-cams/.
lifts('baldy-mountain-resort', 'html', {
  'Eagle Chair': 'open',
  'Sugarlump Quad': 'open',
  'Magic Carpet': 'open'
});

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
test('baldy-mountain-resort reports no lifts once the report goes stale', async () => {
  globalThis.Date = pin('2026-11-17T12:00:00Z');
  try {
    const stale = await new Promise((res, rej) => {
      createReadStream(resolve(import.meta.dirname, 'example/baldy-mountain-resort.html')).pipe(
        parser(parse, (e, v) => (e ? rej(e) : res(v)))
      );
    });
    assert.deepEqual(stale, {});
  } finally {
    globalThis.Date = Pinned;
  }
});
