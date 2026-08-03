import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/tools/nordic-pulse.js';
import collect from '../../lib/trails/parse.js';

// shared parser for every nordic-pulse.com area (rikert, manning-park-xc,
// and the expansion nordic clubs). The 403 data-npww feed is server-rendered
// into script#ng-state on the ?embed=true page; we read it back from there.
const fixture = resolve(import.meta.dirname, '../resorts/example/nordic-pulse-embed.html');

test('nordic-pulse: extracts trails from the ng-state data-npww blob', (_t, done) => {
  const html = readFileSync(fixture, 'utf8');
  parseHtml(
    html,
    dom => collect(dom, parse),
    (err, list) => {
      assert.ifError(err);
      assert.deepEqual(list, [
        { name: 'Meadow Loop', status: 'open', level: 'green' },
        { name: 'River Run', status: 'closed', level: 'blue' },
        { name: 'Summit Trail', status: 'hold', level: 'black' },
        { name: 'Expert Glade', status: 'open', level: 'doubleBlack' }
      ]);
      done();
    }
  );
});

test('nordic-pulse: no ng-state yields an empty list, not a throw', (_t, done) => {
  parseHtml(
    '<html><body>nope</body></html>',
    dom => collect(dom, parse),
    (err, list) => {
      assert.ifError(err);
      assert.deepEqual(list, []);
      done();
    }
  );
});
