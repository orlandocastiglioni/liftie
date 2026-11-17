import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// Live page fetched 2026-11-17: off-season, every lift and trail Closed under
// "Updated: Monday, November 2nd" - two weeks old, so the date gate lets it through.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-11-17T15:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-11-17T15:00:00Z');
  }
};

lifts('mountain-creek', 'html', {
  'Magic Carpet 1': 'closed',
  'Magic Carpet 2': 'closed',
  'Sugar Quad': 'closed',
  'The Cabriolet': 'closed',
  'Vernon Triple': 'closed',
  'Granite Peak Quad': 'closed',
  'Sojourn Double': 'closed',
  'South Peak Express': 'closed',
  'Bear Peak Express': 'closed'
});

trails('mountain-creek', [
  {
    'name': 'Learning Area',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Cab Ride',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Fox Tail',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Garden State',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Great Northern',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Independence Pass',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Indian Pass',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Khyber Pass',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Lower Horizon',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Lower Straightaway',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Matchmaker',
    'status': 'closed',
    'level': 'terrainPark'
  },
  {
    'name': 'Sayonara',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Straightaway',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Sugar Slope',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Triple Bound',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Twist',
    'status': 'closed',
    'level': 'terrainPark'
  },
  {
    'name': 'Upper Horizon',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Zero-G',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': "Charlie's Run",
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Doe Run',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Grand Prix',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Osprey',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Red Fox',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Silver Fox',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Southern Sojourn',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Bakersfield',
    'status': 'closed',
    'level': 'terrainPark'
  },
  {
    'name': 'Buddy’s Way',
    'status': 'closed',
    'level': 'terrainPark'
  },
  {
    'name': 'Canyon',
    'status': 'closed',
    'level': 'terrainPark'
  },
  {
    'name': 'Cloud 9',
    'status': 'closed',
    'level': 'terrainPark'
  },
  {
    'name': 'Drivets Drop',
    'status': 'closed',
    'level': 'terrainPark'
  },
  {
    'name': 'Giant Steps',
    'status': 'closed',
    'level': 'terrainPark'
  },
  {
    'name': "Jumpin' Jack",
    'status': 'closed',
    'level': 'terrainPark'
  },
  {
    'name': 'Lark',
    'status': 'closed',
    'level': 'terrainPark'
  },
  {
    'name': 'Lift Line',
    'status': 'closed',
    'level': 'terrainPark'
  },
  {
    'name': 'Red Tail',
    'status': 'closed',
    'level': 'terrainPark'
  },
  {
    'name': 'Tail Spin',
    'status': 'closed',
    'level': 'terrainPark'
  },
  {
    'name': 'The Gully',
    'status': 'closed',
    'level': 'terrainPark'
  },
  {
    'name': 'Al’s Alley',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Arena',
    'status': 'closed',
    'level': 'terrainPark'
  },
  {
    'name': 'Big Bear',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Bunks Bank',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Gorge Run',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Halley’s Comet',
    'status': 'closed',
    'level': 'terrainPark'
  },
  {
    'name': 'Kamikaze',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Race Trail',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Wacky Way',
    'status': 'closed',
    'level': 'black'
  }
]);
