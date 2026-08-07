import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parse from '../../lib/resorts/glungezer/trails.js';
import collect from '../../lib/trails/parse.js';
import trails from '../trails/index.js';

// Same 2026-08-07 feed as the lifts: all 10 rows of `slopes` in feed order plus
// the one skiable row of `routes`. The Panorama Rodelbahn Zirbenwald toboggan
// run (type 709) is the second `routes` entry and is deliberately absent.
//
// `grade` is blue/red/black, the colour word the rest of the SKI plus CITY
// network prints for the same three Austrian tiers this feed spells
// easy/medium/difficult; `level` is the local blue->blue / red->black /
// black->doubleBlack reading. Handing normalizeLevel the raw English words
// would instead produce green/blue/black and invent a beginner tier the
// mountain does not grade. The ski route carries no difficulty at all, so it
// publishes with neither field rather than a guessed one.
trails(
  'glungezer',
  [
    { name: '1 Halsmarterabfahrt', status: 'closed', level: 'blue', grade: 'blue' },
    { name: '1a Familienabfahrt', status: 'closed', level: 'blue', grade: 'blue' },
    { name: '5 Schäferhüttenabfahrt', status: 'closed', level: 'black', grade: 'red' },
    { name: '6 Skiweg Schartenkogel', status: 'closed', level: 'black', grade: 'red' },
    { name: '4a Trainingsstrecke', status: 'closed', level: 'black', grade: 'red' },
    { name: '4 Tulfeinalm-Abfahrt', status: 'closed', level: 'black', grade: 'red' },
    { name: '2 FIS-Standardabfahrt', status: 'closed', level: 'black', grade: 'red' },
    { name: '3 Zum Tulfeinalmlift', status: 'closed', level: 'black', grade: 'red' },
    { name: '1b Trichterabfahrt', status: 'closed', level: 'black', grade: 'red' },
    { name: '7 Kanonenrohr und Verlängerung', status: 'closed', level: 'doubleBlack', grade: 'black' },
    { name: 'Skiroute Glungezer', status: 'closed' }
  ],
  { ext: 'json' }
);

test('glungezer trails reportedAt', () => {
  const body = JSON.parse(readFileSync(resolve(import.meta.dirname, 'example/glungezer.json'), 'utf8'));
  const list = collect(body, parse);
  assert.equal(list.reportedAt, '2026-08-07T02:08:42.000Z');
  // non-enumerable, so it is not counted as a twelfth row
  assert.equal(list.length, 11);
});
