import lifts from '../lifts/index.js';

// Wayback capture of /conditions/ from 2026-02-11 (web.archive.org
// 20260211153054, scripts stripped): "Lifts: 3/4 Trails: 13". The rows are
// gated on the report's own date, so the clock is pinned to that day.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-02-11T20:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-02-11T20:00:00Z');
  }
};

lifts('blue-hills-ski-area', 'html', {
  Double: 'open',
  'Tea Party': 'open',
  Fenway: 'open',
  Treeline: 'closed'
});
