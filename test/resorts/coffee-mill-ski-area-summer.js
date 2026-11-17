import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// The same capture read in July: outside the season window the undated report
// publishes no rows at all (not "closed").
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2027-07-15T17:00:00Z']));
  }
  static now() {
    return RealDate.parse('2027-07-15T17:00:00Z');
  }
};

lifts('coffee-mill-ski-area', 'html', {});
trails('coffee-mill-ski-area', []);
