import trails from '../trails/index.js';

// Skigebietsmanager region_id=862, captured live 2026-10-27: the rows under
// the 'Slopes' caption only (Winterhiking, Crosscountry and Legend excluded).
// Austrian blue / red / black, published as `grade` and mapped one level
// down (red -> black, black -> doubleBlack); rows without a grade icon
// (ski routes) carry neither.
trails('muttereralm', [
  { name: '1 Familienabfahrt', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '1a Familienabfahrt (Tal)', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '2 FIS- Abfahrt', status: 'closed', level: 'black', grade: 'red' },
  { name: '3 Pfriemesabfahrt', status: 'closed', level: 'black', grade: 'red' },
  { name: '3a Umfahrung Primesköpfl', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '4 Rennstrecke', status: 'closed', level: 'doubleBlack', grade: 'black' },
  { name: '5 Götznerabfahrt', status: 'closed', level: 'black', grade: 'red' },
  { name: '5a Götznerabfahrt (Tal)', status: 'closed', level: 'black', grade: 'red' },
  { name: '6 Almbodenabfahrt', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '11 Skiweg Axamer Lizum', status: 'closed', level: 'blue', grade: 'blue' }
]);
