import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// Wayback capture of 2026-01-20 (web.archive.org/web/20260120212511), read the
// same day: the announcement bar says "Tuesday 1/20/26". 6 of 8 lifts open (the
// page's own counter says 6/9), 25 of 41 trails and parks: 23 trails open, as
// the page's own trail counter says (23/39), plus 2 of 3 parks.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-01-20T16:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-01-20T16:00:00Z');
  }
};

lifts(
  'kissing-bridge',
  'html',
  {
    'Holly Triple': 'open',
    'Twister Rope Tow': 'closed',
    'Coal Chute Rope Tow': 'open',
    'World': 'open',
    'North Quad': 'closed',
    'South': 'open',
    'Magic Carpet': 'open',
    'Holly Quad': 'open'
  },
  { example: 'kissing-bridge-2026-01' }
);

trails(
  'kissing-bridge',
  [
    {
      'name': 'Hemlock',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Mistletoe',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Candy Cane “Bunny Hill”',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Holly',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Rooster Run',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Eagle',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': "Eagle's Nest",
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Twister',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Coal Chute',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Twist',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Devils Funnel',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Freedom 35',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Right On',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'World of Your Own',
      'status': 'open',
      'level': 'doubleBlack'
    },
    {
      'name': 'South Shuttle',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'EZ Rider',
      'status': 'open',
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
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Thunder Run',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Outside Edge - Closes at 5:00pm',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Woods Trail (Closes at 5:00pm)',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Snow Ball',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Twinkle',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Shindig',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Lower Shuttle',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Rope Tow Park',
      'status': 'open',
      'level': 'terrainPark'
    },
    {
      'name': 'World Park',
      'status': 'closed',
      'level': 'terrainPark'
    },
    {
      'name': 'Mini Park',
      'status': 'open',
      'level': 'terrainPark'
    }
  ],
  { example: 'kissing-bridge-2026-01' }
);
