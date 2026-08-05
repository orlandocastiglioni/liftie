import trails from '../trails/index.js';

// same fixture and page as the lifts: the Slopes Table block inside
// script#__NEXT_DATA__. All 11 published slopes, in page order, with the
// site's own 'open'/'closed' and beginner/intermediate/advanced vocabulary.
// "Terrain Park" is published as an 'advanced' row but is tagged terrainPark.
trails('ober-mountain', [
  {
    name: 'Ski School',
    status: 'open',
    level: 'green'
  },
  {
    name: 'Cub Way',
    status: 'open',
    level: 'green'
  },
  {
    name: 'Lower Castle Run',
    status: 'open',
    level: 'green'
  },
  {
    name: 'Castle Run',
    status: 'open',
    level: 'blue'
  },
  {
    name: 'Upper Bear',
    status: 'closed',
    level: 'blue'
  },
  {
    name: 'Lower Bear',
    status: 'closed',
    level: 'blue'
  },
  {
    name: 'Ober Chute',
    status: 'closed',
    level: 'blue'
  },
  {
    name: "Yeti's Run",
    status: 'closed',
    level: 'blue'
  },
  {
    name: 'Mogul Ridge',
    status: 'closed',
    level: 'black'
  },
  {
    name: 'Grizzly',
    status: 'closed',
    level: 'black'
  },
  {
    name: 'Terrain Park',
    status: 'open',
    level: 'terrainPark'
  }
]);
