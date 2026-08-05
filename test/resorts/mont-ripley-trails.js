import trails from '../trails/index.js';

// same winter capture as the lifts: the "Run Status" table, 24 runs in page
// order (18 open, matching the "Trails Open 18/25" line in Fast Facts)
trails('mont-ripley', [
  { name: 'That Road', status: 'open', level: 'green' },
  { name: 'Toots Tumble', status: 'open', level: 'green' },
  { name: 'The Dail Learning Area', status: 'open', level: 'green' },
  { name: 'Bypass', status: 'open', level: 'green' },
  { name: 'Deer Track Trail', status: 'closed', level: 'blue' },
  { name: 'Danny Boy', status: 'open', level: 'blue' },
  { name: "Fred's Landing", status: 'open', level: 'blue' },
  { name: 'Center Bowl', status: 'open', level: 'blue' },
  { name: "Racer's Ridge", status: 'open', level: 'blue' },
  { name: 'The Ripley Triangle', status: 'open', level: 'blue' },
  { name: 'Look Out', status: 'closed', level: 'blue' },
  { name: 'Powder Stash', status: 'closed', level: 'blue' },
  { name: 'Rhythm Terrain Park', status: 'open', level: 'terrainPark' },
  { name: 'Husky Bowl', status: 'open', level: 'black' },
  { name: 'The Chute', status: 'open', level: 'black' },
  { name: 'Certified', status: 'open', level: 'black' },
  { name: 'Wipeout', status: 'open', level: 'black' },
  { name: 'Bonzai', status: 'open', level: 'black' },
  { name: 'Copper Chute Glade', status: 'closed', level: 'black' },
  { name: 'The Plunge', status: 'closed', level: 'black' },
  { name: 'Powder Stash Glade', status: 'closed', level: 'black' },
  { name: 'Cannonball', status: 'open', level: 'black' },
  { name: 'Buddha Bowl', status: 'open', level: 'doubleBlack' },
  { name: 'Trestle', status: 'open', level: 'doubleBlack' }
]);
