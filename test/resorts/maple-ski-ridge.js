import lifts from '../lifts/index.js';

// lib/resorts/maple-ski-ridge/season.js publishes nothing before resort.json's
// opening day, so the clock is pinned to a winter day after it.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2027-01-15T15:00:00Z']));
  }
  static now() {
    return RealDate.parse('2027-01-15T15:00:00Z');
  }
};

lifts('maple-ski-ridge', 'html', {
  'Triple Chair Lift': 'open',
  'Double Chair Lift': 'open',
  'Handle Tow 2': 'closed',
  'Handle Tow 1': 'closed'
});
