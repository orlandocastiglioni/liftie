import trails from '../trails/index.js';

// high-point-xc.html: wayback snapshot 2026-02-15, mid-season, 6 of 6 open
trails('high-point-xc', [
  { name: 'Scenic View', status: 'open', level: 'blue' },
  { name: 'Cedar Swamp', status: 'open', level: 'green' },
  { name: 'Lake Marcia', status: 'open', level: 'green' },
  { name: "Lil' Hammer", status: 'open', level: 'green' },
  { name: 'Steenykill', status: 'open', level: 'black' },
  { name: 'Monument', status: 'open', level: 'green' }
]);

// high-point-xc-mixed.html: wayback snapshot 2026-01-20 - Lake Marcia closed
// (unsafe ice) while the rest of the centre is open, and Monument had not been
// added to the list yet, so the row set is 5 rather than 6
trails(
  'high-point-xc',
  [
    { name: 'Scenic View', status: 'open', level: 'blue' },
    { name: 'Cedar Swamp', status: 'open', level: 'green' },
    { name: 'Lake Marcia', status: 'closed', level: 'green' },
    { name: "Lil' Hammer", status: 'open', level: 'green' },
    { name: 'Steenykill', status: 'open', level: 'black' }
  ],
  { example: 'high-point-xc-mixed' }
);
