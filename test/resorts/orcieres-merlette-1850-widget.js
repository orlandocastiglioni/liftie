import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import { reportDate, rows, statusOf } from '../../lib/resorts/orcieres-merlette-1850/widget.js';

const fixture = readFileSync(resolve(import.meta.dirname, 'example/orcieres-merlette-1850.html'), 'utf8');

function withDom(html) {
  return new Promise((done, fail) =>
    parseHtml(
      html,
      dom => dom,
      (err, dom) => (err ? fail(err) : done(dom))
    )
  );
}

function dated(line) {
  return fixture.replace('Updated on 11/12/2026 04:42 AM', line);
}

test('orcieres widget: legend labels map to liftie states, unknown ones to nothing', () => {
  assert.equal(statusOf('out of period'), 'closed');
  assert.equal(statusOf('closed'), 'closed');
  assert.equal(statusOf('Fermé'), 'closed');
  assert.equal(statusOf('Open'), 'open');
  assert.equal(statusOf('temporarily closed'), 'hold');
  assert.equal(statusOf('opening forecast'), 'scheduled');
  assert.equal(statusOf('?'), undefined);
  assert.equal(statusOf(''), undefined);
});

test('orcieres widget: "Updated on" is resort local time (CET in winter, CEST in summer)', async () => {
  assert.equal(reportDate(await withDom(fixture)).toISOString(), '2026-11-12T03:42:00.000Z');
  assert.equal(
    reportDate(await withDom(dated('Updated on 07/01/2026 12:30 PM'))).toISOString(),
    '2026-07-01T10:30:00.000Z'
  );
  assert.equal(
    reportDate(await withDom(dated('Updated on 01/05/2027 12:05 AM'))).toISOString(),
    '2027-01-04T23:05:00.000Z'
  );
});

test('orcieres widget: a provably old board publishes no rows, never "closed"', async () => {
  const dom = await withDom(dated('Updated on 03/30/2026 05:00 PM'));
  assert.deepEqual(rows(dom, 'lifts'), []);
  assert.deepEqual(rows(dom, 'slopes'), []);
});

test('orcieres widget: no parseable date fails open and is not dated', async () => {
  const dom = await withDom(dated('Updated on'));
  const lifts = rows(dom, 'lifts');
  assert.equal(lifts.length, 29);
  assert.equal(lifts.reportedAt, undefined);
});

test('orcieres widget: rows carry the board date as reportedAt', async () => {
  const lifts = rows(await withDom(fixture), 'lifts');
  assert.equal(lifts.reportedAt, '2026-11-12T03:42:00.000Z');
});

test('orcieres widget: a page without the widget yields nothing', async () => {
  assert.deepEqual(rows(await withDom('<html><body><p>maintenance</p></body></html>'), 'lifts'), []);
});
