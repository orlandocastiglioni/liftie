import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// Live page fetched 2026-11-17: both tables open on "CLOSED FOR THE SEASON",
// so nothing publishes - not "closed", the rows under it are no report.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-11-17T15:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-11-17T15:00:00Z');
  }
};

lifts('holiday-mountain', 'html', {});

trails('holiday-mountain', []);
