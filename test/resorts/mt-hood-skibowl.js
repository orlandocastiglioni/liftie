import lifts from '../lifts/index.js';

// Wayback capture of 2026-02-08 (weather table Date "2.7.26"). The board is gated by
// lib/tools/stale.js on that date, so the clock is pinned to the day after it.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-02-08T12:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-02-08T12:00:00Z');
  }
};

lifts('mt-hood-skibowl', 'html', {
  'Lower Bowl Chair': 'closed',
  'Upper Bowl Chair': 'closed',
  'West Rope Tow Terrain Park': 'open',
  'West Learning Conveyor Lift': 'closed',
  'Multorpor Chair': 'closed',
  'Handle Tow': 'closed',
  'Cascade Chair': 'closed',
  'Snow Tube Conveyor Lift': 'open'
});
