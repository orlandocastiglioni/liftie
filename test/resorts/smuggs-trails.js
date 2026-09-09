import trails from '../trails/index.js';

// fixture is a hand-flipped subset of the live feed (all closed off-season):
// one row per difficulty, an entity-encoded name, and two Nordic Adventure
// Center rows - one of them open - that must not be published
trails(
  'smuggs',
  [
    { name: 'Curley’s Cutback', status: 'closed', level: 'green' },
    { name: 'Burton Riglet Park', status: 'closed', level: 'terrainPark' },
    { name: 'Hangman’s', status: 'open', level: 'blue' },
    { name: 'Black Bear', status: 'closed', level: 'black' },
    { name: 'Freefall', status: 'open', level: 'doubleBlack' },
    { name: 'Black Hole', status: 'closed', level: 'doubleBlack' },
    { name: 'Lower Chilcoot', status: 'closed', level: 'blue' }
  ],
  { ext: 'json', example: 'smuggs-trails' }
);
