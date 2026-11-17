import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/whiteface/trails.js';
import collect from '../../lib/trails/parse.js';
import lifts from '../lifts/index.js';

// fixture: whiteface.com/mountain/conditions/ through FlareSolverr on
// 2026-11-17 (pre-season, snowmaking started, everything closed), trimmed to
// the orda-conditions lifts and trails reports. Pins the current plugin markup
// the shared lib/tools/orda.js parser reads.
lifts(
  'whiteface',
  'html',
  {
    'Cub Carpet': 'closed',
    'Coyote Carpet': 'closed',
    'Freeway': 'closed',
    'Little Whiteface': 'closed',
    'Lookout Mountain': 'closed',
    'Warhorse': 'closed',
    'Face Lift': 'closed',
    'Summit Quad': 'closed',
    'Falcon Flyer': 'closed',
    'The Notch': 'closed',
    'Cloudsplitter Gondola': 'closed',
    'Cloudsplitter Gondola Ride | Winter': 'closed'
  },
  { example: 'whiteface-2026-11' }
);

test('whiteface trails: 100 unique rows with a level each', (_t, done) => {
  const html = readFileSync(resolve(import.meta.dirname, 'example/whiteface-2026-11.html'), 'utf8');
  parseHtml(
    html,
    dom => collect(dom, parse),
    (err, list) => {
      assert.ifError(err);
      // 106 rows on the page; the beginner area repeats under two sectors
      assert.equal(list.length, 100);
      assert.equal(new Set(list.map(t => t.name)).size, 100);
      assert.ok(list.every(t => t.status === 'closed'));
      const levels = {};
      for (const { level } of list) {
        levels[level] = (levels[level] ?? 0) + 1;
      }
      assert.deepEqual(levels, { green: 26, blue: 44, black: 21, doubleBlack: 9 });
      assert.deepEqual(list[0], { name: 'Boreen', status: 'closed', level: 'green' });
      done();
    }
  );
});
