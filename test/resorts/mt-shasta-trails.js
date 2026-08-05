import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parse from '../../lib/resorts/mt-shasta/trails.js';
import parseCsv from '../../lib/tools/csv.js';
import collect from '../../lib/trails/parse.js';

// Grooming report CSV, so no shared html/json trail helper - see mt-shasta.js
// for how the fixtures were built. mt-shasta-trails-offseason.csv is the live
// (2026-08-05) grooming sheet, header only; mt-shasta-trails.csv is that same
// header plus one CONSTRUCTED winter row. Its closed-run lists are the runs the
// resort's legacy 2026-02-25 report actually had closed (Marmot: Challenge,
// SnowShoe, Lower Blue Grouse; Douglas: Rocky Ridge), plus a whole-lift "Closed"
// on Coyote and a curly-apostrophe "Richard’s Way" on Gray Butte to exercise
// the two remaining branches: the lift-level closed flag and the name
// normalisation that reconciles hand-typed run names with the runs master.
//
// Expected is the complete 40-run catalogue in runs-master order. Grooming
// state never becomes a status: freshly/partially groomed and blank all mean
// open, only the "<Lift> Closed" cell closes anything.
const fixture = name => parseCsv(readFileSync(resolve(import.meta.dirname, `example/${name}.csv`), 'utf8'));

test('mt-shasta trails', () => {
  assert.deepEqual(collect(fixture('mt-shasta-trails'), parse), [
    { name: 'Midnite Sun', status: 'open', level: 'green' },
    { name: "Tom's Train Park", status: 'open', level: 'green' },
    { name: 'Fresh Aire', status: 'open', level: 'green' },
    { name: 'Blue Grouse', status: 'open', level: 'green' },
    { name: 'Wintun Way', status: 'open', level: 'green' },
    { name: 'Easy Street', status: 'open', level: 'green' },
    { name: 'Cedar Road', status: 'open', level: 'green' },
    { name: 'Easy Money', status: 'open', level: 'green' },
    { name: 'Lower Blue Grouse', status: 'closed', level: 'blue' },
    { name: 'Silvertip', status: 'open', level: 'blue' },
    { name: 'Challenge', status: 'closed', level: 'blue' },
    { name: 'SnowShoe', status: 'closed', level: 'blue' },
    { name: 'Telemark', status: 'open', level: 'blue' },
    { name: 'Highland Glide', status: 'open', level: 'blue' },
    { name: 'North Saddle', status: 'open', level: 'blue' },
    { name: 'Horizon', status: 'open', level: 'blue' },
    { name: 'West Face', status: 'open', level: 'black' },
    { name: 'Rocky Ridge', status: 'closed', level: 'black' },
    { name: 'Flying Squirrel', status: 'open', level: 'black' },
    { name: 'Black Fox', status: 'open', level: 'black' },
    { name: 'Lower Black Fox', status: 'open', level: 'black' },
    { name: "Haley's Comet", status: 'open', level: 'black' },
    { name: 'Red Tail', status: 'open', level: 'black' },
    { name: 'Lower Red Tail', status: 'open', level: 'black' },
    { name: 'Coyote Road', status: 'closed', level: 'green' },
    { name: 'Sugar Pine', status: 'closed', level: 'blue' },
    { name: 'East Boundary', status: 'closed', level: 'blue' },
    { name: 'White Fir', status: 'closed', level: 'blue' },
    { name: 'Upper Revolution', status: 'closed', level: 'blue' },
    { name: 'Eagles Flight', status: 'closed', level: 'blue' },
    { name: 'DiamondBack', status: 'closed', level: 'black' },
    { name: 'Black bear', status: 'closed', level: 'black' },
    { name: 'Z-Way', status: 'closed', level: 'black' },
    { name: 'Bee Line', status: 'open', level: 'green' },
    { name: 'Get Back', status: 'open', level: 'green' },
    { name: "Ray's Run", status: 'open', level: 'blue' },
    { name: "Robin's Nest", status: 'open', level: 'blue' },
    { name: 'Blackbird', status: 'open', level: 'black' },
    { name: 'Lemurian', status: 'open', level: 'black' },
    { name: "Richard's Way", status: 'closed', level: 'black' }
  ]);
});

test('mt-shasta trails should be empty while the grooming sheet has no report', () => {
  assert.deepEqual(collect(fixture('mt-shasta-trails-offseason'), parse), []);
});
