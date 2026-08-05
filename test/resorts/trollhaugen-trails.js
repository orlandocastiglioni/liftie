import trails from '../trails/index.js';

// Same 2026-08-05 fixture as the lifts - one page carries both. 27 runs
// (p.trail-access-name) followed by 4 terrain parks
// (p.terrain-park-access-name), in page order; the Snow Tubing row between
// them is excluded.
//
// Every row is closed because no winter capture of this markup exists. What
// the fixture does prove is the level mapping, which is the risky part: the
// difficulty lives only in an icon filename, and this plugin's expert.png is
// a SINGLE black diamond (expert-only.png is the double). Passing 'expert'
// to normalizeLevel would have made 12 of these rows double-black.
trails('trollhaugen', [
  { name: "Jim's Run", status: 'closed', level: 'blue' },
  { name: 'Jötunn', status: 'closed', level: 'blue' },
  { name: 'Julebakken', status: 'closed', level: 'blue' },
  { name: "Lee's Run", status: 'closed', level: 'blue' },
  { name: 'Lillebakken', status: 'closed', level: 'blue' },
  { name: "Logan's Run", status: 'closed', level: 'blue' },
  { name: 'Nissebakken', status: 'closed', level: 'blue' },
  { name: 'Ragnarök', status: 'closed', level: 'blue' },
  { name: 'Skadi', status: 'closed', level: 'blue' },
  { name: 'Vesterdahl', status: 'closed', level: 'blue' },
  { name: 'Bjorkedahl', status: 'closed', level: 'green' },
  { name: 'Güttenhaugen', status: 'closed', level: 'green' },
  { name: 'Half Rabbit', status: 'closed', level: 'green' },
  { name: 'Kålbakken', status: 'closed', level: 'green' },
  { name: 'Mickebakken', status: 'closed', level: 'green' },
  { name: 'Minibakken', status: 'closed', level: 'green' },
  { name: 'Galende', status: 'closed', level: 'black' },
  { name: 'Helgen Rose', status: 'closed', level: 'black' },
  { name: 'Jumpin Judy', status: 'closed', level: 'black' },
  { name: 'Oppogopp', status: 'closed', level: 'black' },
  { name: 'Storebakken', status: 'closed', level: 'black' },
  { name: 'Søppelhaug', status: 'closed', level: 'black' },
  { name: 'The Chute', status: 'closed', level: 'black' },
  { name: 'The Glade', status: 'closed', level: 'black' },
  { name: 'The Summit', status: 'closed', level: 'black' },
  { name: "Troll's End", status: 'closed', level: 'black' },
  { name: 'Fall Line', status: 'closed', level: 'doubleBlack' },
  { name: 'Tomtebakken', status: 'closed', level: 'terrainPark' },
  { name: 'Valhalla', status: 'closed', level: 'terrainPark' },
  { name: 'Valgrind', status: 'closed', level: 'terrainPark' },
  { name: 'Guttenhaugen', status: 'closed', level: 'terrainPark' }
]);
