import trails from '../trails/index.js';

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

trails('centre-vorlage', [
  { name: 'Lookout', status: 'open', level: 'blue' },
  { name: 'Birch Valley', status: 'open', level: 'blue' },
  { name: 'Golden Trail', status: 'open', level: 'blue' },
  { name: 'Cream Puff', status: 'open', level: 'black' },
  { name: 'Chien Chaud', status: 'open', level: 'black' },
  { name: 'North Slope', status: 'open', level: 'blue' },
  { name: 'Maple Lane', status: 'open', level: 'blue' },
  { name: 'Easy Rider', status: 'open', level: 'green' },
  { name: 'Snow Dance', status: 'open', level: 'blue' },
  { name: 'La Chute', status: 'open', level: 'black' },
  { name: 'Carnaval', status: 'open', level: 'black' },
  { name: 'Headwall', status: 'closed', level: 'doubleBlack' },
  { name: 'Cote Des Neiges', status: 'closed', level: 'blue' },
  { name: 'Sun Dance', status: 'closed', level: 'green' },
  { name: 'Upper Sun Dance', status: 'closed', level: 'blue' },
  { name: 'La Pente Douce', status: 'open', level: 'green' },
  { name: 'Arcade', status: 'open', level: 'black' },
  { name: 'Radar', status: 'open', level: 'black' },
  { name: 'La Grande Boucle (Rando)', status: 'open', level: 'blue' },
  { name: 'Fox Run', status: 'open', level: 'black' }
]);
