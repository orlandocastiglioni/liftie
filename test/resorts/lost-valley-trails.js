import trails from '../trails/index.js';

// early-season capture (2026-01-01): the resort still names each open trail
trails('lost-valley', [
  { 'name': 'Cub Carpet & Learning Area', 'status': 'open', 'level': 'green' },
  { 'name': 'Deer Run', 'status': 'open', 'level': 'green' },
  { 'name': 'Chipmunk', 'status': 'open', 'level': 'green' },
  { 'name': 'Upper Foxhole', 'status': 'open', 'level': 'green' },
  { 'name': 'Lower Foxhole', 'status': 'open', 'level': 'green' },
  { 'name': 'Rabbit', 'status': 'open', 'level': 'green' },
  { 'name': 'Possum', 'status': 'open', 'level': 'green' },
  { 'name': 'Squirrel', 'status': 'open', 'level': 'green' },
  { 'name': 'Big Buck', 'status': 'open', 'level': 'blue' },
  { 'name': 'Pine Grove', 'status': 'open', 'level': 'blue' },
  { 'name': 'Beaver', 'status': 'open', 'level': 'blue' },
  { 'name': 'Skunk', 'status': 'open', 'level': 'blue' },
  { 'name': 'Porcupine', 'status': 'open', 'level': 'blue' },
  { 'name': 'Logging Trail', 'status': 'open', 'level': 'blue' },
  { 'name': 'Bobcat', 'status': 'open', 'level': 'blue' },
  { 'name': 'Bear', 'status': 'open', 'level': 'blue' },
  { 'name': 'Otterslide', 'status': 'open', 'level': 'blue' },
  { 'name': 'Pine Grove Park', 'status': 'open', 'level': 'terrainPark' },
  { 'name': 'Fisher', 'status': 'open', 'level': 'black' },
  { 'name': 'Bull Moose', 'status': 'open', 'level': 'black' },
  { 'name': 'Lynx', 'status': 'open', 'level': 'black' }
]);

// mid-winter capture (2026-02-15): with everything open the resort collapses
// all three columns to a single "All Trails" line (plus "All Glades Except
// ..."), which carries no trail names - the parser must emit nothing rather
// than a bogus trail called "All Trails"
trails('lost-valley', [], { example: 'lost-valley-all-trails' });
