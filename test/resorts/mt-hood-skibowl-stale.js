import lifts from '../lifts/index.js';

// The same 2026-02-07 board read in November: older than lib/tools/stale.js's
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

lifts('mt-hood-skibowl', 'html', {});
