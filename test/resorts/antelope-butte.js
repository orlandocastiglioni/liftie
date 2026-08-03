import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parse from '../../lib/resorts/antelope-butte/index.js';
import parseCsv from '../../lib/tools/csv.js';

// antelope-butte serves its report as a published-to-web Google Sheet (CSV),
// so it exercises the csv fetch path rather than the html/json test helpers.
const fixture = resolve(import.meta.dirname, 'example/antelope-butte.csv');

test('antelope-butte should return lift status from the report CSV', () => {
  const rows = parseCsv(readFileSync(fixture, 'utf8'));
  assert.deepEqual(parse(rows), {
    'Summit Lift Double Chair': 'open',
    'Park Lift Double Chair': 'open',
    "Pole'r Express Conveyor": 'open'
  });
});
