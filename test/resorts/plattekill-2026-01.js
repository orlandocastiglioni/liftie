import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// Wayback capture of 2026-01-15 (web.archive.org/web/20260115125610), read the
// same day: "REPORT AS OF: 1/11/26", four days old, so it publishes.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-01-15T15:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-01-15T15:00:00Z');
  }
};

lifts(
  'plattekill',
  'html',
  {
    'Sunshine Triple Chair': 'open',
    'Northface Double Chair': 'open',
    'Bunny Hop Carpet': 'open',
    'Tubing Carpet': 'closed'
  },
  { example: 'plattekill-2026-01' }
);

trails(
  'plattekill',
  [
    {
      'name': 'Beginner Learning Center',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Express Lane',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Overlook',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Powder Puff (Lower)',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Powder Puff (Upper)',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': "Rascal's Flats",
      'status': 'open',
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
      'status': 'open',
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
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Just Do It',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Lower Face',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Lower NorthFace',
      'status': 'open',
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
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Sundown',
      'status': 'open',
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
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'The Chute',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Upper Face',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Upper Upper Ridge Run',
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
      'status': 'open',
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
      'status': 'open',
      'level': 'doubleBlack'
    },
    {
      'name': 'Upper Plunge',
      'status': 'open',
      'level': 'doubleBlack'
    },
    {
      'name': 'TERRAIN PARK',
      'status': 'closed',
      'level': 'terrainPark'
    }
  ],
  { example: 'plattekill-2026-01' }
);
