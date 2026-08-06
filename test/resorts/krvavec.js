import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parse from '../../lib/resorts/krvavec/index.js';
import reportedAt from '../../lib/resorts/krvavec/reported-at.js';
import lifts from '../lifts/index.js';

// /krvavec-data.json as archived on 2025-11-30, opening weekend and the only
// capture that carries both states: 5 of 13 lifts open, which is exactly what
// the file's own counter entry reads. Every open cell shows operating hours
// ('08:00-17:00') or a bare '-' and only the closed ones say 'Zaprto', so the
// open/close icon is the status.
lifts('krvavec', 'json', {
  'Krožna kabinska žičnica': 'open',
  'Štirisedežnica Tiha dolina': 'open',
  'Šestsedežnica Vrh Krvavca': 'closed',
  'Dvosedežnica Njivice 1': 'open',
  'Dvosedežnica Njivice 2': 'closed',
  'Šestsedežnica Zvoh': 'open',
  'Dvosedežnica Kriška Planina': 'closed',
  'Enosedežnica Gospinca': 'closed',
  'Vlečnica Luža': 'open',
  'Vlečnica Kržišče 1': 'closed',
  'Vlečnica Kržišče 2': 'closed',
  'Otroški trak Gospinca': 'closed',
  'Otroški trak Kriška Planina': 'closed'
});

// the live summer file: the board is not emptied out of season, it freezes -
// same 13 lifts, all 'Zaprto', still stamped July. Note the roster is renamed
// between seasons (Zvoh gained a sponsor, Kržišče 1/2 became A/B).
lifts(
  'krvavec',
  'json',
  {
    'Krožna kabinska žičnica': 'closed',
    'Štirisedežnica Tiha dolina': 'closed',
    'Šestsedežnica Vrh Krvavca': 'closed',
    'Dvosedežnica Njivice 1': 'closed',
    'Dvosedežnica Njivice 2': 'closed',
    'Šestsedežnica OTP banka Zvoh': 'closed',
    'Dvosedežnica Kriška Planina': 'closed',
    'Enosedežnica Gospinca': 'closed',
    'Vlečnica Luža': 'closed',
    'Vlečnica Kržišče A': 'closed',
    'Vlečnica Kržišče B': 'closed',
    'Otroški trak Gospinca': 'closed',
    'Otroški trak Kriška Planina': 'closed'
  },
  { example: 'krvavec-summer' }
);

function example(name) {
  return JSON.parse(readFileSync(resolve(import.meta.dirname, `example/${name}.json`), 'utf8'));
}

test('krvavec reportedAt', () => {
  // the stamp is what separates a frozen July board from a fresh all-closed
  // morning, and it must not count as a lift
  const summer = parse(example('krvavec-summer'));
  assert.equal(summer.reportedAt, '2026-07-22T11:19:00.000Z');
  assert.equal(Object.keys(summer).length, 13);
  assert.equal(parse(example('krvavec')).reportedAt, '2025-11-30T11:01:00.000Z');

  // Slovenian month abbreviations, CET
  assert.equal(reportedAt('30. nov 2025, 12:01'), '2025-11-30T11:01:00.000Z');
  assert.equal(reportedAt('1. maj 2026, 9:05'), '2026-05-01T08:05:00.000Z');
  assert.equal(reportedAt('5. avg 2026, 12:19'), '2026-08-05T11:19:00.000Z');
  // no stamp, or a month word this page never emits: no date rather than a
  // made up one
  assert.equal(reportedAt('22. july 2026, 12:19'), undefined);
  assert.equal(reportedAt(), undefined);
});

test('krvavec status comes from the icon, not the text', async () => {
  const { status } = await import('../../lib/resorts/krvavec/rows.js');
  assert.equal(status('08:00-17:00 <img src="assets/img/open.png">'), 'open');
  assert.equal(status('- <img src="assets/img/open.png">'), 'open');
  assert.equal(status('Zaprto <img src="assets/img/close.png">'), 'closed');
  // fallbacks for the day the icons change: the words are mapped, an hour
  // range is not a status and is left for coerce to reject
  assert.equal(status('Zaprto'), 'closed');
  assert.equal(status('Odprto'), 'open');
  assert.equal(status('08:00-17:00'), '08:00-17:00');
});
