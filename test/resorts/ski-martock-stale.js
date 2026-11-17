import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import lifts from '../../lib/resorts/ski-martock/index.js';
import trailRows from '../../lib/resorts/ski-martock/trails.js';
import collect from '../../lib/trails/parse.js';

// The real operations.php answer of 2026-11-17: everything closed, tubing
// separate, and the operations state last edited ('updated') on 2026-10-01.
const data = JSON.parse(readFileSync(resolve(import.meta.dirname, 'example/ski-martock.json'), 'utf8'));

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

test('ski-martock: a fresh state publishes every lift and trail, tubing left out', () => {
  at('2026-10-02T12:00:00Z', () => {
    const ls = lifts(data);
    assert.deepEqual(Object.keys(ls), ['Quad Chair', 'T-Bar', 'T-Bar ½ Way Unload', 'Magic Carpet']);
    assert.equal(ls.reportedAt, '2026-10-01T16:38:30.000Z');
    assert.equal(collect(data, trailRows).length, 13);
  });
});

test('ski-martock: a state untouched for more than the stale window publishes nothing', () => {
  at('2026-11-17T22:00:00Z', () => {
    assert.deepEqual(lifts(data), {});
    assert.deepEqual(collect(data, trailRows), []);
  });
});
