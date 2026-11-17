import trails from '../trails/index.js';

// Wayback capture of 2026-02-10 (mid-season, Hydro-Quebec peak-demand notice on
// the page). The board has no date stamp, so the parser gates on the calendar
// (nothing in May-October); the clock is pinned to the capture day.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-02-10T12:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-02-10T12:00:00Z');
  }
};

trails('ski-saint-bruno', [
  { name: '1 Parc Sensatio', status: 'open', level: 'blue', grade: 'Hard' },
  { name: '2 La Huot', status: 'open', level: 'black', grade: 'Very hard' },
  { name: '3 Fer à cheval', status: 'open', level: 'blue', grade: 'Hard' },
  { name: '4a Rabastalière', status: 'open', level: 'black', grade: 'Very hard' },
  { name: '4b Rabastalière', status: 'open', level: 'green', grade: 'Easy' },
  { name: '5 La Couture', status: 'open', level: 'blue', grade: 'Hard' },
  { name: '6 Bassin', status: 'open', level: 'green', grade: 'Easy' },
  { name: '6A Sous-bois', status: 'open', level: 'black', grade: 'Very hard' },
  { name: '7 Dulude', status: 'open', level: 'blue', grade: 'Hard' },
  { name: '8 La Richelieu', status: 'open', level: 'green', grade: 'Easy' },
  { name: '9 Parcours du débutant (3)', status: 'open', level: 'green', grade: 'Easy' },
  { name: '9A Forêt Enchantée', status: 'open', level: 'green', grade: 'Easy' },
  { name: '10 Parcours du débutant (2)', status: 'open', level: 'green', grade: 'Easy' },
  { name: '11 Fantaski', status: 'open', level: 'green', grade: 'Easy' },
  { name: '11A Butte à Tony', status: 'open', level: 'green', grade: 'Easy' },
  { name: '18 SKIGO', status: 'open', level: 'green', grade: 'Easy' },
  { name: '18b SNOGO', status: 'open', level: 'green', grade: 'Easy' },
  { name: '12 Nom à venir', status: 'open', level: 'blue', grade: 'Hard' },
  { name: '13 La Dinielli', status: 'open', level: 'green', grade: 'Easy' },
  { name: '13A Sous-Bois', status: 'open', level: 'blue', grade: 'Hard' },
  { name: '14 La Montarville', status: 'open', level: 'blue', grade: 'Hard' },
  { name: '15 De la Trinité', status: 'open', level: 'black', grade: 'Very hard' },
  { name: '15A Sous-Bois', status: 'open', level: 'black', grade: 'Very hard' },
  { name: '16 La Passe', status: 'open', level: 'green', grade: 'Easy' },
  { name: '17 Passe-droit', status: 'open', level: 'green', grade: 'Easy' },
  { name: 'A Parc à neige', status: 'open', level: 'terrainPark', grade: 'Hard' },
  { name: 'B Mini Parc à neige', status: 'open', level: 'terrainPark', grade: 'Easy' }
]);
