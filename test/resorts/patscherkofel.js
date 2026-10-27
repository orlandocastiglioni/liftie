import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/patscherkofel/index.js';
import lifts from '../lifts/index.js';

// Intermaps Skigebietsmanager region_id=831, captured live 2026-10-27. The
// SKI plus CITY network page this area used to be read from dropped its
// #pisten_anlagen tables on 2026-09-22; see lib/resorts/patscherkofel/index.js.
lifts('patscherkofel', 'html', {
  'A Patscherkofelbahn Sektion I': 'open',
  'A Patscherkofelbahn Sektion II': 'open',
  'B Übungslift Patscherkofel': 'closed',
  'C Heiligwasserlift': 'closed',
  'D Zauberteppich': 'closed',
  'E Kinderlift': 'closed',
  'F Übungslift Igls': 'closed'
});

test('patscherkofel reportedAt', (_t, done) => {
  const html = readFileSync(resolve(import.meta.dirname, 'example/patscherkofel.html'), 'utf8');
  parseHtml(
    html,
    dom => parse(dom),
    (err, ls) => {
      assert.ifError(err);
      assert.equal(ls.reportedAt, '2026-10-25T15:33:12.000Z');
      assert.equal(Object.keys(ls).length, 7, 'the stamp must not count as a lift');
      done();
    }
  );
});
