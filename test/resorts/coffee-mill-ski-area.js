import lifts from '../lifts/index.js';

// Real capture of /pages/mountain-report-lift-status, 2026-11-17 (scripts
// stripped). Pre-season: every row CLOSED. The report is undated, so the
// parser publishes only inside table.js's recurring season window; the clock
// is pinned to the capture day, which is inside it.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-11-17T17:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-11-17T17:00:00Z');
  }
};

lifts('coffee-mill-ski-area', 'html', {
  'RUN OF THE MILL CHAIR': 'closed',
  'BARN STORMER CHAIR': 'closed',
  'HANDLE TOW': 'closed'
});
