import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/axamer-lizum/index.js';
import lifts from '../lifts/index.js';

// Intermaps Skigebietsmanager region_id=837, captured live 2026-10-27. The
// SKI plus CITY network page this area used to be read from dropped its
// #pisten_anlagen tables on 2026-09-22; see lib/resorts/axamer-lizum/index.js.
lifts('axamer-lizum', 'html', {
  'Birgitzköpfl': 'closed',
  'Götzner Grube': 'closed',
  'Hoadlbahn I': 'closed',
  'Hoadlbahn II': 'closed',
  'Karleiten': 'closed',
  'Kaserwald I': 'closed',
  'Olympiabahn': 'closed',
  'Pleisen': 'closed',
  'Talbodenlift': 'closed'
});

test('axamer-lizum reportedAt', (_t, done) => {
  const html = readFileSync(resolve(import.meta.dirname, 'example/axamer-lizum.html'), 'utf8');
  parseHtml(
    html,
    dom => parse(dom),
    (err, ls) => {
      assert.ifError(err);
      assert.equal(ls.reportedAt, '2026-10-21T00:36:08.000Z');
      assert.equal(Object.keys(ls).length, 9, 'the stamp must not count as a lift');
      done();
    }
  );
});
