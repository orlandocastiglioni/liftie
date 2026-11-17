import assert from 'node:assert/strict';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parser from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/blue-hills-ski-area/index.js';
import trails from '../../lib/resorts/blue-hills-ski-area/trails.js';
import lifts from '../lifts/index.js';
import trailsTest from '../trails/index.js';

// Live capture 2026-11-17 (scripts stripped): the page still shows the
// 2026-03-15 closing-weekend report ("Lifts: 2 Trails: 4"). It is months past
// stale.js's window, so no rows publish - on any day after mid-2026.
lifts('blue-hills-ski-area', 'html', {}, { example: 'blue-hills-ski-area-stale' });
trailsTest('blue-hills-ski-area', [], { example: 'blue-hills-ski-area-stale' });

test('blue-hills-ski-area dates the report', (_t, done) => {
  const file = resolve(import.meta.dirname, 'example/blue-hills-ski-area-stale.html');
  createReadStream(file).pipe(
    parser(
      dom => ({ ls: parse(dom), list: trails(dom) }),
      (err, { ls, list }) => {
        assert.ifError(err);
        // "March 15, 2026", dated at noon Boston time
        assert.equal(ls.reportedAt, '2026-03-15T17:00:00.000Z');
        assert.equal(list.reportedAt, '2026-03-15T17:00:00.000Z');
        done();
      }
    )
  );
});
