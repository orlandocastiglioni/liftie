import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/kuehtai/index.js';
import lifts from '../lifts/index.js';

// Intermaps Skigebietsmanager region_id=860, captured live 2026-10-27. The
// SKI plus CITY network page this area used to be read from dropped its
// #pisten_anlagen tables on 2026-09-22; see lib/resorts/kuehtai/index.js.
lifts('kuehtai', 'html', {
  'Alpenrosenlift': 'closed',
  'DreiSeenBahn': 'closed',
  'GaisKogelBahn': 'closed',
  'HochAlterBahn': 'closed',
  'HoheMutBahn': 'closed',
  'KaiserBahn': 'closed',
  'KühTeppich': 'closed',
  'Schwarzmooslift': 'closed',
  'Sonnenlift': 'closed',
  'StartBahn': 'closed',
  'Wiesbergbahn': 'closed',
  'Wunderteppich': 'closed'
});

test('kuehtai reportedAt', (_t, done) => {
  const html = readFileSync(resolve(import.meta.dirname, 'example/kuehtai.html'), 'utf8');
  parseHtml(
    html,
    dom => parse(dom),
    (err, ls) => {
      assert.ifError(err);
      assert.equal(ls.reportedAt, '2026-09-24T10:54:33.000Z');
      assert.equal(Object.keys(ls).length, 12, 'the stamp must not count as a lift');
      done();
    }
  );
});
