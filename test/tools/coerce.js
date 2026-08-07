import assert from 'node:assert/strict';
import test from 'node:test';
import coerce from '../../lib/tools/coerce.js';

test('coerce should report "scheduled" when in doubt', () => {
  assert.equal(coerce(''), 'scheduled');
  assert.equal(coerce('unknown'), 'scheduled');
  assert.equal(coerce('5'), 'scheduled');
});

test('coerce should coerce usual suspects', () => {
  assert.equal(coerce('open'), 'open');
  assert.equal(coerce('Open'), 'open');
  assert.equal(coerce('closed'), 'closed');
  assert.equal(coerce('Scheduled'), 'scheduled');
  assert.equal(coerce('delayed'), 'scheduled');
  assert.equal(coerce('wind hold'), 'hold');
  assert.equal(coerce('Maintenance-hold'), 'hold');
  assert.equal(coerce('On_Hold'), 'hold');
});

test('coerce should slice if needed', () => {
  assert.equal(coerce('open.gif', 0, -4), 'open');
  assert.equal(coerce('status-open', 6), 'open');
  assert.equal(coerce('/path/Open.png', 6, -4), 'open');
});

test('coerce should slice if needed', () => {
  assert.equal(coerce('open.gif', 0, '.gif'), 'open');
  assert.equal(coerce('status-open', '-'), 'open');
  assert.equal(coerce('/path/Open.png', '/', '.png'), 'open');
  assert.equal(coerce('/path/Open.png', 6, '.png'), 'open');
  assert.equal(coerce('/path/Open.png', '/', -4), 'open');
});

test('coerce knows the Portes du Soleil preparation vocabulary', () => {
  // all five already resolved to 'scheduled' via the unknown-token fallback, so
  // these assertions pin an existing behaviour rather than changing one - the
  // point is that the most common midwinter status is now recognised, not guessed
  for (const t of ['En preparation', 'En préparation', 'en préparation', 'prepare', 'préparation']) {
    assert.equal(coerce(t), 'scheduled', t);
  }
  // and the French open/closed words the same pages use still read correctly
  assert.equal(coerce('Ouverte'), 'open');
  assert.equal(coerce('Fermée'), 'closed');
  assert.equal(coerce('Fermee'), 'closed');
});
