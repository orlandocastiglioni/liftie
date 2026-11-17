import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { running, trailRows } from '../../lib/tools/alpinemedia.js';
import collect from '../../lib/trails/parse.js';

// 2026-08-05 capture of the alpinemedia trails and lifts services. The platform keeps the
// last published trail flags all summer: 15 rows still open from 3/17/2026 with every
// lift closed. Read raw they exercise the open branch; through the lift gate (as the
// pipeline publishes them) they are all closed. The six level-less rows are
// difficulty 'uphill-access' ("Tree Skiing"); three names appear twice, run and park.
const read = name => JSON.parse(readFileSync(resolve(import.meta.dirname, `example/${name}.json`), 'utf8'));
const trails = read('tyrol-basin-trails');
const lifts = read('tyrol-basin');

test('tyrol-basin trails, raw', () => {
  assert.deepEqual(
    collect(trailRows(trails), r => r),
    [
      { 'name': 'Bump Buster', 'status': 'open', 'level': 'black' },
      { 'name': "Charlotte's Chase", 'status': 'closed', 'level': 'green' },
      { 'name': 'Dare Devil', 'status': 'open', 'level': 'black' },
      { 'name': 'Double Diamond', 'status': 'open', 'level': 'doubleBlack' },
      { 'name': 'Elbow', 'status': 'closed', 'level': 'black' },
      { 'name': 'Elbow Trees', 'status': 'closed' },
      { 'name': 'Espel', 'status': 'closed', 'level': 'green' },
      { 'name': 'Gentle Ben', 'status': 'open', 'level': 'green' },
      { 'name': 'Gentle Ben Progression Park', 'status': 'closed', 'level': 'terrainPark' },
      { 'name': 'Green Zone', 'status': 'closed', 'level': 'terrainPark' },
      { 'name': 'Hans Down', 'status': 'closed', 'level': 'terrainPark' },
      { 'name': 'Hans Down', 'status': 'open', 'level': 'blue' },
      { 'name': "Lower Sandy's Run", 'status': 'open', 'level': 'blue' },
      { 'name': 'Nisse Sti', 'status': 'open', 'level': 'green' },
      { 'name': 'Nutcracker', 'status': 'closed', 'level': 'black' },
      { 'name': "Shelley's Way", 'status': 'closed', 'level': 'green' },
      { 'name': 'Sunrise', 'status': 'closed', 'level': 'terrainPark' },
      { 'name': 'Sunrise', 'status': 'open', 'level': 'blue' },
      { 'name': "Sutter's Ridge", 'status': 'closed', 'level': 'blue' },
      { 'name': 'The Barnyard', 'status': 'open', 'level': 'black' },
      { 'name': 'The Barnyard', 'status': 'closed', 'level': 'terrainPark' },
      { 'name': 'The Green Zone', 'status': 'closed' },
      { 'name': 'The Underwood Way', 'status': 'open', 'level': 'black' },
      { 'name': 'Tobel', 'status': 'open', 'level': 'blue' },
      { 'name': 'Tobel Trees', 'status': 'closed' },
      { 'name': 'Trollway', 'status': 'open', 'level': 'green' },
      { 'name': 'Twister', 'status': 'closed', 'level': 'black' },
      { 'name': 'Twister Trees', 'status': 'closed' },
      { 'name': "Ullr's Alley", 'status': 'closed', 'level': 'black' },
      { 'name': 'Upper Dare Devil', 'status': 'closed' },
      { 'name': "Upper Sandy's Run", 'status': 'open', 'level': 'blue' },
      { 'name': 'West Ridge Trail', 'status': 'open', 'level': 'green' },
      { 'name': "Wilder's Way", 'status': 'closed', 'level': 'green' },
      { 'name': 'Yodeler', 'status': 'open', 'level': 'black' },
      { 'name': 'Yodeler Trees', 'status': 'closed' }
    ]
  );
});

test('tyrol-basin trails, gated on the lifts', () => {
  assert.equal(running(lifts), false);
  assert.deepEqual(
    collect(trailRows(trails, running(lifts)), r => r),
    [
      { 'name': 'Bump Buster', 'status': 'closed', 'level': 'black' },
      { 'name': "Charlotte's Chase", 'status': 'closed', 'level': 'green' },
      { 'name': 'Dare Devil', 'status': 'closed', 'level': 'black' },
      { 'name': 'Double Diamond', 'status': 'closed', 'level': 'doubleBlack' },
      { 'name': 'Elbow', 'status': 'closed', 'level': 'black' },
      { 'name': 'Elbow Trees', 'status': 'closed' },
      { 'name': 'Espel', 'status': 'closed', 'level': 'green' },
      { 'name': 'Gentle Ben', 'status': 'closed', 'level': 'green' },
      { 'name': 'Gentle Ben Progression Park', 'status': 'closed', 'level': 'terrainPark' },
      { 'name': 'Green Zone', 'status': 'closed', 'level': 'terrainPark' },
      { 'name': 'Hans Down', 'status': 'closed', 'level': 'terrainPark' },
      { 'name': 'Hans Down', 'status': 'closed', 'level': 'blue' },
      { 'name': "Lower Sandy's Run", 'status': 'closed', 'level': 'blue' },
      { 'name': 'Nisse Sti', 'status': 'closed', 'level': 'green' },
      { 'name': 'Nutcracker', 'status': 'closed', 'level': 'black' },
      { 'name': "Shelley's Way", 'status': 'closed', 'level': 'green' },
      { 'name': 'Sunrise', 'status': 'closed', 'level': 'terrainPark' },
      { 'name': 'Sunrise', 'status': 'closed', 'level': 'blue' },
      { 'name': "Sutter's Ridge", 'status': 'closed', 'level': 'blue' },
      { 'name': 'The Barnyard', 'status': 'closed', 'level': 'black' },
      { 'name': 'The Barnyard', 'status': 'closed', 'level': 'terrainPark' },
      { 'name': 'The Green Zone', 'status': 'closed' },
      { 'name': 'The Underwood Way', 'status': 'closed', 'level': 'black' },
      { 'name': 'Tobel', 'status': 'closed', 'level': 'blue' },
      { 'name': 'Tobel Trees', 'status': 'closed' },
      { 'name': 'Trollway', 'status': 'closed', 'level': 'green' },
      { 'name': 'Twister', 'status': 'closed', 'level': 'black' },
      { 'name': 'Twister Trees', 'status': 'closed' },
      { 'name': "Ullr's Alley", 'status': 'closed', 'level': 'black' },
      { 'name': 'Upper Dare Devil', 'status': 'closed' },
      { 'name': "Upper Sandy's Run", 'status': 'closed', 'level': 'blue' },
      { 'name': 'West Ridge Trail', 'status': 'closed', 'level': 'green' },
      { 'name': "Wilder's Way", 'status': 'closed', 'level': 'green' },
      { 'name': 'Yodeler', 'status': 'closed', 'level': 'black' },
      { 'name': 'Yodeler Trees', 'status': 'closed' }
    ]
  );
});
