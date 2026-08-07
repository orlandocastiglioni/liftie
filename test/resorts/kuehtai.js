import assert from 'node:assert/strict';
import test from 'node:test';
import status from '../../lib/resorts/kuehtai/status.js';
import coerce from '../../lib/tools/coerce.js';
import lifts from '../lifts/index.js';

// Fixture is the wayback capture of 18 February 2026 (20260218125615), midwinter
// with the board mixed - 11 of 12 lifts running, HoheMutBahn on fa-times. The
// live summer page has the identical markup and roster with every row on
// fa-times, so it would assert nothing about the open branch.
lifts('kuehtai', 'html', {
  Alpenrosenlift: 'open',
  KühTeppich: 'open',
  DreiSeenBahn: 'open',
  GaisKogelBahn: 'open',
  HochAlterBahn: 'open',
  HoheMutBahn: 'closed',
  KaiserBahn: 'open',
  Schwarzmooslift: 'open',
  Sonnenlift: 'open',
  StartBahn: 'open',
  Wiesbergbahn: 'open',
  Wunderteppich: 'open'
});

// fa-times is the whole reason this resort needs a status.js: coerce knows
// 'check' but its closed aliases are 'cross' and 'x', so an untranslated
// fa-times would publish every closed lift on the mountain as 'scheduled'.
test('kuehtai should map the widget icon vocabulary', () => {
  const mapped = Object.fromEntries(['fa fa-check', 'fa fa-times'].map(icon => [icon, coerce(status(icon))]));
  assert.deepEqual(mapped, {
    'fa fa-check': 'open',
    'fa fa-times': 'closed'
  });
});
