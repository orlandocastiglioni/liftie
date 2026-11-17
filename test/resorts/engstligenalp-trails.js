import trails from '../trails/index.js';

// Wayback capture of winter.json, 2026-02-24 20:00 (Resort.Date): the cable car
// and all T-bars running (StatusID 1), the GLOBI cabin closed (16), runs open
// (8) except Carving and Stäghorn (15). The export is date-gated, so the clock
// is pinned to the next day.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-02-25T12:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-02-25T12:00:00Z');
  }
};

trails(
  'engstligenalp',
  [
    { name: '100 Dossen', status: 'open', level: 'doubleBlack', grade: 'schwarz' },
    { name: '101 Rennpiste', status: 'open', level: 'doubleBlack', grade: 'schwarz' },
    { name: '102 Strubel', status: 'open', level: 'blue', grade: 'blau' },
    { name: '103 Carving', status: 'closed', level: 'black', grade: 'rot' },
    { name: '104 Gollet', status: 'open', level: 'black', grade: 'rot' },
    { name: '105 Bockmatti', status: 'open' },
    { name: '106 Bockmatti', status: 'open', level: 'blue', grade: 'blau' },
    { name: '107 Stäghorn', status: 'closed', level: 'blue', grade: 'blau' },
    { name: '108 Horä-Trail', status: 'open' },
    { name: '109 Kinderpiste', status: 'open', level: 'blue', grade: 'blau' },
    { name: '110 Ponypiste', status: 'open', level: 'blue', grade: 'blau' }
  ],
  { ext: 'json' }
);
