import trails from '../trails/index.js';

// maneige category counts synthesized into summary rows (no per-trail names
// exist, even mid-winter). Fixture: maneige REST post 46128 (out of season, all
// categories 0/total; night trails have total 0 and alpine touring total is ''
// -> both skipped).
trails(
  'val-direne',
  [
    { name: 'Trails (day): 0/35 open', status: 'closed' },
    { name: 'Glades: 0/14 open', status: 'closed' },
    { name: 'Terrain parks: 0/1 open', status: 'closed', level: 'terrainPark' }
  ],
  { ext: 'json' }
);
