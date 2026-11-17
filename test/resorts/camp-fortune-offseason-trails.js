import trails from '../trails/index.js';

// Live page, 2026-11-17 ("THANK YOU FOR A GREAT SEASON!"): every run carries the
// do-not-enter icon, and the difficulty images are lazy-loaded (src is a
// placeholder, the real file is in data-lazy-src).

trails(
  'camp-fortune',
  [
    { name: 'Pineault Park', status: 'closed', level: 'terrainPark', grade: 'park' },
    { name: 'Pineault', status: 'closed', level: 'green', grade: 'green' },
    { name: 'Allen’s Alley', status: 'closed', level: 'green', grade: 'green' },
    { name: 'Marshall', status: 'closed', level: 'green', grade: 'green' },
    { name: 'Peewee', status: 'closed', level: 'green', grade: 'green' },
    { name: 'Clifford', status: 'closed', level: 'blue', grade: 'blue' },
    { name: 'Slalom', status: 'closed', level: 'black', grade: 'black' },
    { name: 'Sparks', status: 'closed', level: 'blue', grade: 'blue' },
    { name: 'Bud Clark', status: 'closed', level: 'black', grade: 'black' },
    { name: 'Canadien', status: 'closed', level: 'black', grade: 'black' },
    { name: 'Chute', status: 'closed', level: 'black', grade: 'black' },
    { name: 'Heggtveit', status: 'closed', level: 'doubleBlack', grade: 'double-black' },
    { name: 'Swan Dive', status: 'closed', level: 'doubleBlack', grade: 'double-black' },
    { name: 'Skyway', status: 'closed', level: 'blue', grade: 'blue' },
    { name: 'Humdinger', status: 'closed', level: 'blue', grade: 'blue' },
    { name: 'Paradis', status: 'closed', level: 'blue', grade: 'blue' },
    { name: 'North American', status: 'closed', level: 'blue', grade: 'blue' },
    { name: 'Butternut', status: 'closed', level: 'blue', grade: 'blue' },
    { name: 'Waxman’s Way/PeeWee', status: 'closed', level: 'green', grade: 'green' },
    { name: 'Craigsmarc (Skyline)', status: 'closed', level: 'doubleBlack', grade: 'double-black' },
    { name: 'Sous bois de singe (Skyline)', status: 'closed', level: 'blue', grade: 'blue' },
    { name: 'Au naturel', status: 'closed', level: 'blue', grade: 'blue' },
    { name: 'Off-Piste (Valley)', status: 'closed', level: 'blue', grade: 'blue' },
    { name: 'La Cache (Meech Wednesday to Sunday)', status: 'closed', level: 'black', grade: 'black' },
    { name: 'La Faune', status: 'closed', level: 'blue', grade: 'blue' },
    { name: 'Duffy', status: 'closed', level: 'black', grade: 'black' },
    { name: 'Alexander', status: 'closed', level: 'blue', grade: 'blue' },
    { name: 'McDonald', status: 'closed', level: 'blue', grade: 'blue' }
  ],
  { example: 'camp-fortune-offseason' }
);
