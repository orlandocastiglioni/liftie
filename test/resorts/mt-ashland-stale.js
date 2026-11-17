import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// The same 2026-03-02 report read in November: older than lib/tools/stale.js's
// window, so nothing publishes (not "closed").
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-11-17T15:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-11-17T15:00:00Z');
  }
};

lifts('mt-ashland', 'html', {});
trails('mt-ashland', []);
