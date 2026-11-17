import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// Wayback capture of 2026-01-20 (web.archive.org/web/20260120203934), read the
// same day: banners "January 19, 2026" and "January 20, 2026 - 9AM Report", all
// 3 lifts and 9 of 10 slopes open (the older, ungrouped slope table).
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
  'holiday-mountain',
  'html',
  {
    'Turkey Trot Chair Lift': 'open',
    'Roman Candle Chair Lift': 'open',
    'Magic Carpet': 'open'
  },
  { example: 'holiday-mountain-2026-01' }
);

trails(
  'holiday-mountain',
  [
    {
      'name': 'Kroeger Pass',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Turkey trot',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Upper Independence Run',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Mambo Night',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Independence Terrain Park',
      'status': 'open',
      'level': 'terrainPark'
    },
    {
      'name': "Benson's Glade",
      'status': 'open',
      'level': 'green'
    },
    {
      'name': "Manny's Run",
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Roman Candle',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Hackledam',
      'status': 'closed',
      'level': 'doubleBlack'
    },
    {
      'name': 'Learning Center',
      'status': 'open',
      'level': 'green'
    }
  ],
  { example: 'holiday-mountain-2026-01' }
);
