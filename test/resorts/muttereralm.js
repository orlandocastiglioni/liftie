import assert from 'node:assert/strict';
import test from 'node:test';
import status from '../../lib/resorts/muttereralm/status.js';
import coerce from '../../lib/tools/coerce.js';
import lifts from '../lifts/index.js';

// Fixture is the wayback capture of 24 January 2026 (20260124204957), the only
// in-season snapshot the archive holds for this page. Midwinter the whole lift
// system runs, so all five are open here; the closed branch is asserted by the
// slope table in muttereralm-trails.js (2 of 10 on fa-times) and by the icon
// vocabulary test below.
lifts('muttereralm', 'html', {
  'A Muttereralmbahn': 'open',
  'B Götznerbahn': 'open',
  'C Pfriemesköpfl': 'open',
  'D Almbodenlift': 'open',
  'E Zauberteppich': 'open'
});

// fa-times is the whole reason this resort needs a status.js: coerce knows
// 'check' but its closed aliases are 'cross' and 'x', so an untranslated
// fa-times would publish every closed lift on the mountain as 'scheduled'.
test('muttereralm should map the widget icon vocabulary', () => {
  const mapped = Object.fromEntries(['fa fa-check', 'fa fa-times'].map(icon => [icon, coerce(status(icon))]));
  assert.deepEqual(mapped, {
    'fa fa-check': 'open',
    'fa fa-times': 'closed'
  });
});
