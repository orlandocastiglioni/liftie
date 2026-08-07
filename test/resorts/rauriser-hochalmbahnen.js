import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parse from '../../lib/resorts/rauriser-hochalmbahnen/index.js';
import status from '../../lib/resorts/rauriser-hochalmbahnen/status.js';
import coerce from '../../lib/tools/coerce.js';
import lifts from '../lifts/index.js';

// winter.intermaps.com has never been archived by the Wayback Machine, so the
// fixture is a live August capture: the roster is complete year-round (the
// resort keeps all ten lifts on the board) but only the summer sightseeing
// gondola is open. The statusMap test below covers the eight states that are
// out of season, using the enum from the platform's own /rauris/config
// translation table.
lifts('rauriser-hochalmbahnen', 'json', {
  'A Hochalmbahn': 'open',
  'B Kreuzbodenbahn': 'closed',
  'C Jackalmlift rechts': 'closed',
  'D Gipfelbahn': 'closed',
  'E Gratlift': 'closed',
  'G Kreuzbodenlift': 'closed',
  'H Schwazerlift rechts': 'closed',
  'F Waldalmbahn': 'closed',
  'C Jackalmlift links': 'closed',
  'H Schwazerlift links': 'closed'
});

test('rauriser-hochalmbahnen should map every intermaps status', () => {
  const mapped = Object.fromEntries(
    [
      'open',
      'open_groomed',
      'open_ungroomed',
      'open_waitingtimes',
      'partially_open',
      'in_preparation',
      'unknown',
      'closed',
      'closed_outoforder',
      'closed_atmos',
      'closed_avalanche'
    ].map(token => [token, coerce(status(token))])
  );
  assert.deepEqual(mapped, {
    open: 'open',
    open_groomed: 'open',
    open_ungroomed: 'open',
    open_waitingtimes: 'open',
    partially_open: 'open',
    in_preparation: 'scheduled',
    unknown: 'scheduled',
    closed: 'closed',
    closed_outoforder: 'closed',
    closed_atmos: 'closed',
    closed_avalanche: 'closed'
  });
});

test('rauriser-hochalmbahnen should publish the feed timestamp', () => {
  const filename = resolve(import.meta.dirname, 'example/rauriser-hochalmbahnen.json');
  const data = JSON.parse(readFileSync(filename, 'utf8'));
  // .lastUpdate is '2026-08-06T08:13:40' in resort-local time (CEST, +02:00)
  assert.equal(parse(data).reportedAt, '2026-08-06T06:13:40.000Z');
});
