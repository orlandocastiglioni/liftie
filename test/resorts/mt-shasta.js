import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parse from '../../lib/resorts/mt-shasta/index.js';
import parseCsv from '../../lib/tools/csv.js';

// Mt. Shasta serves its report as a published-to-web Google Sheet (CSV), so it
// exercises the csv fetch path rather than the html/json test helpers.
//
// FIXTURES. mt-shasta-offseason.csv is the daily-conditions sheet exactly as it
// answered on 2026-08-05: a Google Form response sheet whose rows are cleared
// out of season, so only the 49-column header survives (including the four
// stray 2026-02-09 cells the operator left in the header row).
//
// The response sheet has never been archived with a row in it - the Wayback
// Machine holds no in-season capture of either CSV endpoint - so the winter
// fixture mt-shasta.csv is that same live header plus ONE CONSTRUCTED report
// row. Its values use the operator's documented vocabulary and are taken from
// the resort's legacy 2026-02-25 report (still live at gid=1990339882): the
// Open / Closed / Scheduled tokens, the 9-4 hours, the 28" Douglas summit
// depth and the 41.5"/125.5" snow totals are all theirs. Re-check the real
// tokens in early season.
const fixture = name => parseCsv(readFileSync(resolve(import.meta.dirname, `example/${name}.csv`), 'utf8'));

test('mt-shasta should return lift status from the last row of the conditions sheet', () => {
  assert.deepEqual(parse(fixture('mt-shasta')), {
    'Douglas Lift': 'open',
    'Marmot Lift': 'open',
    'Coyote Lift': 'closed',
    'Gray Butte Lift': 'scheduled'
  });
});

test('mt-shasta should report no lifts while the response sheet is empty', () => {
  assert.deepEqual(parse(fixture('mt-shasta-offseason')), {});
});
