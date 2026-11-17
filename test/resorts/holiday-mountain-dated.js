import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// SYNTHETIC: the 2026-11-17 live page with each "CLOSED FOR THE SEASON" banner
// replaced by "November 16, 2026", to read today's layout (3 lifts, 21 slopes
// under per-lift group headings, the tubing lane dropped). Every row is closed.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-11-17T15:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-11-17T15:00:00Z');
  }
};

lifts(
  'holiday-mountain',
  'html',
  {
    'Turkey Trot Chair Lift': 'closed',
    'Roman Candle Chair Lift': 'closed',
    'Magic Carpet': 'closed'
  },
  { example: 'holiday-mountain-dated' }
);

trails(
  'holiday-mountain',
  [
    {
      'name': 'Yada-Yada',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Irish Goodbye',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Free Bird',
      'status': 'closed',
      'level': 'doubleBlack'
    },
    {
      'name': 'Bada Bing',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'New Years Eve',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'The Bowl',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Big Vanilla',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Upper Cimarron City',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Cimarron City',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': "Foxy John's",
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Kroeger Pass',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Turkey Trot',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Upper Independence Run',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Independence Terrain Park',
      'status': 'closed',
      'level': 'terrainPark'
    },
    {
      'name': 'Mambo Night',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Sackett Road',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': "Benson's Glade",
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': "Manny's Run",
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Roman Candle',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Hackledam',
      'status': 'closed',
      'level': 'doubleBlack'
    },
    {
      'name': 'Learning Center',
      'status': 'closed',
      'level': 'green'
    }
  ],
  { example: 'holiday-mountain-dated' }
);
