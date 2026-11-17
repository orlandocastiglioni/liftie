import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// Live page fetched 2026-11-17: pre-season, the CMS list reset to closed and the
// announcement bar undated, so the gate fails open: 8 lifts, 41 trails, all closed.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-11-17T15:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-11-17T15:00:00Z');
  }
};

lifts('kissing-bridge', 'html', {
  'Holly Triple': 'closed',
  'Twister Rope Tow': 'closed',
  'Coal Chute Rope Tow': 'closed',
  'World': 'closed',
  'North Quad': 'closed',
  'South': 'closed',
  'Magic Carpet': 'closed',
  'Holly Quad': 'closed'
});

trails('kissing-bridge', [
  {
    'name': 'Hemlock',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Mistletoe',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Candy Cane “Bunny Hill”',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Holly',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Rooster Run',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Eagle',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': "Eagle's Nest",
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Twister',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Coal Chute',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Twist',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Devils Funnel',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Freedom 35',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Right On',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'World of Your Own',
    'status': 'closed',
    'level': 'doubleBlack'
  },
  {
    'name': 'South Shuttle',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'EZ Rider',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Moment of Truth',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Black Jack',
    'status': 'closed',
    'level': 'doubleBlack'
  },
  {
    'name': 'Crazy Eights',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Slalom Run (Race Arena)',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Glen “Woods”',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Taco Trail',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Exhibition (closes at 5:00pm)',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Dream (Top Only)',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Great Northern',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Switchback',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Cruisers Corner',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'North Shuttle',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Glade',
    'status': 'closed'
  },
  {
    'name': "Dealer's Choice",
    'status': 'closed'
  },
  {
    'name': 'Hemlock Branch',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Thunder Run',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Outside Edge - Closes at 5:00pm',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Woods Trail (Closes at 5:00pm)',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Snow Ball',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Twinkle',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Shindig',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Lower Shuttle',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Rope Tow Park',
    'status': 'closed',
    'level': 'terrainPark'
  },
  {
    'name': 'World Park',
    'status': 'closed',
    'level': 'terrainPark'
  },
  {
    'name': 'Mini Park',
    'status': 'closed',
    'level': 'terrainPark'
  }
]);
