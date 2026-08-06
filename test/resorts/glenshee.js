import assert from 'node:assert/strict';
import test from 'node:test';
import { parseStamp } from '../../lib/resorts/glenshee/index.js';
import lifts from '../lifts/index.js';

// 2026-03-07 capture: 10 open / 12 closed
lifts('glenshee', 'html', {
  'Cairnwell Chairlift': 'open',
  'Claybokie Poma': 'closed',
  'Cairnwell T-bar': 'closed',
  'Bucharts Access Poma': 'closed',
  'Bucharts T-bar': 'closed',
  'Carn Aosda T-bar': 'closed',
  'Plastic Slope Poma': 'closed',
  'Dink Dink Poma': 'open',
  'Rope Tow': 'open',
  'Baddoch Chairlift': 'closed',
  'Sunnyside Poma 1': 'open',
  'Sunnyside Poma 2': 'open',
  'Sunnyside Chairlift': 'open',
  'Cluny Poma 1': 'closed',
  'Cluny Poma 2': 'closed',
  'Tom Dearg Poma': 'open',
  'Beag Poma': 'open',
  'Meall O Dhar Poma': 'closed',
  'Caenlochan Poma': 'open',
  'Coire Fionn Poma 1': 'open',
  'Coire Fionn Poma 2': 'closed',
  'Glas Maol Poma': 'closed'
});

// 2026-02-10 capture: the third state, span.tag opening / 'Expected to Open'
lifts(
  'glenshee',
  'html',
  {
    'Cairnwell Chairlift': 'scheduled',
    'Claybokie Poma': 'scheduled',
    'Cairnwell T-bar': 'scheduled',
    'Bucharts Access Poma': 'scheduled',
    'Bucharts T-bar': 'closed',
    'Carn Aosda T-bar': 'closed',
    'Plastic Slope Poma': 'scheduled',
    'Dink Dink Poma': 'scheduled',
    'Rope Tow': 'scheduled',
    'Baddoch Chairlift': 'scheduled',
    'Sunnyside Poma 1': 'scheduled',
    'Sunnyside Poma 2': 'scheduled',
    'Sunnyside Chairlift': 'closed',
    'Cluny Poma 1': 'scheduled',
    'Cluny Poma 2': 'closed',
    'Tom Dearg Poma': 'scheduled',
    'Beag Poma': 'closed',
    'Meall O Dhar Poma': 'closed',
    'Caenlochan Poma': 'closed',
    'Coire Fionn Poma 1': 'closed',
    'Coire Fionn Poma 2': 'closed',
    'Glas Maol Poma': 'closed'
  },
  { example: 'glenshee-opening' }
);

test('glenshee reportedAt', () => {
  // the banner heading carries no year; it is recovered from the weekday
  const winter = new Date('2026-03-07T18:00:00Z');
  assert.equal(parseStamp('Lift Status at Sat 7 Mar 11:08am', winter), '2026-03-07T11:08:00.000Z');
  // '17:00pm' is a 24 hour clock with a decorative suffix, not 5am
  assert.equal(parseStamp('Lift Status at Tue 10 Feb 17:00pm', winter), '2026-02-10T17:00:00.000Z');
  // a stamp from before New Year resolves to the previous year
  assert.equal(parseStamp('Lift Status at Sun 28 Dec 09:27am', winter), '2025-12-28T09:27:00.000Z');
  // BST: April wall clock is UTC+1
  assert.equal(
    parseStamp('Lift Status at Wed 15 Apr 10:00am', new Date('2026-04-20T00:00:00Z')),
    '2026-04-15T09:00:00.000Z'
  );
  // weekday that fits neither candidate year, and a summer page with no stamp
  assert.equal(parseStamp('Lift Status at Mon 7 Mar 11:08am', winter), undefined);
  assert.equal(parseStamp(undefined, winter), undefined);
});
