import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// Live page fetched 2026-11-17: "REPORT AS OF" is blank ("/ /"), so the header
// widget's "Report for: 11/15/2026" dates it. Pre-season, all closed.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-11-17T15:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-11-17T15:00:00Z');
  }
};

lifts('plattekill', 'html', {
  'Sunshine Triple Chair': 'closed',
  'Northface Double Chair': 'closed',
  'Bunny Hop Carpet': 'closed',
  'Tubing Carpet': 'closed'
});

trails('plattekill', [
  {
    'name': 'Beginner Learning Center',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Express Lane',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Overlook',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Powder Puff (Lower)',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Powder Puff (Upper)',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': "Rascal's Flats",
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Backdraft',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Bail Out',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Buckle Up',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Cat Track',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Crossover',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Drop In',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Gateway',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Home Run',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Horse Shoe',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'I Think I Can',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Just Do It',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Lower Face',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Lower NorthFace',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Lower Ridge Run',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Lower Twist',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Shredded Mozzarella',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Sundown',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Switchback',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Whiskey’s Way',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Wing It',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Bumps',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Cliffs',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Lower Plunge',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'The Chute',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Upper Face',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Upper Ridge Run',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Upper Twist',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Blockbuster',
    'status': 'closed',
    'level': 'doubleBlack'
  },
  {
    'name': 'Freefall',
    'status': 'closed',
    'level': 'doubleBlack'
  },
  {
    'name': 'Giant Slalom',
    'status': 'closed',
    'level': 'doubleBlack'
  },
  {
    'name': 'Pipeline',
    'status': 'closed',
    'level': 'doubleBlack'
  },
  {
    'name': 'Rocket',
    'status': 'closed',
    'level': 'doubleBlack'
  },
  {
    'name': 'Upper Northface',
    'status': 'closed',
    'level': 'doubleBlack'
  },
  {
    'name': 'Upper Plunge',
    'status': 'closed',
    'level': 'doubleBlack'
  },
  {
    'name': 'TERRAIN PARK',
    'status': 'closed',
    'level': 'terrainPark'
  }
]);
