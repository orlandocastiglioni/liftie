import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// Live page fetched 2026-11-17: still headed "Tuesday, April 7th, 2026 - Closed
// for the Ski Season", seven months old, so nothing publishes.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-11-17T15:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-11-17T15:00:00Z');
  }
};

lifts('holimont', 'html', {});

trails('holimont', []);
