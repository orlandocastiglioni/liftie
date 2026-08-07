import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parse from '../../lib/resorts/glungezer/index.js';
import lifts from '../lifts/index.js';

// winter.intermaps.com/glungezer/data?lang=en, captured live 2026-08-07. The
// feed is never emptied out of season - all six lifts are still listed, with
// the cable car and the Kombilift running for summer sightseeing - which is
// why the stamp below matters.
lifts('glungezer', 'json', {
  'D DSB Schartenkogellift': 'closed',
  'E Halsmarterlift': 'closed',
  'G Halsmarter-Express': 'closed',
  'F Übungslift': 'closed',
  'A 10 EUB- Glungezer I': 'open',
  'B Kombilift Glungezer Sektion 2': 'open'
});

test('glungezer reportedAt', () => {
  const body = JSON.parse(readFileSync(resolve(import.meta.dirname, 'example/glungezer.json'), 'utf8'));
  const ls = parse(body);
  // lastUpdate '2026-08-07T04:08:42', a naive Europe/Vienna wall clock (CEST)
  assert.equal(ls.reportedAt, '2026-08-07T02:08:42.000Z');
  // and it must not count as a seventh lift
  assert.equal(Object.keys(ls).length, 6);
});
