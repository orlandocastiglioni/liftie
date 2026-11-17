import trails from '../trails/index.js';

// Wayback capture of 2026-02-09 (in season): the Earth Dragon field running,
// the Sky Dragon field closed. Levels come from the Course Guide badges.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-02-09T12:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-02-09T12:00:00Z');
  }
};

trails('togari-onsen-snow-resort', [
  { name: 'Dragon Park', status: 'open', level: 'terrainPark' },
  { name: 'Wing Line', status: 'open', level: 'black', grade: 'Expert' },
  { name: 'Spike Line', status: 'open', level: 'blue', grade: 'Intermediate' },
  { name: 'Spike Tail', status: 'open', level: 'green', grade: 'Easy' },
  { name: 'Tail Line', status: 'open', level: 'green', grade: 'Easy' },
  { name: 'Foot Line', status: 'open', level: 'blue', grade: 'Intermediate' },
  { name: 'Claw Line', status: 'open', level: 'black', grade: 'Expert' },
  { name: 'Backbone', status: 'open', level: 'blue', grade: 'Intermediate' },
  { name: 'Contact Line B', status: 'closed' },
  { name: 'Scale Line', status: 'open', level: 'green', grade: 'Easy' },
  { name: 'Cloud Line', status: 'closed', level: 'blue', grade: 'Intermediate' },
  { name: 'Whisker Line', status: 'closed', level: 'green', grade: 'Easy' },
  { name: 'Dragon Head', status: 'closed', level: 'black', grade: 'Expert' },
  { name: 'Breath Line', status: 'closed', level: 'green', grade: 'Easy' },
  { name: 'Eyes Line', status: 'closed', level: 'blue', grade: 'Intermediate' },
  { name: 'Fang Line', status: 'closed', level: 'green', grade: 'Easy' },
  { name: 'Contact Line A', status: 'closed' }
]);
