import assert from 'node:assert/strict';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parserStream from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/leukerbad-torrent/index.js';
import lifts from '../lifts/index.js';

// The fixture is the infosnow p=135 payload with saison=1, which serves the
// complete winter roster all year - so the seven lifts are all present in
// August, three of them 'in Vorbereitung' (state 2) and four 'ausser Betrieb'
// (state 3). infosnow's ajax endpoint has never been archived, so there is no
// in-season capture; the states test below covers the codes that only appear
// once the resort is running, including 1 = offen.
lifts('leukerbad-torrent', 'html', {
  'A Leukerbad - Rinderhütte': 'scheduled',
  'B Flaschen - Torrentalp': 'scheduled',
  'C Torrentalp - Rinderhütte': 'scheduled',
  'D Schwalbennest': 'closed',
  'E Kumme': 'closed',
  'F Rinderhalde': 'closed',
  'I Rinderhütte Kinderland': 'closed'
});

// the same envelope infosnow serves: an XML/CDATA wrapper around javascript
// that concatenates the report's HTML
function payload(...rows) {
  const html = [
    '<div class="isBox"><div class="isBreakBox">',
    '<div class="isH1"><img class="isH1Ico" src="/pub/pics/svg/white/anlage.svg">Anlagen (1/4 offen)</div>',
    `<div class="isCBox"><div class="isC">${rows.join('')}</div></div>`,
    '</div></div>',
    '<div class="isF"><div class="isD">Letzte Änderung: 07.02.2026 08:30 Uhr</div></div>'
  ].join('');
  return `<?xml version="1.0" encoding="UTF-8"?><Envelope><Body><script><![CDATA[var sb=[];sb[sb.length]='${html}';]]></script></Body></Envelope>`;
}

function lift(state, word, name) {
  return [
    '<div class="isRec">',
    `<img class="isIco" src="https://infosnow.ch/~apgmontagne/pub/pics/state/3/${state}.svg" alt="${word}" title="${word}" />`,
    '<img class="isIco" src="https://infosnow.ch/~apgmontagne/pub/pics/svg/color/10.svg" alt="Luftseilbahn" title="Luftseilbahn"/>',
    `<div class="isTxt">${name}</div><div class="isClear"></div>`,
    '</div>'
  ].join('');
}

function run(html, fn) {
  const stream = parserStream(parse, fn);
  stream.write(html);
  stream.end();
}

// Of the four German words below only 'geschlossen' is in coerce.js, so a
// parser reading the word instead of the state icon number would publish the
// open lift as 'scheduled'.
test('leukerbad-torrent should read the state icon, not the German word', (_t, done) => {
  const html = payload(
    lift(1, 'offen', 'A • Leukerbad - Rinderhütte'),
    lift(2, 'in Vorbereitung', 'B • Flaschen - Torrentalp'),
    lift(3, 'ausser Betrieb', 'C • Torrentalp - Rinderhütte'),
    lift(0, 'keine Meldung', 'D • Schwalbennest')
  );
  run(html, (err, status) => {
    assert.ifError(err);
    assert.deepEqual(status, {
      'A Leukerbad - Rinderhütte': 'open',
      'B Flaschen - Torrentalp': 'scheduled',
      'C Torrentalp - Rinderhütte': 'closed',
      'D Schwalbennest': 'scheduled'
    });
    // 'Letzte Änderung: 07.02.2026 08:30 Uhr', dd.mm.yyyy in Europe/Zurich - a
    // winter stamp, so CET (+01:00) rather than the fixture's summer CEST
    assert.equal(status.reportedAt, '2026-02-07T07:30:00.000Z');
    done();
  });
});

test('leukerbad-torrent should publish the report timestamp', (_t, done) => {
  const filename = resolve(import.meta.dirname, 'example/leukerbad-torrent.html');
  createReadStream(filename).pipe(
    parserStream(parse, (err, status) => {
      assert.ifError(err);
      // 'Letzte Änderung: 07.08.2026 05:15 Uhr' in Europe/Zurich (CEST, +02:00)
      assert.equal(status.reportedAt, '2026-08-07T03:15:00.000Z');
      done();
    })
  );
});
