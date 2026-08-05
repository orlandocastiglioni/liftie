import trails from '../trails/index.js';

// Winter Wayback snapshot (2024-01-11): South & Snoopy runs Open, North mostly
// Closed. Exercises the emoji difficulty prefixes and the <span>-wrapped Open
// status. Apostrophes are the page's curly ’ (U+2019, entity-decoded).
trails('loch-lomond', [
  { name: 'Upper Sunbowl', status: 'open', level: 'green' },
  { name: 'Lower Sunbowl', status: 'open', level: 'green' },
  { name: 'Cliff', status: 'open', level: 'blue' },
  { name: 'Mullet', status: 'open', level: 'blue' },
  { name: 'Upper Pine', status: 'open', level: 'blue' },
  { name: 'Lower Pine', status: 'open', level: 'blue' },
  { name: 'Snoopy', status: 'open', level: 'green' },
  { name: 'Terrain Park', status: 'open', level: 'terrainPark' },
  { name: 'Chicken', status: 'closed', level: 'green' },
  { name: 'Kitzbuel', status: 'closed', level: 'green' },
  { name: 'Upper Maple', status: 'closed', level: 'blue' },
  { name: 'Lower Maple', status: 'closed', level: 'blue' },
  { name: 'Zipper', status: 'closed', level: 'blue' },
  { name: 'Birch', status: 'open', level: 'black' },
  { name: 'Old Joe’s', status: 'closed', level: 'black' },
  { name: 'Giant', status: 'closed', level: 'black' },
  { name: 'Jolly Giant', status: 'closed', level: 'doubleBlack' },
  { name: 'Devil’s Dive', status: 'closed', level: 'doubleBlack' }
]);
