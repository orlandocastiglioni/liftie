import lifts from '../lifts/index.js';

// The parser drops a report dated May-October or older than lib/tools/stale.js's
// window (lib/resorts/centre-vorlage/season.js), so the clock is pinned to the
// day after the fixture's own "Last Updated" stamp (2026-02-06 07:55).
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-02-07T12:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-02-07T12:00:00Z');
  }
};

lifts('centre-vorlage', 'html', {
  Birch: 'open',
  'Magic Carpet': 'open',
  North: 'open',
  'Pente Douce': 'closed'
});
