import assert from 'node:assert/strict';
import test from 'node:test';
import { status } from '../../lib/resorts/st-johann-in-tirol/facilities.js';
import lifts from '../lifts/index.js';

// Captured 2026-11-17 from the FacilityApi the site's own lift and piste widgets call
// (before the season: every facility status 2, Closed).
lifts('st-johann-in-tirol', 'json', {
  '6 EUB Harschbichl I': 'closed',
  '6 EUB Harschbichl II': 'closed',
  '10 EUB Eichenhof': 'closed',
  '6 SB Eichenhof': 'closed',
  '10 EUB Jodlalm': 'closed',
  '8 EUB Bauernalm': 'closed',
  '4 SB Penzing': 'closed',
  'SL Tannlift': 'closed',
  'SL Tauwiesenlift': 'closed'
});

// The fixture only carries code 2, so the rest of the bundle's state table is
// checked directly (synthetic: codes, not a captured board).
test('st-johann-in-tirol: Micado state codes', () => {
  assert.equal(status(0), undefined);
  assert.equal(status(1), 'open');
  assert.equal(status(2), 'closed');
  assert.equal(status(3), 'closed');
  assert.equal(status(4), 'open');
  assert.equal(status(5), 'scheduled');
  assert.equal(status(6), 'closed');
  assert.equal(status(7), 'hold');
});
