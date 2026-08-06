import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parse from '../../lib/resorts/norefjell/index.js';
import status from '../../lib/resorts/norefjell/status.js';
import lifts from '../lifts/index.js';

// api.fnugg.no/get/resort/6, fetched live on 6 Aug 2026. Norway is out of
// season (resort_open false, closing date 12 Apr) so all 15 lifts read status
// "0" - and "0" is exactly the value coerce.js has no key for, so this fixture
// is the direct regression test for the trap: without status.js every one of
// these would publish as 'scheduled'. The API has no Wayback captures at all,
// so an in-season capture is not obtainable; the "1" -> open half of the
// vocabulary is covered by the unit test below instead.
lifts('norefjell', 'json', {
  'Norefjellheisen (A)': 'closed',
  'Vinkelheisen (B)': 'closed',
  'Turistheisen (C)': 'closed',
  'Tilbringerheisen (D)': 'closed',
  'Fjellheisen (E)': 'closed',
  'Tosetern (F)': 'closed',
  'Fjellekspressen (G)': 'closed',
  'Ravnåsheisen (H)': 'closed',
  'Storebelte (I1)': 'closed',
  'Lillebelte (I2)': 'closed',
  'Bøseterheisen (J)': 'closed',
  'Olaheisen (K)': 'closed',
  'Nedre Bøseterheis (L)': 'closed',
  'Hotellheisen (M)': 'closed',
  'Myggen (N)': 'closed'
});

// The full status vocabulary, which is provably just these two strings across
// the whole Fnugg platform. Asserted directly because no in-season payload can
// be archived for this feed.
test('norefjell should translate the fnugg 0/1 status strings', () => {
  assert.equal(status('1'), 'open');
  assert.equal(status('0'), 'closed');
  // anything new is handed to coerce untouched, so it gets logged rather than
  // silently guessed at
  assert.equal(status('2'), '2');
});

// The roster is frozen at whatever the resort last filed, so the date on that
// report is the only way to tell this from a live all-closed morning. It must
// stay non-enumerable or stats() would count it as a sixteenth lift.
test('norefjell should date the report from the resort report stamp', () => {
  const body = JSON.parse(readFileSync(resolve(import.meta.dirname, 'example/norefjell.json'), 'utf8'));
  const ls = parse(body);
  assert.equal(ls.reportedAt, '2026-04-22T08:09:32.000Z');
  assert.equal(Object.keys(ls).length, 15);
});
