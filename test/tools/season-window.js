import assert from 'node:assert/strict';
import test from 'node:test';
import outOfSeason from '../../lib/tools/season-window.js';

const at = iso => Date.parse(iso);
const winter = { from: '11-01', to: '04-15' };

test('season-window: inside a window that wraps New Year publishes', () => {
  for (const day of ['2026-11-01T18:00:00Z', '2026-12-25T18:00:00Z', '2027-01-01T18:00:00Z', '2027-04-15T18:00:00Z']) {
    assert.equal(outOfSeason(winter, at(day)), false, day);
  }
});

test('season-window: outside it suppresses', () => {
  for (const day of ['2027-04-16T18:00:00Z', '2027-07-04T18:00:00Z', '2026-10-31T18:00:00Z']) {
    assert.equal(outOfSeason(winter, at(day)), true, day);
  }
});

test('season-window: a same-year window', () => {
  const w = { from: '06-01', to: '08-31' };
  assert.equal(outOfSeason(w, at('2027-07-04T18:00:00Z')), false);
  assert.equal(outOfSeason(w, at('2027-01-04T18:00:00Z')), true);
});

test('season-window: the day is read in the resort zone', () => {
  // 03:00 UTC on Nov 1 is still Oct 31 in Chicago
  assert.equal(outOfSeason(winter, at('2026-11-01T03:00:00Z')), true);
  assert.equal(outOfSeason(winter, at('2026-11-01T03:00:00Z'), 'UTC'), false);
});

test('season-window: a malformed window fails open', () => {
  for (const w of [{}, { from: '11-01' }, { from: 'Nov 1', to: '04-15' }, { from: '13-01', to: '04-15' }]) {
    assert.equal(outOfSeason(w, at('2027-07-04T18:00:00Z')), false, JSON.stringify(w));
  }
});
