import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parse from '../../lib/resorts/powder-ridge-ct/index.js';
import lifts from '../lifts/index.js';

// /wp-json/sc/v1/trail-report captured live 2026-10-27. The Festival double is
// still flagged open from the summer bike park, stamped 2026-09-18 - which is
// exactly why the stamp travels with the report.
lifts('powder-ridge-ct', 'json', {
  '1 - Festival (Double)': 'open',
  '2 - Middlefield (Triple)': 'closed',
  '3 - Mini Field (Double)': 'closed',
  '5 - Wonder Carpet': 'closed',
  '6 - Tubing Lift': 'closed'
});

test('powder-ridge-ct reportedAt', () => {
  const body = JSON.parse(readFileSync(resolve(import.meta.dirname, 'example/powder-ridge-ct.json'), 'utf8'));
  const ls = parse(body);
  // '2026-09-18 14:07:15' New York wall clock, EDT in September
  assert.equal(ls.reportedAt, '2026-09-18T18:07:15.000Z');
  assert.equal(Object.keys(ls).length, 5, 'the stamp must not count as a lift');
});
