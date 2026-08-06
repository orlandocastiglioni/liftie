import assert from 'node:assert/strict';
import test from 'node:test';
import status from '../../lib/resorts/palandoken/status.js';
import coerce from '../../lib/tools/coerce.js';
import lifts from '../lifts/index.js';

// live /api/lifts, 2026-08-06: the resort's ten lifts, all Closed in northern
// summer. There is no winter capture of this API - the SPA and its endpoints
// replaced the old ASP.NET site days before, and wayback has nothing under
// /api/* - so the vocabulary is covered by the unit test below instead.
lifts('palandoken', 'json', {
  'GONDOL 1': 'closed',
  'A LİFTİ [İLK ADIM]': 'closed',
  'ALT HALI': 'closed',
  'B LİFTİ SULTAN TAHTI': 'closed',
  'C LİFTİ [KUZEY LİFTİ]': 'closed',
  'DEDEMAN HALI': 'closed',
  'EJDER LİFTİ': 'closed',
  'GONDOL 2': 'closed',
  'GONDOL HALI': 'closed',
  'VADİ LİFT': 'closed'
});

test('palandoken status vocabulary', () => {
  const check = row => coerce(status(row));
  assert.equal(check({ operatingStatus: 'Active', isOpen: true }), 'open');
  assert.equal(check({ operatingStatus: 'Closed', isOpen: false }), 'closed');
  assert.equal(check({ operatingStatus: 'Maintenance', isOpen: false }), 'hold');
  assert.equal(check({ operatingStatus: 'Inactive', isOpen: false }), 'closed');
  // without the map every one of those but 'Closed' would read 'scheduled'
  assert.equal(coerce('Active'), 'scheduled');
  assert.equal(coerce('Maintenance'), 'scheduled');
  assert.equal(coerce('Inactive'), 'scheduled');
  // missing or unrecognised word falls back to the site's own boolean
  assert.equal(check({ isOpen: true }), 'open');
  assert.equal(check({ operatingStatus: null, isOpen: false }), 'closed');
  assert.equal(check({ operatingStatus: 'Rüzgar', isOpen: false }), 'closed');
  assert.equal(check({}), 'scheduled');
});
