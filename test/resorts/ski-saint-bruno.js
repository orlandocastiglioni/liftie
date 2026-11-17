import lifts from '../lifts/index.js';

// Wayback capture of 2026-02-10 (mid-season, Hydro-Quebec peak-demand notice on
// the page). The board has no date stamp, so the parser gates on the calendar
// (nothing in May-October); the clock is pinned to the capture day.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-02-10T12:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-02-10T12:00:00Z');
  }
};

lifts('ski-saint-bruno', 'html', {
  'A Triple chairlift': 'open',
  'B Quad chairlift': 'open',
  'C Quad chairlift': 'closed',
  '1 – SKIGO + SNOGO Matlift': 'open',
  '2 – Track 10 Matlift': 'open',
  '3 – Track 9 Matlift': 'closed',
  '4 – Fantaski Matlift': 'closed',
  'D Triple chairlift': 'open'
});
