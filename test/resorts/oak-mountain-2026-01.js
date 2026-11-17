import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// Wayback capture of 2026-01-22 (web.archive.org/web/20260122065901), read the
// next day: stamped 01.21.2026, with 3 of 4 lifts and 8 of 22 trails open - the
// same counts the page's own "Total Lifts / Trails Open" rows give.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-01-22T12:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-01-22T12:00:00Z');
  }
};

lifts(
  'oak-mountain',
  'html',
  {
    'Tree Stand Surface Lift': 'open',
    "Einstein's Way": 'open',
    'Village TBar': 'closed',
    "Preston's Surface Lift": 'open'
  },
  { example: 'oak-mountain-2026-01' }
);

trails(
  'oak-mountain',
  [
    {
      'name': 'Bunny Hill',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Crosscut',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Sugarbush',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Madison Ave',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Upper Speculator',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Lower Speculator',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Sacandaga',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Upper Midway',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Lower Midway',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Nova',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Fifth Avenue',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': "Lower Devil's Delight",
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': "Ryan's Run",
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Kujamunk',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'TAG',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Alternate',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'TLP Glades',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Oak Mountain Run',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'The Thing',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': "Upper Devil's Delight",
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'TNT Glades',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Skidway',
      'status': 'closed',
      'level': 'black'
    }
  ],
  { example: 'oak-mountain-2026-01' }
);
