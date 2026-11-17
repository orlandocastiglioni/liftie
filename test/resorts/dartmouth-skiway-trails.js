import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { running, trailRows } from '../../lib/tools/alpinemedia.js';
import collect from '../../lib/trails/parse.js';

// Captured 2026-11-17 from the alpinemedia services, before the season: every lift
// closed, every trail closed. Read raw, then through the lift gate.
const read = name => JSON.parse(readFileSync(resolve(import.meta.dirname, `example/${name}.json`), 'utf8'));
const trails = read('dartmouth-skiway-trails');
const lifts = read('dartmouth-skiway');

test('dartmouth-skiway trails, raw', () => {
  assert.deepEqual(
    collect(trailRows(trails), r => r),
    [
      { 'name': "Beginner's Slope", 'status': 'closed', 'level': 'green' },
      { 'name': 'Big Green', 'status': 'closed', 'level': 'green' },
      { 'name': 'Cum Laude', 'status': 'closed', 'level': 'black' },
      { 'name': 'Drop Out', 'status': 'closed', 'level': 'blue' },
      { 'name': 'Green Pastures', 'status': 'closed', 'level': 'green' },
      { 'name': "Herman's Highway", 'status': 'closed', 'level': 'blue' },
      { 'name': 'Howard Chivers', 'status': 'closed', 'level': 'blue' },
      { 'name': 'Jug Handle', 'status': 'closed', 'level': 'green' },
      { 'name': 'Juicer', 'status': 'closed', 'level': 'black' },
      { 'name': "Kelton's Gauntlet", 'status': 'closed', 'level': 'black' },
      { 'name': 'Lift Line', 'status': 'closed', 'level': 'doubleBlack' },
      { 'name': 'Liftline Glade', 'status': 'closed', 'level': 'blue' },
      { 'name': 'Lower John Meck', 'status': 'closed', 'level': 'blue' },
      { 'name': 'Lyme Drop', 'status': 'closed', 'level': 'blue' },
      { 'name': 'MD', 'status': 'closed', 'level': 'blue' },
      { 'name': 'NRO', 'status': 'closed', 'level': 'blue' },
      { 'name': 'Pass-Fail', 'status': 'closed', 'level': 'green' },
      { 'name': 'Post Doc', 'status': 'closed', 'level': 'blue' },
      { 'name': 'Race Finish', 'status': 'closed', 'level': 'black' },
      { 'name': 'T-Line', 'status': 'closed', 'level': 'black' },
      { 'name': 'The Face', 'status': 'closed', 'level': 'blue' },
      { 'name': 'Thomas', 'status': 'closed', 'level': 'blue' },
      { 'name': 'Upper Howard Chivers', 'status': 'closed', 'level': 'green' },
      { 'name': 'Upper John Meck', 'status': 'closed', 'level': 'blue' },
      { 'name': "Upper Kelton's Gauntlet", 'status': 'closed', 'level': 'blue' },
      { 'name': 'Upper Lift Line', 'status': 'closed', 'level': 'blue' },
      { 'name': 'Upper Thomas', 'status': 'closed', 'level': 'black' },
      { 'name': "Worden's Schuss", 'status': 'closed', 'level': 'black' }
    ]
  );
});

test('dartmouth-skiway trails, gated on the lifts', () => {
  assert.equal(running(lifts), false);
  assert.deepEqual(
    collect(trailRows(trails, running(lifts)), r => r),
    [
      { 'name': "Beginner's Slope", 'status': 'closed', 'level': 'green' },
      { 'name': 'Big Green', 'status': 'closed', 'level': 'green' },
      { 'name': 'Cum Laude', 'status': 'closed', 'level': 'black' },
      { 'name': 'Drop Out', 'status': 'closed', 'level': 'blue' },
      { 'name': 'Green Pastures', 'status': 'closed', 'level': 'green' },
      { 'name': "Herman's Highway", 'status': 'closed', 'level': 'blue' },
      { 'name': 'Howard Chivers', 'status': 'closed', 'level': 'blue' },
      { 'name': 'Jug Handle', 'status': 'closed', 'level': 'green' },
      { 'name': 'Juicer', 'status': 'closed', 'level': 'black' },
      { 'name': "Kelton's Gauntlet", 'status': 'closed', 'level': 'black' },
      { 'name': 'Lift Line', 'status': 'closed', 'level': 'doubleBlack' },
      { 'name': 'Liftline Glade', 'status': 'closed', 'level': 'blue' },
      { 'name': 'Lower John Meck', 'status': 'closed', 'level': 'blue' },
      { 'name': 'Lyme Drop', 'status': 'closed', 'level': 'blue' },
      { 'name': 'MD', 'status': 'closed', 'level': 'blue' },
      { 'name': 'NRO', 'status': 'closed', 'level': 'blue' },
      { 'name': 'Pass-Fail', 'status': 'closed', 'level': 'green' },
      { 'name': 'Post Doc', 'status': 'closed', 'level': 'blue' },
      { 'name': 'Race Finish', 'status': 'closed', 'level': 'black' },
      { 'name': 'T-Line', 'status': 'closed', 'level': 'black' },
      { 'name': 'The Face', 'status': 'closed', 'level': 'blue' },
      { 'name': 'Thomas', 'status': 'closed', 'level': 'blue' },
      { 'name': 'Upper Howard Chivers', 'status': 'closed', 'level': 'green' },
      { 'name': 'Upper John Meck', 'status': 'closed', 'level': 'blue' },
      { 'name': "Upper Kelton's Gauntlet", 'status': 'closed', 'level': 'blue' },
      { 'name': 'Upper Lift Line', 'status': 'closed', 'level': 'blue' },
      { 'name': 'Upper Thomas', 'status': 'closed', 'level': 'black' },
      { 'name': "Worden's Schuss", 'status': 'closed', 'level': 'black' }
    ]
  );
});
