import assert from 'node:assert/strict';
import test from 'node:test';
import { inSeason } from '../../lib/resorts/spring-mountain-adventures/season.js';
import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// 2026-11-17: the page still shows last season's board (three lifts OPEN).
// Before resort.json's opening day nothing publishes.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-11-17T15:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-11-17T15:00:00Z');
  }
};

lifts('spring-mountain-adventures', 'html', {});
trails('spring-mountain-adventures', []);

test('spring-mountain-adventures: the season window runs from opening day to May 1', () => {
  assert.equal(inSeason(new RealDate(2026, 11, 11, 23, 59).getTime()), false);
  assert.equal(inSeason(new RealDate(2026, 11, 12, 0, 0).getTime()), true);
  assert.equal(inSeason(new RealDate(2027, 3, 30, 23, 59).getTime()), true);
  assert.equal(inSeason(new RealDate(2027, 4, 1, 0, 0).getTime()), false);
});
