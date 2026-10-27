import trails from '../trails/index.js';

// Skigebietsmanager region_id=871, captured live 2026-10-27: the rows under
// the 'Slopes' caption only (Winterhiking, Crosscountry and Legend excluded).
// Austrian blue / red / black, published as `grade` and mapped one level
// down (red -> black, black -> doubleBlack); rows without a grade icon
// (ski routes) carry neither.
trails('schlick-2000', [
  { name: 'Skiroute Kreuzjoch', status: 'closed' },
  { name: 'Skiroute Sennjoch', status: 'closed' },
  { name: '1 - Panorama - Abfahrt', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '1a - Panorama - Verbindung', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '1b - Panorama - Abfahrt Talschluss', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '2 - Hohes Laub - Abfahrt', status: 'closed', level: 'black', grade: 'red' },
  { name: '3 - Panoramaschuss', status: 'closed', level: 'doubleBlack', grade: 'black' },
  { name: '4 - Mitterjoch - Abfahrt', status: 'closed', level: 'black', grade: 'red' },
  { name: '4d - Wasserfall-Abfahrt', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '5 - Zirmach - Abfahrt', status: 'closed', level: 'black', grade: 'red' },
  { name: '5a - Kanonenrohr', status: 'closed', level: 'black', grade: 'red' },
  { name: '6 - Wasserfall - Abfahrt', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '6a - Carving - Abfahrt', status: 'closed', level: 'black', grade: 'red' },
  { name: '7 - Burgstall - Abfahrt', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '8 - Quellen - Abfahrt', status: 'closed', level: 'black', grade: 'red' },
  { name: '9 - Zirbenschuss', status: 'closed', level: 'black', grade: 'red' },
  { name: '9 - Zirbenschuss', status: 'closed', level: 'black', grade: 'red' },
  { name: '10 - Latschen - Abfahrt', status: 'closed', level: 'doubleBlack', grade: 'black' },
  { name: '11 - Zirmachhang', status: 'closed', level: 'black', grade: 'red' },
  { name: '15 - Übungswiese Schanzlin', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '16 - Talabfahrt', status: 'closed', level: 'blue', grade: 'blue' }
]);
