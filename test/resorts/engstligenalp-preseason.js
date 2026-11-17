import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import lifts from '../../lib/resorts/engstligenalp/index.js';
import trailRows from '../../lib/resorts/engstligenalp/trails.js';
import collect from '../../lib/trails/parse.js';

const load = name => JSON.parse(readFileSync(resolve(import.meta.dirname, `example/${name}.json`), 'utf8'));

function at(when, fn) {
  const RealDate = Date;
  globalThis.Date = class extends RealDate {
    constructor(...args) {
      super(...(args.length ? args : [when]));
    }
    static now() {
      return RealDate.parse(when);
    }
  };
  try {
    return fn();
  } finally {
    globalThis.Date = RealDate;
  }
}

// Live export of 2026-11-17 04:01 (autumn cable-car season, no skiing): every
// lift StatusID 16 and every run 15 - both closed ids in the page's legend.
test('engstligenalp pre-season export: everything closed, and dated', () => {
  at('2026-11-17T12:00:00Z', () => {
    const data = load('engstligenalp-preseason');
    const ls = lifts(data);
    assert.equal(Object.keys(ls).length, 8);
    assert.ok(Object.values(ls).every(s => s === 'closed'));
    assert.equal(ls.reportedAt, '2026-11-17T03:01:00.000Z');
    const ts = collect(data, trailRows);
    assert.equal(ts.length, 11);
    assert.ok(ts.every(t => t.status === 'closed'));
  });
});

// The February export read in November is 266 days old: no rows at all, never
// a board of "closed" claims.
test('engstligenalp: a season-old export publishes nothing', () => {
  at('2026-11-17T12:00:00Z', () => {
    const data = load('engstligenalp');
    assert.deepEqual(lifts(data), {});
    assert.deepEqual(collect(data, trailRows), []);
  });
});
