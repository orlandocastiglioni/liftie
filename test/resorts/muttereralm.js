import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/muttereralm/index.js';
import lifts from '../lifts/index.js';

// Intermaps Skigebietsmanager region_id=862, captured live 2026-10-27. The
// SKI plus CITY network page this area used to be read from dropped its
// #pisten_anlagen tables on 2026-09-22; see lib/resorts/muttereralm/index.js.
lifts('muttereralm', 'html', {
  'A Muttereralmbahn': 'open',
  'B Götznerbahn': 'closed',
  'C Pfriemesköpfl': 'closed',
  'D Almbodenlift': 'closed',
  'E Zauberteppich': 'closed'
});

test('muttereralm reportedAt', (_t, done) => {
  const html = readFileSync(resolve(import.meta.dirname, 'example/muttereralm.html'), 'utf8');
  parseHtml(
    html,
    dom => parse(dom),
    (err, ls) => {
      assert.ifError(err);
      assert.equal(ls.reportedAt, '2026-10-26T11:00:23.000Z');
      assert.equal(Object.keys(ls).length, 5, 'the stamp must not count as a lift');
      done();
    }
  );
});
