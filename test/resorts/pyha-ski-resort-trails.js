import trails from '../trails/index.js';

// Live API answer of 2026-11-17, before the season: every
// row has open_today null, so everything is closed.

trails(
  'pyha-ski-resort',
  [
    { name: '1 Kultakero Slopes', status: 'closed', level: 'doubleBlack', grade: 'Challenging' },
    { name: '2 Huttu-ukko', status: 'closed', level: 'doubleBlack', grade: 'Challenging' },
    { name: '3 Piste Palander', status: 'closed', level: 'doubleBlack', grade: 'Challenging' },
    { name: '4 Polar Slope', status: 'closed', level: 'black', grade: 'Intermediate' },
    { name: '5 Blue Slope', status: 'closed', level: 'blue', grade: 'Easy' },
    { name: '6 Northern Slope Blue & Red', status: 'closed', level: 'blue', grade: 'Easy' },
    { name: '7 Northern Slope Blue', status: 'closed', level: 'blue', grade: 'Easy' },
    { name: '8 Huttu Adventure', status: 'closed', level: 'blue', grade: 'Easy' },
    { name: '9 Forest Adventure', status: 'closed', level: 'blue', grade: 'Easy' },
    { name: '11 Pikku-Ukko', status: 'closed', level: 'blue', grade: 'Easy' },
    { name: '12 Mini Park', status: 'closed', level: 'blue', grade: 'Easy' },
    { name: '13 Family Slope', status: 'closed', level: 'green', grade: 'Very easy' },
    { name: '14 Skiway', status: 'closed', level: 'green', grade: 'Very easy' },
    { name: '15 Polar Madness', status: 'closed', level: 'black', grade: 'Intermediate' },
    { name: '16 Children Slope', status: 'closed', level: 'green', grade: 'Very easy' }
  ],
  { ext: 'json' }
);
