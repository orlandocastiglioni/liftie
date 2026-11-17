import trails from '../trails/index.js';

// Same 2026-11-17 capture as coffee-mill-ski-area.js, clock pinned the same way.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-11-17T17:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-11-17T17:00:00Z');
  }
};

trails('coffee-mill-ski-area', [
  { name: 'MIDWAY', status: 'closed', level: 'green' },
  { name: 'KITTY WALK', status: 'closed', level: 'green' },
  { name: 'CHIPPEWA', status: 'closed', level: 'green' },
  { name: 'CHIPPEWA CONNECT', status: 'closed', level: 'green' },
  { name: 'SINGING HILL', status: 'closed', level: 'terrainPark' },
  { name: 'OFF CHUTE', status: 'closed', level: 'terrainPark' },
  { name: 'RUN OF THE MILL', status: 'closed', level: 'blue' },
  { name: 'BARNSTORMER', status: 'closed', level: 'blue' },
  { name: "NELLIE'S PASS", status: 'closed', level: 'blue' },
  { name: "AUGGIE'S CHUTE", status: 'closed', level: 'black' },
  { name: 'FALL LINE', status: 'closed', level: 'black' },
  { name: 'WIND DOWN', status: 'closed', level: 'black' },
  { name: "DICK'S DIVE", status: 'closed', level: 'black' },
  { name: 'O CHUTE', status: 'closed', level: 'black' }
]);
