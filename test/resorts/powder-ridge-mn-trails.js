import trails from '../trails/index.js';

// same 2023-12-10 snapshot: 16 trails, mixed open/closed. Difficulty is
// fused into the name ("Single Cedar (intermediate):") and the three
// "(difficult)" terrain parks are re-levelled to terrainPark.
trails('powder-ridge-mn', [
  { name: 'Beginner Hill', status: 'open', level: 'green' },
  { name: 'Single Cedar', status: 'open', level: 'blue' },
  { name: 'Outback', status: 'open', level: 'green' },
  { name: 'The Chute', status: 'open', level: 'blue' },
  { name: 'Gun Powder', status: 'closed', level: 'black' },
  { name: 'Zonker', status: 'closed', level: 'black' },
  { name: 'Side Winder', status: 'closed', level: 'black' },
  { name: 'High Noon', status: 'closed', level: 'black' },
  { name: 'Knoll', status: 'closed', level: 'black' },
  { name: 'Powder Puff', status: 'closed', level: 'blue' },
  { name: 'North Run', status: 'closed', level: 'green' },
  { name: "Chester's Dive", status: 'closed', level: 'green' },
  { name: 'Head Wall', status: 'closed', level: 'black' },
  { name: 'North Park - Terrain Park', status: 'closed', level: 'terrainPark' },
  { name: 'South Park - Terrain Park', status: 'closed', level: 'terrainPark' },
  { name: 'Kowabunga - Terrain Park', status: 'closed', level: 'terrainPark' }
]);
