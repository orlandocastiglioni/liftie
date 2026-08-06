import trails from '../trails/index.js';

// all 46 trails, renderd-rendered so the three GetConditions XHRs have run;
// the count also matches the raw API (Aspen Area 9, Upper Mountain Runs 20,
// Mid Mountain Runs 17) and excludes the 3 phantom rows a raw-text match on
// the inline row template would pick up. Levels follow the resort's own
// legend: Difficult is blue, Expert single black, Moderate freestyle terrain.
trails(
  'pebble-creek',
  [
    {
      'name': 'The Aspen',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'First Timer Run',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Hobo',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Golden Leaf',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Hidden Trail',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Aspen Drop',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Aspen Meadows',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': "Mary's Way",
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Wicked Wilma',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Pebble Lane',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Upper Max Out',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Lower Max Out',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Edgie',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Outback',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': "Stacy's",
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Jack Rabbit',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Rattlesnake',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'The Rock',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Upper Green',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': "Al's Drop",
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': "Upper Stacy's",
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Backdoor',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Way Out Woods',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': "Evan's Glen",
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Far Out',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Cherry Bomb',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Wedgie',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Toads',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Upper Liftline',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Terrain Park - Mid Mountain',
      'status': 'closed',
      'level': 'terrainPark'
    },
    {
      'name': 'Easy Street',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Green Canyon Traverse',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Lower Green Canyon',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Rock Garden',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Lower Face',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'The Ridge',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'The Cut',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'S. Bowl Cat Track',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Sunshine Ridge',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Face Shot',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Sun Bowl',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'The Drop',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'The Face',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'South Bowl',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Lower Liftline',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Lower Pebble Lane',
      'status': 'closed',
      'level': 'green'
    }
  ],
  { example: 'pebble-creek-trails' }
);
