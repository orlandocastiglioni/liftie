import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/nordkette/index.js';
import lifts from '../lifts/index.js';

// Intermaps Skigebietsmanager region_id=864, captured live 2026-10-27. The
// SKI plus CITY network page this area used to be read from dropped its
// #pisten_anlagen tables on 2026-09-22; see lib/resorts/nordkette/index.js.
lifts('nordkette', 'html', {
  'A Sektion I Hungerburg': 'closed',
  'B Sektion II Seegrube': 'closed',
  'C Sektion III Hafelekar': 'closed',
  'D Seegrube': 'closed',
  'E Frau - Hitt - Warte': 'closed',
  'Zauberteppich': 'closed'
});

test('nordkette reportedAt', (_t, done) => {
  const html = readFileSync(resolve(import.meta.dirname, 'example/nordkette.html'), 'utf8');
  parseHtml(
    html,
    dom => parse(dom),
    (err, ls) => {
      assert.ifError(err);
      assert.equal(ls.reportedAt, '2026-10-27T18:18:14.000Z');
      assert.equal(Object.keys(ls).length, 6, 'the stamp must not count as a lift');
      done();
    }
  );
});
