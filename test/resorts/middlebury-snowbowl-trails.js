import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { running, trailRows } from '../../lib/tools/alpinemedia.js';
import collect from '../../lib/trails/parse.js';

// 2026-08-04 capture of the alpinemedia trails and lifts services (season over, every
// lift closed; 2 trail rows still flagged open). Read raw, then through the lift gate.
const read = name => JSON.parse(readFileSync(resolve(import.meta.dirname, `example/${name}.json`), 'utf8'));
const trails = read('middlebury-snowbowl-trails');
const lifts = read('middlebury-snowbowl');

test('middlebury-snowbowl trails, raw', () => {
  assert.deepEqual(
    collect(trailRows(trails), r => r),
    [
      { 'name': 'Allen', 'status': 'closed', 'level': 'black' },
      { 'name': 'Allen East', 'status': 'closed', 'level': 'black' },
      { 'name': 'Allen West', 'status': 'closed', 'level': 'black' },
      { 'name': 'Lift Line', 'status': 'closed', 'level': 'black' },
      { 'name': 'Bailey Falls Traverse', 'status': 'closed', 'level': 'blue' },
      { 'name': 'Big Cookie', 'status': 'closed', 'level': 'black' },
      { 'name': 'Cameron', 'status': 'closed', 'level': 'black' },
      { 'name': 'Carpet Run', 'status': 'closed', 'level': 'green' },
      { 'name': 'Discovery Trail', 'status': 'closed', 'level': 'green' },
      { 'name': 'Fletcher', 'status': 'closed', 'level': 'black' },
      { 'name': 'Game Trail', 'status': 'closed', 'level': 'blue' },
      { 'name': 'Hadley', 'status': 'closed', 'level': 'blue' },
      { 'name': 'Kelton', 'status': 'open', 'level': 'black' },
      { 'name': 'Laforce', 'status': 'closed', 'level': 'black' },
      { 'name': 'Lang', 'status': 'open', 'level': 'green' },
      { 'name': 'Lower Kelton', 'status': 'closed', 'level': 'blue' },
      { 'name': 'Meredith', 'status': 'closed', 'level': 'green' },
      { 'name': 'Panther', 'status': 'closed', 'level': 'black' },
      { 'name': "Pete's Pass", 'status': 'closed', 'level': 'blue' },
      { 'name': 'Proctor', 'status': 'closed', 'level': 'blue' },
      { 'name': 'RTA', 'status': 'closed', 'level': 'black' },
      { 'name': 'Ross', 'status': 'closed', 'level': 'black' },
      { 'name': 'S Turn', 'status': 'closed', 'level': 'blue' },
      { 'name': 'Upper Loop', 'status': 'closed', 'level': 'blue' },
      { 'name': 'Voter', 'status': 'closed', 'level': 'green' },
      { 'name': 'Waterfall', 'status': 'closed', 'level': 'black' },
      { 'name': 'Wissler', 'status': 'closed', 'level': 'green' },
      { 'name': 'Youngman', 'status': 'closed', 'level': 'black' }
    ]
  );
});

test('middlebury-snowbowl trails, gated on the lifts', () => {
  assert.equal(running(lifts), false);
  assert.deepEqual(
    collect(trailRows(trails, running(lifts)), r => r),
    [
      { 'name': 'Allen', 'status': 'closed', 'level': 'black' },
      { 'name': 'Allen East', 'status': 'closed', 'level': 'black' },
      { 'name': 'Allen West', 'status': 'closed', 'level': 'black' },
      { 'name': 'Lift Line', 'status': 'closed', 'level': 'black' },
      { 'name': 'Bailey Falls Traverse', 'status': 'closed', 'level': 'blue' },
      { 'name': 'Big Cookie', 'status': 'closed', 'level': 'black' },
      { 'name': 'Cameron', 'status': 'closed', 'level': 'black' },
      { 'name': 'Carpet Run', 'status': 'closed', 'level': 'green' },
      { 'name': 'Discovery Trail', 'status': 'closed', 'level': 'green' },
      { 'name': 'Fletcher', 'status': 'closed', 'level': 'black' },
      { 'name': 'Game Trail', 'status': 'closed', 'level': 'blue' },
      { 'name': 'Hadley', 'status': 'closed', 'level': 'blue' },
      { 'name': 'Kelton', 'status': 'closed', 'level': 'black' },
      { 'name': 'Laforce', 'status': 'closed', 'level': 'black' },
      { 'name': 'Lang', 'status': 'closed', 'level': 'green' },
      { 'name': 'Lower Kelton', 'status': 'closed', 'level': 'blue' },
      { 'name': 'Meredith', 'status': 'closed', 'level': 'green' },
      { 'name': 'Panther', 'status': 'closed', 'level': 'black' },
      { 'name': "Pete's Pass", 'status': 'closed', 'level': 'blue' },
      { 'name': 'Proctor', 'status': 'closed', 'level': 'blue' },
      { 'name': 'RTA', 'status': 'closed', 'level': 'black' },
      { 'name': 'Ross', 'status': 'closed', 'level': 'black' },
      { 'name': 'S Turn', 'status': 'closed', 'level': 'blue' },
      { 'name': 'Upper Loop', 'status': 'closed', 'level': 'blue' },
      { 'name': 'Voter', 'status': 'closed', 'level': 'green' },
      { 'name': 'Waterfall', 'status': 'closed', 'level': 'black' },
      { 'name': 'Wissler', 'status': 'closed', 'level': 'green' },
      { 'name': 'Youngman', 'status': 'closed', 'level': 'black' }
    ]
  );
});
