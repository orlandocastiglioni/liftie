import trails from '../trails/index.js';

// same page as the lifts; the 14-row 'Bike Trails' table on that page must
// not appear here. Levels come from the difficulty-icon class, statuses from
// the inline svg (g#Symbols = open, g#ClosedSymbols = closed).
trails('bryce-resort', [
  { name: 'Bunny Slope', status: 'open', level: 'green' },
  { name: 'Little Nip', status: 'open', level: 'green' },
  { name: 'Red Eye', status: 'open', level: 'green' },
  { name: 'Speak Easy', status: 'closed', level: 'green' },
  { name: 'Locher Bowl', status: 'open', level: 'blue' },
  { name: 'Bootlegger', status: 'open', level: 'blue' },
  { name: "Revenuer's Run", status: 'closed', level: 'blue' },
  { name: 'White Lightning', status: 'open', level: 'blue' },
  { name: 'Prost', status: 'closed', level: 'blue' },
  { name: '80 Proof', status: 'closed', level: 'blue' },
  { name: 'Hangover', status: 'closed', level: 'black' },
  { name: "Randy's Remedy", status: 'closed', level: 'black' }
]);
