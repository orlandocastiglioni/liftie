import trails from '../trails/index.js';

// Same 20260124 winter capture as the lift test: 10 rows in page order, 8 open
// and 2 closed, matching the "8 / 12" the page's own header prints (their
// denominator counts two rows the table does not).
//
// Grades are the three-tier Austrian scale published as a colour class: 5 blue,
// 4 red -> black, 1 black -> doubleBlack.
//
// "11 Skiweg Axamer Lizum" is the ski route across to Axamer Lizum. It is
// published in Muttereralm's own slope table, so it belongs to this resort;
// Axamer Lizum runs a separate lift company and a separate feed.
trails('muttereralm', [
  { name: '1 Familienabfahrt', status: 'open', level: 'blue', grade: 'blue' },
  { name: '11 Skiweg Axamer Lizum', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '1a Familienabfahrt (Tal)', status: 'open', level: 'blue', grade: 'blue' },
  { name: '2 FIS- Abfahrt', status: 'closed', level: 'black', grade: 'red' },
  { name: '3 Pfriemesabfahrt', status: 'open', level: 'black', grade: 'red' },
  { name: '3a Umfahrung Primesköpfl', status: 'open', level: 'blue', grade: 'blue' },
  { name: '4 Rennstrecke', status: 'open', level: 'doubleBlack', grade: 'black' },
  { name: '5 Götznerabfahrt', status: 'open', level: 'black', grade: 'red' },
  { name: '5a Götznerabfahrt (Tal)', status: 'open', level: 'black', grade: 'red' },
  { name: '6 Almbodenabfahrt', status: 'open', level: 'blue', grade: 'blue' }
]);
