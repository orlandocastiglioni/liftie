import trails from '../trails/index.js';

// same 2025-12-05 capture as the lifts; 5 of the 22 trails are open, which is
// what that page's own counter reports. 'Way Out' shows up twice on purpose -
// once as an intermediate run and once as the terrain park. The open rows all
// carry a second 'Groomed' badge, so they also prove the status label is read
// without the modifier.
trails('hatley-pointe', [
  { name: 'Broadway', status: 'open', level: 'green' },
  { name: 'Eagle', status: 'open', level: 'green' },
  { name: "Pat's Way", status: 'open', level: 'green' },
  { name: 'Tennessee Walker', status: 'open', level: 'green' },
  { name: 'Hatley Highway', status: 'closed', level: 'blue' },
  { name: 'Lower Streak', status: 'closed', level: 'blue' },
  { name: 'Lower Viewfinder', status: 'closed', level: 'blue' },
  { name: 'Midway', status: 'closed', level: 'blue' },
  { name: 'Redemption Run', status: 'closed', level: 'blue' },
  { name: 'Side Slip', status: 'open', level: 'blue' },
  { name: 'Simply Savage', status: 'closed', level: 'blue' },
  { name: 'The Glades', status: 'closed', level: 'blue' },
  { name: 'The Howling', status: 'closed', level: 'blue' },
  { name: 'Upper Viewfinder', status: 'closed', level: 'blue' },
  { name: 'Way Out', status: 'closed', level: 'blue' },
  { name: 'Powder Hill', status: 'closed', level: 'black' },
  { name: 'Snowchute', status: 'closed', level: 'black' },
  { name: 'Upper Streak', status: 'closed', level: 'black' },
  { name: 'Flame Out', status: 'closed', level: 'doubleBlack' },
  { name: 'Southern Express', status: 'closed', level: 'doubleBlack' },
  { name: 'The Bowl', status: 'closed', level: 'doubleBlack' },
  { name: 'Way Out', status: 'closed', level: 'terrainPark' }
]);
