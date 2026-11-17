import assert from 'node:assert/strict';
import test from 'node:test';
import { beforeOpening } from '../../lib/resorts/maple-ski-ridge/season.js';
import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// 2026-11-17: the page still serves last winter's undated report (both chairs
// and 6 of 8 trails "Yes"). Before resort.json's opening day nothing publishes.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-11-17T15:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-11-17T15:00:00Z');
  }
};

lifts('maple-ski-ridge', 'html', {});
trails('maple-ski-ridge', []);

test('maple-ski-ridge: the gate opens at local midnight on opening day', () => {
  assert.equal(beforeOpening(new RealDate(2026, 11, 4, 23, 59).getTime()), true);
  assert.equal(beforeOpening(new RealDate(2026, 11, 5, 0, 0).getTime()), false);
});
