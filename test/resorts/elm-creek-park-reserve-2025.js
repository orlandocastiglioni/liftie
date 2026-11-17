import trails from '../trails/index.js';

// Wayback capture 2025-02-09 (20250209144126, scripts stripped): the park's
// block runs over two <p>s and closes "Eagle & Monarch Trails".
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2025-02-09T18:00:00Z']));
  }
  static now() {
    return RealDate.parse('2025-02-09T18:00:00Z');
  }
};

trails(
  'elm-creek-park-reserve',
  [
    { name: 'Valley', status: 'open' },
    { name: 'Northern Lights', status: 'open' },
    { name: 'Lake', status: 'open' },
    { name: 'Creek', status: 'open' },
    { name: 'Eagle', status: 'closed' },
    { name: 'Monarch', status: 'closed' }
  ],
  { example: 'elm-creek-park-reserve-2025' }
);
