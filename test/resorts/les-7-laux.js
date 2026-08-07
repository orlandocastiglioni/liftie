import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseDocument } from 'htmlparser2';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/les-7-laux/index.js';
import { status } from '../../lib/resorts/les-7-laux/rows.js';
import lifts from '../lifts/index.js';

/*
 * The Lumiplan bulletin as archived on 2026-03-05, mid season: all 22 lifts
 * across Prapoutel, Le Pleynet and Pipay, 21 of them running.
 *
 * Two things this pins down. Names come from .prl_name .text - the row's
 * title='…' attribute is single quoted and unescaped, so reading it would
 * truncate "TK P'tits Loups" to "TK P". And the lift/piste split comes from the
 * 'Remontées Mécaniques' heading above each block, which is the only thing that
 * distinguishes a lift row from a piste row: the rows themselves are identical.
 */
lifts('les-7-laux', 'html', {
  'TSDC Grand Cerf': 'open',
  'TSF Eterlou': 'open',
  'TK Blanchons': 'open',
  'TK Marcassins': 'open',
  'TSD Aigle': 'open',
  'TSD Oursière': 'open',
  'TSF Pincerie': 'open',
  'TK Ecureuil': 'open',
  'TK Loups': 'open',
  'TK Soleil': 'open',
  'TK Tétras': 'open',
  'Tapis Pleynet': 'open',
  'TSD Bouquetins': 'open',
  'TSD Chamois': 'open',
  'TSD Gypaète': 'open',
  'TSF Lac': 'open',
  'TK Ardoisière': 'closed',
  'TK Lac': 'open',
  'TK Marmottons': 'open',
  "TK P'tits Loups": 'open',
  'TK Piscine': 'open',
  'TK Plan': 'open'
});

test('les-7-laux reportedAt', (_t, done) => {
  const html = readFileSync(resolve(import.meta.dirname, 'example/les-7-laux.html'), 'utf8');
  parseHtml(
    html,
    dom => parse(dom),
    (err, ls) => {
      assert.ifError(err);
      // 'Mise à jour le 05/03/2026 à 17:07', Europe/Paris wall clock (CET)
      assert.equal(ls.reportedAt, '2026-03-05T16:07:00.000Z');
      // and it must not count as a 23rd lift
      assert.equal(Object.keys(ls).length, 22);
      done();
    }
  );
});

// The full état vocabulary from the page's own #tooltip_prl legend. Only O, F
// and P occur in this capture; HP ('Hors période') is what Lumiplan emits for
// an out-of-season asset and is the one code coerce.js does not know - left to
// it, a closed-for-the-summer lift would publish as 'scheduled'.
test('les-7-laux status maps the Lumiplan état codes', () => {
  const row = code =>
    parseDocument(
      `<div class="col-lg-6 col-12 prl_group">
         <div class="col-lg-1 col-1 status"><img src="image/etats/${code}.svg" class="image_status"></div>
       </div>`
    ).children;
  assert.equal(status(row('O')), 'open');
  assert.equal(status(row('F')), 'closed');
  assert.equal(status(row('P')), 'scheduled');
  assert.equal(status(row('HP')), 'closed');
  // an unknown code is passed through raw for coerce to reject and log rather
  // than being guessed at here
  assert.equal(status(row('ZZ')), 'ZZ');
});
