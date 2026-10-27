import trails from '../trails/index.js';

// Skigebietsmanager region_id=864, captured live 2026-10-27: the rows under
// the 'Slopes' caption only (Winterhiking, Crosscountry and Legend excluded).
// Austrian blue / red / black, published as `grade` and mapped one level
// down (red -> black, black -> doubleBlack); rows without a grade icon
// (ski routes) carry neither.
trails('nordkette', [
  { name: '1 Osthang', status: 'closed' },
  { name: '2 Zweier Abfahrt', status: 'closed' },
  { name: '3 Tobel', status: 'closed' },
  { name: '4 Übungslift', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '5 Karrinne', status: 'closed' },
  { name: '6 Langes Tal', status: 'closed' },
  { name: '6 Seilbahnrinne', status: 'closed' },
  { name: '7 Kurzes Tal', status: 'closed', level: 'black', grade: 'red' },
  { name: '8 Kasermandel - Talele', status: 'closed', level: 'doubleBlack', grade: 'black' }
]);
