import trails from '../trails/index.js';

// Live capture 2026-11-17 (scripts stripped): "Closed: All Trails", "Closed for
// the season", updated 2026-04-01. Read the day after that update, "All
// Trails" expands to the roster, all closed.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-04-02T18:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-04-02T18:00:00Z');
  }
};

trails(
  'elm-creek-park-reserve',
  [
    { name: 'Valley', status: 'closed' },
    { name: 'Lake', status: 'closed' },
    { name: 'Northern Lights', status: 'closed' },
    { name: 'Creek', status: 'closed' },
    { name: 'Eagle', status: 'closed' },
    { name: 'Monarch', status: 'closed' }
  ],
  { example: 'elm-creek-park-reserve-stale' }
);
