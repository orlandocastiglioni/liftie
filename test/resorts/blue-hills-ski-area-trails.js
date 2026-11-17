import trails from '../trails/index.js';

// Same 2026-02-11 Wayback capture as blue-hills-ski-area.js: 13 of 14 open,
// Beer's Bluff carries the X. Clock pinned to the report day.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-02-11T20:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-02-11T20:00:00Z');
  }
};

trails('blue-hills-ski-area', [
  { name: 'Fenway', status: 'open', level: 'green' },
  { name: 'Plimoth', status: 'open', level: 'green' },
  { name: 'Sonya', status: 'open', level: 'green' },
  { name: 'Tea Party', status: 'open', level: 'green' },
  { name: 'Walsh’s', status: 'open', level: 'green' },
  { name: 'Way', status: 'open', level: 'green' },
  { name: 'Patriots', status: 'open', level: 'blue' },
  { name: 'Revolution', status: 'open', level: 'blue' },
  { name: 'Lower Big Blue', status: 'open', level: 'blue' },
  { name: 'Lover’s Lane', status: 'open', level: 'blue' },
  { name: 'Beer’s Bluff', status: 'closed', level: 'black' },
  { name: 'Chute', status: 'open', level: 'black' },
  { name: 'Sachem', status: 'open', level: 'black' },
  { name: 'Upper Big Blue', status: 'open', level: 'black' }
]);
