import trails from '../trails/index.js';

// Live API answer of 2026-11-17, early season: the gondola, Kelo (aerials
// training only), Saarua III and Saarua Express have hours today and are open;
// so are the six slopes they serve. The Ruka Coaster row is left out.

trails(
  'ruka-ski-resort',
  [
    { name: '1 Front Slope no. 1', status: 'closed', level: 'black', grade: 'Intermediate' },
    { name: '2 Front slope no. 2', status: 'closed', level: 'black', grade: 'Intermediate' },
    { name: '3 Freestyle mogul skiing area', status: 'closed', level: 'doubleBlack', grade: 'Challenging' },
    { name: '4 FIS-slope', status: 'closed', level: 'doubleBlack', grade: 'Challenging' },
    { name: '4b Snow pit', status: 'closed', level: 'black', grade: 'Intermediate' },
    { name: '5 Kuru', status: 'open', level: 'blue', grade: 'Easy' },
    { name: '6 Talvijärvi', status: 'closed', level: 'blue', grade: 'Easy' },
    { name: '7 Easy way down', status: 'closed', level: 'blue', grade: 'Easy' },
    { name: '8 Kelo', status: 'closed', level: 'doubleBlack', grade: 'Challenging' },
    { name: '9 Kelo unmaintained', status: 'closed', level: 'doubleBlack', grade: 'Challenging' },
    { name: '10 Pessari', status: 'closed', level: 'black', grade: 'Intermediate' },
    { name: '11 Pessari steep', status: 'closed', level: 'doubleBlack', grade: 'Challenging' },
    { name: '11c Treeride area', status: 'closed', level: 'doubleBlack', grade: 'Challenging' },
    { name: '12 Saarua', status: 'open', level: 'black', grade: 'Intermediate' },
    { name: '13 Saarua', status: 'open', level: 'black', grade: 'Intermediate' },
    { name: '14 Ruka Park Big Line', status: 'open', level: 'black', grade: 'Intermediate' },
    { name: '15 Ruka Park Small Line', status: 'open', level: 'blue', grade: 'Easy' },
    { name: '16 Route to Saarua', status: 'open', level: 'blue', grade: 'Easy' },
    { name: '17 Treeride area', status: 'closed', level: 'blue', grade: 'Easy' },
    { name: '18 Gondola slope', status: 'closed', level: 'blue', grade: 'Easy' },
    { name: '21 Mini Ruka', status: 'closed', level: 'blue', grade: 'Easy' },
    { name: '22 Rosa and Rudolf Family Park', status: 'closed', level: 'green', grade: 'Very easy' },
    { name: '23 Ruka Park Junior', status: 'closed', level: 'blue', grade: 'Easy' },
    { name: '24 Vuosseli', status: 'closed', level: 'black', grade: 'Intermediate' },
    { name: '25 Vuosseli blue', status: 'closed', level: 'blue', grade: 'Easy' },
    { name: '25a Treeride area', status: 'closed', level: 'black', grade: 'Intermediate' },
    { name: '25b SuperPipe Vuosseli', status: 'closed', level: 'black', grade: 'Intermediate' },
    { name: '26 Rudolf adventure route', status: 'closed', level: 'blue', grade: 'Easy' },
    { name: '27 Ahonlaita', status: 'closed', level: 'blue', grade: 'Easy' },
    { name: '28 Vuosseli FreeRide', status: 'closed', level: 'doubleBlack', grade: 'Challenging' },
    { name: '30 Masto loop', status: 'closed', level: 'blue', grade: 'Easy' },
    { name: '31 Midway slope', status: 'closed', level: 'blue', grade: 'Easy' },
    { name: '32 Midway slope II', status: 'closed', level: 'blue', grade: 'Easy' },
    { name: '33 Masto II', status: 'closed', level: 'black', grade: 'Intermediate' },
    { name: '34 Masto Fun Slope', status: 'closed', level: 'black', grade: 'Intermediate' },
    { name: '35 Masto I', status: 'closed', level: 'black', grade: 'Intermediate' },
    { name: '36 Route from Masto', status: 'closed', level: 'blue', grade: 'Easy' },
    { name: '37 Snow Valley', status: 'closed', level: 'blue', grade: 'Easy' },
    { name: '39 Maston Aitio', status: 'closed', level: 'blue', grade: 'Easy' },
    { name: '38 Route to Masto', status: 'closed', level: 'blue', grade: 'Easy' },
    { name: '8b Route to Kelo', status: 'closed', level: 'doubleBlack', grade: 'Challenging' }
  ],
  { ext: 'json' }
);
