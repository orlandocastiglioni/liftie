import trails from '../trails/index.js';

// same 2025-03-26 snapshot as the lift test: the 17 runs of the
// "Terrain/Runs Open" column in page order (Badger was the last one still
// open), then the three non-lift features that live in the lift column.
// Huff publishes no per-trail difficulty, so only the park carries a level.
trails('huff-hills', [
  {
    name: 'Bunny',
    status: 'closed'
  },
  {
    name: 'Buffalo Jump',
    status: 'closed'
  },
  {
    name: 'Haux Hill',
    status: 'closed'
  },
  {
    name: 'Pheasant Run',
    status: 'closed'
  },
  {
    name: 'Wild Turkey',
    status: 'closed'
  },
  {
    name: 'Rattlesnake',
    status: 'closed'
  },
  {
    name: 'Rattlesnake Glades',
    status: 'closed'
  },
  {
    name: 'Upper Lift Line',
    status: 'closed'
  },
  {
    name: 'Lower Lift Line',
    status: 'closed'
  },
  {
    name: 'Coyote',
    status: 'closed'
  },
  {
    name: 'South Face',
    status: 'closed'
  },
  {
    name: 'Race Hill',
    status: 'closed'
  },
  {
    name: 'Cougar',
    status: 'closed'
  },
  {
    name: 'Big Rock',
    status: 'closed'
  },
  {
    name: 'Badger',
    status: 'open'
  },
  {
    name: 'Antelope',
    status: 'closed'
  },
  {
    name: 'Bad Business',
    status: 'closed'
  },
  {
    name: 'Terrain Park',
    status: 'closed',
    level: 'terrainPark'
  },
  {
    name: 'Uphill Traffic',
    status: 'closed'
  },
  {
    name: 'Donut Hole Hiking Area',
    status: 'closed'
  }
]);
