import lifts from '../lifts/index.js';

// Wayback capture of 2026-03-05 (report "Updated March 2, 2026 at 12:40 PM").
// The report is gated by lib/tools/stale.js on that stamp, so the clock is pinned
// to the day after it.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-03-03T15:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-03-03T15:00:00Z');
  }
};

lifts('mt-ashland', 'html', {
  'First Act Learning Carpet': 'open',
  'Sonnet Triple Chair (easiest)': 'closed',
  'Lithia Triple Chair': 'open',
  'Comer Triple Chair': 'open',
  'Windsor Double Chair': 'open',
  'Ariel Double Chair': 'open'
});
