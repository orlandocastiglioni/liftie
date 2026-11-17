import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseDocument } from 'htmlparser2';
import { lifts, piste, report, reportedAt, rows, status } from '../../lib/tools/infosnow-portal.js';

const fixture = name =>
  parseDocument(readFileSync(resolve(import.meta.dirname, `../resorts/example/${name}.html`), 'utf8'));

function row(state, title = 'Skipiste - rot', text = '12 • Zanuz <span>(1.2 km)</span>') {
  const html =
    `<div class="isRec"><img class="isIco" src="https://infosnow.ch/~apgmontagne/pub/pics/state/3/${state}.svg">` +
    `<img class="isIco" src="https://infosnow.ch/~apgmontagne/pub/pics/svg/color/14.svg" title="${title}">` +
    `<div class="isTxt">${text}</div></div>`;
  return parseDocument(html).children[0];
}

test('infosnow-portal: the state icon number is the status, never the word', () => {
  assert.equal(status(row(1)), 'open');
  assert.equal(status(row(2)), 'scheduled');
  assert.equal(status(row(3)), 'closed');
  // 0 = keine Meldung: nothing filed, which is not a claim that it is closed
  assert.equal(status(row(0)), 'scheduled');
});

test('infosnow-portal: piste name, grade and level', () => {
  assert.deepEqual(piste(row(1)), { name: '12 Zanuz', status: 'open', level: 'black', grade: 'rot' });
  assert.deepEqual(piste(row(3, 'Skipiste - gelb', '31 • Abfahrt Jona')), {
    name: '31 Abfahrt Jona',
    status: 'closed',
    level: undefined,
    grade: 'gelb'
  });
});

test('infosnow-portal: categories are read from the box id, whatever the area', () => {
  const doc = report(fixture('pizol'));
  assert.equal(rows(doc, 1).length, 12);
  assert.equal(rows(doc, 2).length, 38);
  // _1 must not also pick up _11 or _14 (lodging): every lift row is lettered A-L
  assert.equal(rows(doc, 14).length > 0, true);
  assert.equal(
    Object.keys(lifts(doc, [1])).every(n => /^[A-L] /.test(n)),
    true
  );
});

test('infosnow-portal: the header stamp is Zurich wall clock', () => {
  const doc = report(fixture('pizol'));
  // 'Status (17.11.2026 17:45 Uhr)' is CET, UTC+1
  assert.equal(reportedAt(doc), '2026-11-17T16:45:00.000Z');
  assert.equal(lifts(doc).reportedAt, '2026-11-17T16:45:00.000Z');
  assert.equal(Object.keys(lifts(doc)).length, 12, 'reportedAt is not enumerable');
});
