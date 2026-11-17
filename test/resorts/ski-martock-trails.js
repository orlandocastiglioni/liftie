import trails from '../trails/index.js';

// SYNTHETIC in-season variant of the real operations.php answer of 2026-11-17
// (fetched once with the owner's approval): `updated` moved to 2026-01-17 and a
// few states set by hand - the quad and the carpet open, Buttermilk, Sundance
// and Expressway open, Strawberry Jinx "partial" (open), Upper Glades on hold.
// The answer is date-gated, so the clock is pinned to the next day.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-01-18T12:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-01-18T12:00:00Z');
  }
};

trails(
  'ski-martock',
  [
    { name: 'Buttermilk', status: 'open', level: 'green', grade: 'easiest' },
    { name: 'Ski Bunny Hill', status: 'closed', level: 'green', grade: 'easiest' },
    { name: 'Snowboard Bunny Hill', status: 'closed', level: 'green', grade: 'easiest' },
    { name: 'Riglet Park', status: 'closed', level: 'green', grade: 'easiest' },
    { name: 'Head / Start', status: 'closed', level: 'green', grade: 'easiest' },
    { name: 'The Bump', status: 'closed', level: 'green', grade: 'easiest' },
    { name: 'Shane’s Solution', status: 'closed', level: 'blue', grade: 'intermediate' },
    { name: 'Strawberry Jinx', status: 'open', level: 'blue', grade: 'intermediate' },
    { name: 'Sundance', status: 'open', level: 'blue', grade: 'intermediate' },
    { name: 'Expressway', status: 'open', level: 'blue', grade: 'intermediate' },
    { name: 'Upper Glades', status: 'hold', level: 'blue', grade: 'intermediate' },
    { name: 'Lower Glades', status: 'closed', level: 'blue', grade: 'intermediate' },
    { name: 'Terrain Park', status: 'closed', level: 'terrainPark', grade: 'freestyle' }
  ],
  { example: 'ski-martock-season', ext: 'json' }
);
