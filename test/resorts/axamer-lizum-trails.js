import trails from '../trails/index.js';

// Skigebietsmanager region_id=837, captured live 2026-10-27: the rows under
// the 'Slopes' caption only (Winterhiking, Crosscountry and Legend excluded).
// Austrian blue / red / black, published as `grade` and mapped one level
// down (red -> black, black -> doubleBlack); rows without a grade icon
// (ski routes) carry neither.
trails('axamer-lizum', [
  { name: '1 Olympia Abfahrt Damen', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '1a Skiweg Damenabfahrt', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '1b Damen Zielschuss', status: 'closed', level: 'black', grade: 'red' },
  { name: '2 Hoadl 1', status: 'closed', level: 'black', grade: 'red' },
  { name: '2a Skiweg Abfahrt 2', status: 'closed', level: 'black', grade: 'red' },
  { name: '2b Skiweg Abfahrt 3', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '3 Olympia RSL Herren', status: 'closed', level: 'black', grade: 'red' },
  { name: '3a Skiweg Olympiabahn', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '3b Schrägfahrt I', status: 'closed', level: 'black', grade: 'red' },
  { name: '3c Schrägfahrt II', status: 'closed', level: 'black', grade: 'red' },
  { name: '4 Olympia RSL Damen', status: 'closed', level: 'black', grade: 'red' },
  { name: '4a Skiweg Abfahrt 4', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '4b Skiweg Karleiten', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '4c Skiweg Abfahrt 5', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '5 Karleitenabfahrt', status: 'closed', level: 'black', grade: 'red' },
  { name: '5a Skiweg RSL Herren', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '5c Karleiten Talabfahrt', status: 'closed', level: 'black', grade: 'red' },
  { name: '6 Schönbodenabfahrt', status: 'closed', level: 'black', grade: 'red' },
  { name: '7 Pleisenabfahrt', status: 'closed', level: 'black', grade: 'red' },
  { name: '9 Kaserwald I', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '9a Kaserwald II', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '10 Olympia RSL Birgitzköpfl', status: 'closed', level: 'doubleBlack', grade: 'black' },
  { name: '10 Olympia RSL Birgitzköpfl', status: 'closed' },
  { name: '11 Götzner Abfahrt', status: 'closed', level: 'black', grade: 'red' },
  { name: '11a Götzner Grube', status: 'closed' },
  { name: '12 Talbodenabfahrt', status: 'closed', level: 'blue', grade: 'blue' },
  { name: '14 Start Damenabfahrt', status: 'closed', level: 'doubleBlack', grade: 'black' },
  { name: '15 Start Herrenabfahrt', status: 'closed' },
  { name: '16 Mittelstation Steilhang', status: 'closed' },
  { name: '17 Pleisen Steilhang', status: 'closed', level: 'black', grade: 'red' },
  { name: '18 Olympia SL Birgitzköpfl', status: 'closed' },
  { name: '19 Axamer Abfahrt', status: 'closed' }
]);
