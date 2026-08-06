import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parse from '../../lib/resorts/riksgransen/index.js';
import lifts from '../lifts/index.js';

// admin-ajax action=track_data, fetched live on 6 Aug 2026. Riksgränsen's
// season is February to June (midnight-sun skiing), and the board is frozen at
// the last report of 19 June rather than emptied, so this "off season" payload
// is genuinely mixed: Nedre stolliften still 'Öppen', matching the feed's own
// liftsOpen counter of '1 / 6'.
//
// The other five are 'Stängt' with a second gray patrol badge -
// 'Väderförhållanden' on four, 'Tekniska svårigheter' on Övre stolliften -
// which is a temporary stoppage rather than a seasonal closure, so they report
// hold. That second badge must never reach coerce as a status. The page itself
// cannot be scraped for any of this: it ships only spinners, and even the
// in-season Wayback capture has no badge text.
lifts('riksgransen', 'json', {
  'Katterjåkksliften': 'hold',
  'Nedre stolliften': 'open',
  'Nordalsliften': 'hold',
  'Övre stolliften': 'hold',
  'Solliften': 'hold',
  'Vinkelliften': 'hold'
});

// The 19 June stamp is the whole point of dating this feed - without it a
// frozen June board is indistinguishable from a live January morning, and
// January is out of season here. Must stay non-enumerable so stats() does not
// count it as a seventh lift.
test('riksgransen should date the report from liftsUpdated', () => {
  const body = JSON.parse(readFileSync(resolve(import.meta.dirname, 'example/riksgransen.json'), 'utf8'));
  const ls = parse(body);
  // "Uppdaterade hissar: 19 Juni 2026, 09:37", Europe/Stockholm
  assert.equal(ls.reportedAt, '2026-06-19T08:37:00.000Z');
  assert.equal(Object.keys(ls).length, 6);
});
