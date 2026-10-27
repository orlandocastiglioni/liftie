import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/serlesbahnen/index.js';
import lifts from '../lifts/index.js';

// Intermaps Skigebietsmanager region_id=1060, captured live 2026-10-27. The
// SKI plus CITY network page this area used to be read from dropped its
// #pisten_anlagen tables on 2026-09-22; see lib/resorts/serlesbahnen/index.js.
lifts('serlesbahnen', 'html', {
  'Gondelbahn': 'open',
  'Kinderland Talstation': 'closed',
  'SL Lärchenlift': 'closed',
  'SL Ochsenhütte': 'closed',
  'SL Waldrasteck': 'closed'
});

test('serlesbahnen reportedAt', (_t, done) => {
  const html = readFileSync(resolve(import.meta.dirname, 'example/serlesbahnen.html'), 'utf8');
  parseHtml(
    html,
    dom => parse(dom),
    (err, ls) => {
      assert.ifError(err);
      assert.equal(ls.reportedAt, '2026-08-27T14:44:27.000Z');
      assert.equal(Object.keys(ls).length, 5, 'the stamp must not count as a lift');
      done();
    }
  );
});
