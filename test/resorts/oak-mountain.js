import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// Live page fetched 2026-11-17, stamped 11.05.2026: pre-season, every lift and
// trail CLOSED.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-11-17T15:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-11-17T15:00:00Z');
  }
};

lifts('oak-mountain', 'html', {
  'Tree Stand Surface Lift': 'closed',
  "Einstein's Way": 'closed',
  'Village TBar': 'closed',
  "Preston's Surface Lift": 'closed'
});

trails('oak-mountain', [
  {
    'name': 'Bunny Hill',
    'status': 'closed',
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
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Upper Speculator',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Lower Speculator',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Sacandaga',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Upper Midway',
    'status': 'closed',
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
    'status': 'closed',
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
    'status': 'closed',
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
]);
