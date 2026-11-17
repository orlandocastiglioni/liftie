import trails from '../trails/index.js';

// same rendered 2026-11-17 fixture as the lift test: 23 trails in five
// groups. "Extreme Difficulty" maps to doubleBlack and "Freestyle Terrain" to
// terrainPark through the parser's own group table.
trails('massanutten', [
  { name: 'Boardwalk', status: 'closed', level: 'green' },
  { name: 'Easy Street', status: 'closed', level: 'green' },
  { name: 'Meadow', status: 'closed', level: 'green' },
  { name: "Paul's Way", status: 'closed', level: 'green' },
  { name: 'Southern Comfort', status: 'closed', level: 'green' },
  { name: 'Upper Nutten-To-It', status: 'closed', level: 'green' },
  { name: 'Lower MAKAttack', status: 'closed', level: 'blue' },
  { name: 'Lower Mass Transit', status: 'closed', level: 'blue' },
  { name: 'Lower Showtime', status: 'closed', level: 'blue' },
  { name: "Mueller's Mile", status: 'closed', level: 'blue' },
  { name: 'Ridgecrest', status: 'closed', level: 'blue' },
  { name: 'Upper Mass Transit', status: 'closed', level: 'blue' },
  { name: 'Upper ParaDice', status: 'closed', level: 'blue' },
  { name: 'Upper Showtime', status: 'closed', level: 'blue' },
  { name: 'YeeHa', status: 'closed', level: 'blue' },
  { name: 'Lower Diamond Jim', status: 'closed', level: 'black' },
  { name: 'Lower ParaDice', status: 'closed', level: 'black' },
  { name: 'Slot', status: 'closed', level: 'black' },
  { name: 'Upper Diamond Jim', status: 'closed', level: 'black' },
  { name: 'Upper MAKAttack', status: 'closed', level: 'black' },
  { name: 'No Hessitation', status: 'closed', level: 'doubleBlack' },
  { name: 'Lower Nutten-To-It', status: 'closed', level: 'terrainPark' },
  { name: 'Pacesetter', status: 'closed', level: 'terrainPark' }
]);
