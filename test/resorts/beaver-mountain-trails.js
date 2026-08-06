// skithebeav.com/mountain/conditions/ - trails share the lift page. Capture is
// the frozen closing-day report (3/27/26): 33 open (Open + Groomed), 15 closed,
// across all four levels including 2 terrain parks.
import trails from '../trails/index.js';

// The parser drops a report older than 14 days, so these tests pin the clock to
// the day after the fixture's own stamp (3/27/26). `node --test` gives each file
// its own process, so the override stays here.
const RealDate = Date;
const PINNED = '2026-03-28T12:00:00Z';
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : [PINNED]));
  }
  static now() {
    return RealDate.parse(PINNED);
  }
};

trails('beaver-mountain', [
  {
    'name': 'Eezy-Peezy',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Wee Beav',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Cottontail',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Goat Trail',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': "Harv's",
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Jump Hill',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Little Beaver',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Tiny Tim',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Whooziwatzit',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Canyon View',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': "Lower Harry's Hollow",
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'North Face',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': "Robinson's Rim",
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'School Hill',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'South Face',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'The Ridge',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'The Stump',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Rock Garden',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Blind Bull',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Lone Pine',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Long Hollow Ridge',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Lower Redtail',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Rodeo Grounds',
    'status': 'closed',
    'level': 'terrainPark'
  },
  {
    'name': 'Skid Road',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Sour Grapes',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Sunshine',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': "Ted's Rock",
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': "TJ's Way",
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Tunnel of Love',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Upper Redtail',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Shady',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': "Beaver's Powder",
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Black Forest',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Deadhorse',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Deadhorse Bypass',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'D-Street',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Ego Trip',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Easy Street',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Gentle Ben',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Gentle Ben Terrain Park',
    'status': 'open',
    'level': 'terrainPark'
  },
  {
    'name': 'Grand Canyon',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': "Harry's Hollow",
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Lower Deadhorse',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': "Lue's",
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Nasty',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'North Fields',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': "Stan's Bonanza",
    'status': 'open',
    'level': 'black'
  },
  {
    'name': "Teddy's Frolic",
    'status': 'open',
    'level': 'black'
  }
]);
