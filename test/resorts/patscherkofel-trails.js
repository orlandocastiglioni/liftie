import trails from '../trails/index.js';

// Skigebietsmanager region_id=831, captured live 2026-10-27: the rows under
// the 'Slopes' caption only (Winterhiking, Crosscountry and Legend excluded).
// Austrian blue / red / black, published as `grade` and mapped one level
// down (red -> black, black -> doubleBlack); rows without a grade icon
// (ski routes) carry neither.
trails('patscherkofel', [
  { name: '1 Olympiaabfahrt', status: 'closed', level: 'black', grade: 'red' },
  { name: '2 Weltcuphang', status: 'closed', level: 'doubleBlack', grade: 'black' },
  { name: '3 Familienabfahrt', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '4 Rennstrecke', status: 'closed', level: 'black', grade: 'red' },
  { name: '5 Olympiaabfahrt', status: 'closed', level: 'doubleBlack', grade: 'black' },
  { name: '5 Übungshang Patscherkofel', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '6 Familienabfahrt', status: 'closed', level: 'black', grade: 'red' },
  { name: '7 Olympiaabfahrt', status: 'closed', level: 'doubleBlack', grade: 'black' },
  { name: '8 Heiligwasserpisten', status: 'closed', level: 'black', grade: 'red' },
  { name: '9 Heiligwasserpisten', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '10 Kinderlift', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '11 Übungswiese Igls', status: 'closed', level: 'blue', grade: 'blue' }
]);
