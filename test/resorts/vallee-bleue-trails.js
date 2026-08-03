import trails from '../trails/index.js';

// maneige category counts synthesized into summary rows (no per-trail names
// exist). Fixture: maneige REST post 456 (out of season, all categories 0/total;
// night trails and tube slides have total 0 and are skipped).
trails(
  'vallee-bleue',
  [
    { name: 'Trails (day): 0/25 open', status: 'closed' },
    { name: 'Glades: 0/5 open', status: 'closed' },
    { name: 'Terrain parks: 0/2 open', status: 'closed', level: 'terrainPark' },
    { name: 'Alpine touring: 0/1 open', status: 'closed' }
  ],
  { ext: 'json' }
);
