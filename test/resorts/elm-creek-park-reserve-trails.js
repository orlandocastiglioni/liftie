import trails from '../trails/index.js';

// Wayback capture of the district's XC trail-conditions page, 2026-02-07
// (web.archive.org 20260207164426, scripts stripped). Elm Creek's block is
// dated 2026-02-06; the clock is pinned to the capture day so stale.js passes.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-02-07T18:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-02-07T18:00:00Z');
  }
};

trails('elm-creek-park-reserve', [
  { name: 'Valley', status: 'open' },
  { name: 'Lake', status: 'open' },
  { name: 'Northern Lights', status: 'open' },
  { name: 'Creek', status: 'open' },
  { name: 'Eagle', status: 'open' },
  { name: 'Monarch', status: 'open' }
]);
