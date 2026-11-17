import lifts from '../lifts/index.js';

// Captured 2026-11-17: still closing day's report ("Date / Time Mar 29, 2026 - 6:00 AM";
// the page's own counts say 4 lifts and 21 trails open). The report is gated by
// lib/tools/stale.js on that stamp, so the clock is pinned to the day after it.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-03-30T15:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-03-30T15:00:00Z');
  }
};

lifts('whitecap-mountains-resort', 'html', {
  'Long Chair': 'closed',
  'Midway Chair': 'open',
  'Main Chair': 'open',
  'Triple Chair': 'open',
  'Magic Carpet': 'open'
});
