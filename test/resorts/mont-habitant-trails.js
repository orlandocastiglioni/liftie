import trails from '../trails/index.js';

// maneige category counts synthesized into summary rows (no per-trail names
// exist). Fixture: maneige REST post 449 (late-season: 10/11 day trails open,
// night trails / glades off, terrain park + alpine touring open).
trails(
  'mont-habitant',
  [
    { name: 'Trails (day): 10/11 open', status: 'open' },
    { name: 'Trails (night): 0/11 open', status: 'closed' },
    { name: 'Glades: 0/2 open', status: 'closed' },
    { name: 'Terrain parks: 1/1 open', status: 'open', level: 'terrainPark' },
    { name: 'Alpine touring: 1/1 open', status: 'open' }
  ],
  { ext: 'json' }
);
