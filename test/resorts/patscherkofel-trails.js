import trails from '../trails/index.js';

// same December 2025 fixture as the lift test: 12 named runs, 6 open, all three
// Austrian tiers present (5 blau, 4 rot, 3 schwarz)
trails('patscherkofel', [
  { name: '1 Olympiaabfahrt', status: 'open', level: 'black', grade: 'red' },
  { name: '10 Kinderlift', status: 'open', level: 'blue', grade: 'blue' },
  { name: '11 Übungswiese Igls', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '2 Weltcuphang', status: 'open', level: 'doubleBlack', grade: 'black' },
  { name: '3 Familienabfahrt', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '4 Rennstrecke', status: 'closed', level: 'black', grade: 'red' },
  { name: '5 Olympiaabfahrt', status: 'closed', level: 'doubleBlack', grade: 'black' },
  { name: '5 Übungshang Patscherkofel', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '6 Familienabfahrt', status: 'open', level: 'black', grade: 'red' },
  { name: '7 Olympiaabfahrt', status: 'open', level: 'doubleBlack', grade: 'black' },
  { name: '8 Heiligwasserpisten', status: 'open', level: 'black', grade: 'red' },
  { name: '9 Heiligwasserpisten', status: 'closed', level: 'blue', grade: 'blue' }
]);
