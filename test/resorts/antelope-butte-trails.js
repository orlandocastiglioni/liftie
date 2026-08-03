import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import descriptor from '../../lib/resorts/antelope-butte/trails.js';
import parseCsv from '../../lib/tools/csv.js';
import collect from '../../lib/trails/parse.js';

// trail rows share the report CSV with the lifts; grooming notes and the
// section-header rows must be skipped, terrain areas tagged terrainPark.
const fixture = resolve(import.meta.dirname, 'example/antelope-butte.csv');

test('antelope-butte trails', () => {
  const rows = parseCsv(readFileSync(fixture, 'utf8'));
  const list = collect(rows, descriptor);
  assert.deepEqual(list, [
    { name: 'HAPPY TRAILS', status: 'open' },
    { name: 'HO HA HA', status: 'open' },
    { name: "SADIE'S WAY", status: 'open' },
    { name: 'ENTABENI', status: 'open' },
    { name: 'SUZ MOOSE', status: 'open' },
    { name: 'LAST TANGO', status: 'open' },
    { name: 'SPEED GOAT', status: 'open' },
    { name: 'PALOMA', status: 'open' },
    { name: 'PILUNGE', status: 'open' },
    { name: "SHINEY'S SLOPE", status: 'open' },
    { name: "ASHLEY'S ALLEY", status: 'open' },
    { name: 'NO WAHALA', status: 'open' },
    { name: '"NO WAHALA" Terrain Park', status: 'open', level: 'terrainPark' },
    { name: 'BOOMERANG', status: 'open' },
    { name: 'NAMING OPPORTUNITY', status: 'open' },
    { name: "HEAVEN'S DOOR", status: 'open' },
    { name: '"HOLLYWOOD" Terrain Park', status: 'open', level: 'terrainPark' },
    { name: "SCOTT'S BLUFF", status: 'open' },
    { name: 'HOT DOG', status: 'open' },
    { name: 'BUCKHORN ROLL', status: 'open' },
    { name: 'NAMING OPPORTUNITY', status: 'open' },
    { name: 'CRAZY BONES', status: 'open' },
    { name: "SHASSETZ' CHUTE", status: 'open' },
    { name: 'BIG HORN TRAIL', status: 'open' },
    { name: 'FAST EDDIE', status: 'open' },
    { name: "REIMER'S RUN", status: 'open' },
    { name: 'J-9', status: 'open' },
    { name: 'WILD BILL', status: 'open' },
    { name: 'COWBOY CANNON', status: 'open' },
    { name: "SCHWAMMY'S WAY", status: 'open' },
    { name: "PAPA'S PARADISE", status: 'open' },
    { name: 'FINAL EXAM TERRAIN AREA', status: 'open', level: 'terrainPark' },
    { name: 'WEST SIDE TERRAIN AREA', status: 'open', level: 'terrainPark' }
  ]);
});
