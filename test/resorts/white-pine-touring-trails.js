import trails from '../trails/index.js';

// example is the live runQuery response; trailhub has no historical api and no
// winter capture exists, so every row is the off-season "Closed". Names are
// operator-typed and kept verbatim (embedded distances, the double space in
// "Dog  Loop", the plain double quotes).
trails(
  'white-pine-touring',
  [
    {
      name: '3km "Community Loop" Trail',
      status: 'closed',
      level: 'green'
    },
    {
      name: 'Dog  Loop and Farm Connector 1.5km',
      status: 'closed',
      level: 'green'
    },
    {
      name: 'Practice and Ski Play Area',
      status: 'closed',
      level: 'green'
    },
    {
      name: '5 Km "Pond Loop" Trail',
      status: 'closed',
      level: 'blue'
    },
    {
      name: 'Armstrong Snow Pasture',
      status: 'closed',
      level: 'black'
    },
    {
      name: 'Farm Trail - 7.2km loop',
      status: 'closed',
      level: 'black'
    }
  ],
  { ext: 'json' }
);
