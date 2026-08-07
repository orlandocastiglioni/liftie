import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseDocument } from 'htmlparser2';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/hohsaas/index.js';
import { status } from '../../lib/resorts/hohsaas/report.js';
import lifts from '../lifts/index.js';

/*
 * The infosnow ajax envelope for e=206 (Saas-Grund & Saas-Balen) with saison=1,
 * which serves the WINTER roster all year - so this August capture still holds
 * the full nine lift, thirteen piste winter board, with the three gondola
 * sections running for summer walkers and the six snow lifts shut. That mix is
 * what makes it worth asserting: the row alt text says 'offen', a word coerce
 * does not know, so a parser reading the word instead of the state icon would
 * publish all three open lifts as 'scheduled'.
 */
lifts('hohsaas', 'html', {
  'Kreuzboden - Hohsaas': 'open',
  'Saas-Grund - Kreuzboden': 'open',
  'Zwischenstation Trift': 'open',
  Kreuzboden: 'closed',
  'Förderband Kinderland': 'closed',
  'Sandiger Boden': 'closed',
  'Förderband Pipo': 'closed',
  'Ziebel (Dorflift)': 'closed',
  'Bodu (Saas-Balen)': 'closed'
});

test('hohsaas reportedAt', (_t, done) => {
  const html = readFileSync(resolve(import.meta.dirname, 'example/hohsaas.html'), 'utf8');
  parseHtml(
    html,
    dom => parse(dom),
    (err, ls) => {
      assert.ifError(err);
      // 'Status (07.08.2026 05:16 Uhr)', Europe/Zurich wall clock (CEST in August)
      assert.equal(ls.reportedAt, '2026-08-07T03:16:00.000Z');
      // and it must not count as a tenth lift
      assert.equal(Object.keys(ls).length, 9);
      done();
    }
  );
});

// The full state vocabulary, which one capture cannot show: the fixture has
// only 1 (offen), 3 (geschlossen) and 0 (keine Meldung). 2 is 'in Vorbereitung'
// and is a real, recurring state here - the operator's own Feb-2026 page had
// the Ziebel village tow in it. None of the four words is known to coerce, so
// the icon number is the whole contract.
test('hohsaas status comes from the state icon, not the word', () => {
  const row = n =>
    parseDocument(
      `<div class="isRec">
         <img class="isIco" src="https://infosnow.ch/~apgmontagne/pub/pics/state/3/${n}.svg" alt="offen" title="offen" />
         <img class="isIco" src="https://infosnow.ch/~apgmontagne/pub/pics/svg/color/2.svg" alt="Skilift" title="Skilift" />
         <div class="isTxt">Kreuzboden</div>
       </div>`
    ).children;
  assert.equal(status(row(1)), 'open');
  assert.equal(status(row(2)), 'scheduled');
  assert.equal(status(row(3)), 'closed');
  // 'keine Meldung' - nothing filed. Unknown, never an invented 'closed'.
  assert.equal(status(row(0)), 'scheduled');
  // a state the platform does not currently emit: no status rather than a guess
  assert.equal(status(row(9)), undefined);
});
