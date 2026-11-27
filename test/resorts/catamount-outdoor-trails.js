import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parser from '../../lib/lifts/parser.js';
import descriptor from '../../lib/resorts/catamount-outdoor/trails.js';
import collect from '../../lib/trails/parse.js';
import trails from '../trails/index.js';
import { pinDate, trailsOf } from './support/parse.js';

// The Jul 9 2026 capture is Trailforks' default Mountain Bike report - what a
// URL without activitytype gets - so nothing is published.
trails('catamount-outdoor', []);

test('catamount-outdoor marks a bike report as summer', async () => {
  const rows = await trailsOf('catamount-outdoor', 'catamount-outdoor.html');
  assert.deepEqual(rows.suppressed, { reason: 'summer' });
});

function parseWithActivity(value) {
  const html = readFileSync(resolve(import.meta.dirname, 'example/catamount-outdoor.html'), 'utf8')
    .replace('<option value="1" selected="selected">', '<option value="1">')
    .replace(`<option value="${value}">`, `<option value="${value}" selected="selected">`);
  return new Promise((ok, fail) =>
    parser(
      dom => collect(dom, descriptor),
      (err, list) => (err ? fail(err) : ok(list))
    ).end(html)
  );
}

test('catamount-outdoor: Winter Fat Bike is still a bike report', async () => {
  const rows = await parseWithActivity('17');
  assert.deepEqual(rows, []);
  assert.equal(rows.suppressed.reason, 'summer');
});

// The Nordic Ski view resort.json now asks for, captured live 2026-11-27: nine
// trails, each showing its latest Trailforks report whatever activity filed
// it - spring mud and wet, two November 4 "Ideal" bike reports, and one
// "Snow Covered" from 2026-01-18. None is a snow report from this season, so
// nothing publishes, marked off season and keyed on the newest report.
test('catamount-outdoor publishes no Nordic rows without a current snow report', async () => {
  const restore = pinDate('2026-11-27T20:00:00Z');
  try {
    const rows = await trailsOf('catamount-outdoor', 'catamount-outdoor-nordic.html');
    assert.deepEqual(rows, []);
    assert.deepEqual(rows.suppressed, { reason: 'offseason', date: '2026-11-04T12:00:00.000Z' });
  } finally {
    restore();
  }
});

// The same capture read a week after the January snow report: that one row,
// Snow Covered and inside stale.js's window, is published; the bike-condition
// rows still are not.
test('catamount-outdoor publishes a fresh snow report', async () => {
  const restore = pinDate('2026-01-25T20:00:00Z');
  try {
    const rows = await trailsOf('catamount-outdoor', 'catamount-outdoor-nordic.html');
    assert.deepEqual(rows, [{ name: 'Geronimo', status: 'open', level: 'blue' }]);
    assert.equal(rows.suppressed, undefined);
  } finally {
    restore();
  }
});
