import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/rangger-koepfl/index.js';
import lifts from '../lifts/index.js';

// Intermaps Skigebietsmanager region_id=1000, captured live 2026-08-07. The
// board is not emptied out of season: all five lifts are still listed and the
// two Peter-Anich-Bahn sections run for summer sightseeing. Status is an icon
// filename - 169.png open, 94.png closed - and a parser that handed those
// numbers to coerce would read them as 'scheduled', or worse invert them
// ('1' is open there and '3' is closed).
lifts('rangger-koepfl', 'html', {
  'Egghof Tellerlift': 'closed',
  'Peter-Anich-Bahn I': 'open',
  'Peter-Anich-Bahn II': 'open',
  'Peter-Anich-Bahn III': 'closed',
  'Zauberteppich Stiglreith': 'closed'
});

test('rangger-koepfl reportedAt', (_t, done) => {
  const html = readFileSync(resolve(import.meta.dirname, 'example/rangger-koepfl.html'), 'utf8');
  parseHtml(
    html,
    dom => parse(dom),
    (err, ls) => {
      assert.ifError(err);
      // masthead 'Last Update: 04 August 2026 19:02:47', Europe/Vienna wall
      // clock (CEST in August) - three days stale when captured, which is the
      // whole reason to publish it
      assert.equal(ls.reportedAt, '2026-08-04T17:02:47.000Z');
      // and it must not count as a sixth lift
      assert.equal(Object.keys(ls).length, 5);
      done();
    }
  );
});
