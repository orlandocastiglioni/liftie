import assert from 'node:assert/strict';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parser from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/cherry-peak/index.js';
import lifts from '../lifts/index.js';

// all four lifts, matching the page's own "LIFTS OPEN 3 of 4" counter. The
// fixture is the live page: out of season Cherry Peak keeps serving the last
// winter report verbatim, so it already has a mixed open/closed sample.
lifts('cherry-peak', 'html', {
  'Little Bit': 'open',
  Gateway: 'open',
  Vista: 'open',
  Summit: 'closed'
});

// The parser drops a report older than 45 days (lib/tools/stale.js), so the
// clock is pinned to just after the fixture's own stamp (newest Wix _updatedDate 2026-03-07T15:15Z). `node --test`
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
const Pinned = pin('2026-03-08T12:00:00Z');
globalThis.Date = Pinned;

// On 2026-11-17 the live page still served this same report (3 of 4 lifts,
// 19 of 38 trails open); read outside the window it must publish nothing.
test('cherry-peak reports no lifts once the report goes stale', async () => {
  globalThis.Date = pin('2026-11-17T12:00:00Z');
  try {
    const stale = await new Promise((res, rej) => {
      createReadStream(resolve(import.meta.dirname, 'example/cherry-peak.html')).pipe(
        parser(parse, (e, v) => (e ? rej(e) : res(v)))
      );
    });
    assert.deepEqual(stale, {});
  } finally {
    globalThis.Date = Pinned;
  }
});
