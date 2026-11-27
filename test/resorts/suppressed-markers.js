import assert from 'node:assert/strict';
import test from 'node:test';
import { liftsOf, pinDate, trailsOf } from './support/parse.js';

/**
 * Every gate that holds a board back says so (lib/tools/suppressed.js), so the
 * Pi's watchdog can tell a deliberately empty board from a rotted parser. One
 * case per gate, on each resort's existing fixtures, with the clock pinned to
 * a day the gate fires (or must not). The rows themselves are covered by each
 * resort's own test file.
 *
 * Dates built from a local-time constructor (Bryce, Hoodoo) are checked to
 * the day only: the ISO string depends on the host's zone.
 */
async function at(iso, fn) {
  const restore = pinDate(iso);
  try {
    return await fn();
  } finally {
    restore();
  }
}

const NOV_27 = '2026-11-27T20:00:00Z';

test('stale gates mark their empty board with the report date', async () => {
  await at(NOV_27, async () => {
    const cases = [
      ['baldy-mountain-resort', 'baldy-mountain-resort.html', /^2026-01-16T/],
      ['bryce-resort', 'bryce-resort.html', /^2026-03-1[45]T/],
      ['cherry-peak', 'cherry-peak.html', /^2026-03-07T15:15/],
      ['hoodoo', 'hoodoo-2026-11.html', /^2026-03-1[67]T/]
    ];
    for (const [id, fixture, day] of cases) {
      for (const rows of [await liftsOf(id, fixture), await trailsOf(id, fixture)]) {
        assert.equal(Object.keys(rows).length, 0, id);
        assert.equal(rows.suppressed?.reason, 'stale', id);
        assert.match(rows.suppressed.date, day, id);
      }
    }
  });
});

test('powder-ridge-ct marks each stale block with its own stamp', async () => {
  await at(NOV_27, async () => {
    assert.deepEqual((await liftsOf('powder-ridge-ct', 'powder-ridge-ct.json')).suppressed, {
      reason: 'stale',
      date: '2026-09-18T18:07:15.000Z'
    });
    assert.equal((await trailsOf('powder-ridge-ct', 'powder-ridge-ct.json')).suppressed?.reason, 'stale');
  });
});

test('nordic-pulse-fresh marks a stale area (dog-creek-lodge-nordic-center)', async () => {
  await at(NOV_27, async () => {
    const rows = await trailsOf('dog-creek-lodge-nordic-center', 'dog-creek-lodge-nordic-center.html');
    assert.deepEqual(rows, []);
    assert.equal(rows.suppressed?.reason, 'stale');
    assert.match(rows.suppressed.date, /^2026-01-2/);
  });
});

test('a fresh report carries no marker', async () => {
  await at('2026-01-17T12:00:00Z', async () => {
    const rows = await liftsOf('baldy-mountain-resort', 'baldy-mountain-resort.html');
    assert.ok(Object.keys(rows).length > 0);
    assert.equal(rows.suppressed, undefined);
  });
});

test('maple-ski-ridge marks the pre-opening board with the opening day', async () => {
  await at('2026-11-17T15:00:00Z', async () => {
    for (const rows of [
      await liftsOf('maple-ski-ridge', 'maple-ski-ridge.html'),
      await trailsOf('maple-ski-ridge', 'maple-ski-ridge.html')
    ]) {
      assert.deepEqual(rows.suppressed, { reason: 'beforeOpening', date: '2026-12-05' });
    }
  });
});

test("hunt-hollow marks the new site's pre-opening page with the badge's day", async () => {
  await at(NOV_27, async () => {
    for (const rows of [
      await liftsOf('hunt-hollow', 'hunt-hollow-2026.html'),
      await trailsOf('hunt-hollow', 'hunt-hollow-2026.html')
    ]) {
      assert.equal(Object.keys(rows).length, 0);
      assert.deepEqual(rows.suppressed, { reason: 'beforeOpening', date: '2026-12-05' });
    }
  });
  // past the announced day an empty board is no longer explained
  await at('2026-12-06T15:00:00Z', async () => {
    assert.equal((await liftsOf('hunt-hollow', 'hunt-hollow-2026.html')).suppressed, undefined);
  });
});

test('lost-valley marks an all "None Open" page', async () => {
  const rows = await trailsOf('lost-valley', 'lost-valley-2026-11.html');
  assert.deepEqual(rows, []);
  assert.deepEqual(rows.suppressed, { reason: 'noneOpen' });
  // the all-open collapse ("All Trails") is empty too, but is not "None Open"
  assert.equal((await trailsOf('lost-valley', 'lost-valley-all-trails.html')).suppressed, undefined);
});

test('les-7-laux marks a bulletin that has no sector cards yet', async () => {
  for (const rows of [
    await liftsOf('les-7-laux', 'les-7-laux-preseason.html'),
    await trailsOf('les-7-laux', 'les-7-laux-preseason.html')
  ]) {
    assert.equal(Object.keys(rows).length, 0);
    assert.deepEqual(rows.suppressed, { reason: 'offseason', date: '2026-11-27T12:01:00.000Z' });
  }
  assert.equal((await liftsOf('les-7-laux', 'les-7-laux.html')).suppressed, undefined);
});

test('pats-peak marks an emptied, Closed_for_Snow feed', async () => {
  for (const rows of [
    await liftsOf('pats-peak', 'pats-peak-closed.json'),
    await trailsOf('pats-peak', 'pats-peak-closed.json')
  ]) {
    assert.equal(Object.keys(rows).length, 0);
    assert.deepEqual(rows.suppressed, { reason: 'offseason', date: '2026-09-11T19:28:37.000Z' });
  }
  assert.equal((await liftsOf('pats-peak', 'pats-peak.json')).suppressed, undefined);
});
