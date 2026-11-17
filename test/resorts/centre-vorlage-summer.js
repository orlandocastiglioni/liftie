import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parser from '../../lib/lifts/parser.js';
import { isOffSeason, lastUpdated } from '../../lib/resorts/centre-vorlage/season.js';
import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// 2026-11-17 capture: the page still carries the bike park (trails "Dry",
// "Wet", "Good - Branches on trail look out"), last updated 2026-10-08. Nothing
// is published until a ski report replaces it. Pinned to the capture day.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-11-17T15:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-11-17T15:00:00Z');
  }
};

lifts('centre-vorlage', 'html', {}, { example: 'centre-vorlage-summer' });
trails('centre-vorlage', [], { example: 'centre-vorlage-summer' });

function dom(name) {
  const html = readFileSync(resolve(import.meta.dirname, `example/${name}.html`), 'utf8');
  return new Promise((ok, fail) =>
    parser(
      d => d,
      (err, d) => (err ? fail(err) : ok(d))
    ).end(html)
  );
}

test('centre-vorlage: reads the Last Updated header', async () => {
  const updated = lastUpdated(await dom('centre-vorlage-summer'));
  assert.deepEqual([updated.year, updated.month, updated.day], [2026, 10, 8]);
});

test('centre-vorlage: a November ski report is in season', async () => {
  const html = readFileSync(resolve(import.meta.dirname, 'example/centre-vorlage-summer.html'), 'utf8').replace(
    '2026-10-08 13:07',
    '2026-11-16 08:00'
  );
  const d = await new Promise((ok, fail) =>
    parser(
      x => x,
      (err, x) => (err ? fail(err) : ok(x))
    ).end(html)
  );
  assert.equal(isOffSeason(d), false);
});

test('centre-vorlage: no date at all fails open', async () => {
  const html = readFileSync(resolve(import.meta.dirname, 'example/centre-vorlage-summer.html'), 'utf8').replace(
    'Last Updated',
    'Updated'
  );
  const d = await new Promise((ok, fail) =>
    parser(
      x => x,
      (err, x) => (err ? fail(err) : ok(x))
    ).end(html)
  );
  assert.equal(isOffSeason(d), false);
});
