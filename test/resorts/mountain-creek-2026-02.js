import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// Wayback capture of 2026-02-07 (web.archive.org/web/20260207125406), read on
// its own day: the report is stamped "Saturday, February 7th", so it is fresh and
// the open/closed icons parse.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-02-07T15:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-02-07T15:00:00Z');
  }
};

lifts(
  'mountain-creek',
  'html',
  {
    'Magic Carpet 1': 'open',
    'Magic Carpet 2': 'closed',
    'Sugar Quad': 'open',
    'The Cabriolet': 'open',
    'Vernon Triple': 'open',
    'Granite Peak Quad': 'open',
    'Sojourn Double': 'open',
    'South Peak Express': 'open',
    'Bear Peak Express': 'open'
  },
  { example: 'mountain-creek-2026-02' }
);

trails(
  'mountain-creek',
  [
    {
      'name': 'Learning Area',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Cab Ride',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Fox Tail',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Garden State',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Great Northern',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Independence Pass',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Indian Pass',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Khyber Pass',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Lower Horizon',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Lower Straightaway',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Matchmaker',
      'status': 'open',
      'level': 'terrainPark'
    },
    {
      'name': 'Sayonara',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Straightaway',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Sugar Slope',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Triple Bound',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Twist',
      'status': 'open',
      'level': 'terrainPark'
    },
    {
      'name': 'Upper Horizon',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Zero-G',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': "Charlie's Run",
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Doe Run',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Grand Prix',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Osprey',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Red Fox',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Silver Fox',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Southern Sojourn',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Bakersfield',
      'status': 'open',
      'level': 'terrainPark'
    },
    {
      'name': 'Buddy’s Way',
      'status': 'open',
      'level': 'terrainPark'
    },
    {
      'name': 'Canyon',
      'status': 'open',
      'level': 'terrainPark'
    },
    {
      'name': 'Cloud 9',
      'status': 'open',
      'level': 'terrainPark'
    },
    {
      'name': 'Drivets Drop',
      'status': 'open',
      'level': 'terrainPark'
    },
    {
      'name': 'Giant Steps',
      'status': 'open',
      'level': 'terrainPark'
    },
    {
      'name': "Jumpin' Jack",
      'status': 'open',
      'level': 'terrainPark'
    },
    {
      'name': 'Lark',
      'status': 'open',
      'level': 'terrainPark'
    },
    {
      'name': 'Lift Line',
      'status': 'open',
      'level': 'terrainPark'
    },
    {
      'name': 'Red Tail',
      'status': 'closed',
      'level': 'terrainPark'
    },
    {
      'name': 'Tail Spin',
      'status': 'open',
      'level': 'terrainPark'
    },
    {
      'name': 'The Gully',
      'status': 'open',
      'level': 'terrainPark'
    },
    {
      'name': 'Al’s Alley',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Arena',
      'status': 'open',
      'level': 'terrainPark'
    },
    {
      'name': 'Big Bear',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Bunks Bank',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Gorge Run',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Halley’s Comet',
      'status': 'open',
      'level': 'terrainPark'
    },
    {
      'name': 'Kamikaze',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Race Trail',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Wacky Way',
      'status': 'open',
      'level': 'black'
    }
  ],
  { example: 'mountain-creek-2026-02' }
);
