import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/walmendingerhorn/index.js';
import lifts from '../lifts/index.js';

/*
 * /skigebiete/status-anlagen-pisten-wege/ as archived on 2026-02-10, midwinter.
 * One page carries all six Oberstdorf Kleinwalsertal sectors - 46 lifts, 98
 * pistes - and this parser must return only the six rows tagged
 * data-berg="walmendingerhorn". All six read 'in Betrieb', a word coerce.js
 * does not know: without the local mapping every one would publish 'scheduled'.
 */
lifts('walmendingerhorn', 'html', {
  Wildentallift: 'open',
  Walmendingerhornbahn: 'open',
  'Doppelsessellift Walmendingerhorn': 'open',
  Muttelberg: 'open',
  Jedermannlift: 'open',
  Mooslift: 'open'
});

test('walmendingerhorn reportedAt', (_t, done) => {
  const html = readFileSync(resolve(import.meta.dirname, 'example/walmendingerhorn.html'), 'utf8');
  parseHtml(
    html,
    dom => parse(dom),
    (err, ls) => {
      assert.ifError(err);
      // 'Live-Status: 10.02.2026 09:54:44' in div.infotext.walmendingerhorn,
      // Europe/Vienna wall clock (CET in February)
      assert.equal(ls.reportedAt, '2026-02-10T08:54:44.000Z');
      // and it must not count as a seventh lift
      assert.equal(Object.keys(ls).length, 6);
      done();
    }
  );
});
