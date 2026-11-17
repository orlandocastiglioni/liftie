import lifts from '../lifts/index.js';

// Captured 2026-11-17 from /conditions/. The board on it is still last season's last
// report, so it serves as a structural fixture; season.js only publishes inside the
// season window, so the clock is pinned to a January day inside it.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2027-01-10T15:00:00Z']));
  }
  static now() {
    return RealDate.parse('2027-01-10T15:00:00Z');
  }
};

lifts('spring-mountain-adventures', 'html', {
  'Terrain Tow Rope': 'closed',
  'Black Granite': 'open',
  'Boulder': 'open',
  'Rocktop': 'closed',
  'Stonehill chairlift': 'closed',
  'Magic Carpet': 'open'
});
