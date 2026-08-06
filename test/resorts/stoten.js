import assert from 'node:assert/strict';
import test from 'node:test';
import status from '../../lib/resorts/stoten/status.js';
import lifts from '../lifts/index.js';

// /wp-json/wp/v3/slopesinfo fetched live on 2026-08-06. The route has no
// Wayback captures at all - it is undocumented and unlinked, so nothing ever
// crawled it - and Sweden is out of season, so every IsOpen is false. That
// still exercises the half of the vocabulary that can go wrong silently
// (coerce has no boolean handling; see status.js), and the true -> open half
// is covered by the unit test below.
//
// 27 entries: the 23 lifts on the piste map plus the separately statused
// sections of the two multi-section lifts (Trippelliften 1/2, Dubbelliften
// 1/2), exactly as the resort's own table lists them.
lifts('stoten', 'json', {
  'Kronliften': 'closed',
  'Granfjällsliften': 'closed',
  'Solliften': 'closed',
  'Vargliften 1': 'closed',
  'Vargliften 2': 'closed',
  'Långliften': 'closed',
  'Vargy Express': 'closed',
  'Långknappen': 'closed',
  'Kortknappen': 'closed',
  'Vargys Tunnelbana': 'closed',
  'Ravinliften': 'closed',
  'World Cup Express': 'closed',
  'Lillknappen': 'closed',
  'Trippelliften': 'closed',
  'Trippelliften 1': 'closed',
  'Trippelliften 2': 'closed',
  'Ranchliften': 'closed',
  'Toppliften': 'closed',
  'Rullis': 'closed',
  'Traversen': 'closed',
  'Dubbelliften': 'closed',
  'Dubbelliften 1': 'closed',
  'Dubbelliften 2': 'closed',
  'Snurris': 'closed',
  'Knatten': 'closed',
  'Knapp 398': 'closed',
  'Grillknappen': 'closed'
});

test('stoten status is a JSON boolean, not a word', () => {
  // coerce() does status.replace(), so handing it the raw boolean `true`
  // throws and `false` only survives by being falsy - stringify first
  assert.equal(status(true), 'open');
  assert.equal(status(false), 'closed');
  // a row the resort has not stated is 'scheduled', not open
  assert.equal(status(undefined), 'scheduled');
});
