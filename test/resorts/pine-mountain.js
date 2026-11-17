import lifts from '../lifts/index.js';

// lib/resorts/pine-mountain/season.js publishes nothing before resort.json's
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

// mid-winter snapshot (2025-01-14) of the "ALL OPEN LIFTS" tab pane - the
// site never lists closed lifts, so the roster in index.js supplies them
lifts('pine-mountain', 'html', {
  'Bunny Hill Rope Tow': 'open',
  Hematite: 'open',
  Panorama: 'open'
});

// 2024-03-01 snapshot, where the rope tow was typed as "Bunny Hill (Tow
// Rope)" - the loose roster match has to fold it back onto the same key
lifts(
  'pine-mountain',
  'html',
  {
    'Bunny Hill Rope Tow': 'open',
    Hematite: 'open',
    Panorama: 'open'
  },
  { example: 'pine-mountain-2024' }
);
