import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parse from '../../lib/resorts/strandafjellet/index.js';
import status from '../../lib/resorts/strandafjellet/status.js';
import lifts from '../lifts/index.js';

// api.fnugg.no/get/resort/21 as archived on 2021-01-09, mid winter and mixed:
// 4 of 7 lifts running, matching _source.lifts.open. Status is the string "1"
// / "0" and nothing else.
lifts('strandafjellet', 'json', {
  'Roaldsheisa': 'closed',
  'Roaldshorn fjelltrekk': 'closed',
  'Fursetheisa': 'open',
  'Egga fjelltrekk': 'open',
  'Fursettrekket': 'open',
  'Snøkvit': 'open',
  'Bandet': 'closed'
});

// the live document, fetched 6 Aug 2026: Norway is out of season
// (resort_open false, season opens 5 Dec) so every lift reads "0" - the value
// coerce.js has no key for. Without status.js all seven would publish as
// 'scheduled'.
lifts(
  'strandafjellet',
  'json',
  {
    'Roaldsheisa': 'closed',
    'Roaldshorn fjelltrekk': 'closed',
    'Fursetheisa': 'closed',
    'Egga fjelltrekk': 'closed',
    'Fursettrekket': 'closed',
    'Snøkvit': 'closed',
    'Bandet': 'closed'
  },
  { example: 'strandafjellet-summer' }
);

function example(name) {
  return JSON.parse(readFileSync(resolve(import.meta.dirname, `example/${name}.json`), 'utf8'));
}

test('strandafjellet status vocabulary', () => {
  assert.equal(status('1'), 'open');
  assert.equal(status('0'), 'closed');
  // anything else is handed on untranslated so coerce logs it
  assert.equal(status('2'), '2');
  assert.equal(status(undefined), undefined);
});

test('strandafjellet reportedAt is the staff report, not the reindex', () => {
  // _source.last_updated on the live document is 2026-08-06T12:10:35Z, minutes
  // before the fetch, for a board that was frozen in April - publishing that
  // would date a four month old report as "just now"
  const summer = example('strandafjellet-summer');
  assert.equal(summer._source.last_updated, '2026-08-06T12:10:35Z');
  const ls = parse(summer);
  assert.equal(ls.reportedAt, '2026-04-21T08:29:40.000Z');
  // and it is metadata, not an eighth lift
  assert.equal(Object.keys(ls).length, 7);

  assert.equal(parse(example('strandafjellet')).reportedAt, '2021-01-08T07:45:37.000Z');
  // no conditions block at all: no date rather than an invented one
  assert.equal(parse({ _source: { lifts: { list: [] } } }).reportedAt, undefined);
});
