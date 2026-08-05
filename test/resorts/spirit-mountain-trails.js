import trails from '../trails/index.js';

// The parser drops a feed nobody has touched in 30 days, so this pins the clock
// to the day after the fixture's newest modified_gmt (2026-04-09).
// `node --test` gives each file its own process, so the override stays here.
const RealDate = Date;
const PINNED = '2026-04-10T12:00:00Z';
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : [PINNED]));
  }
  static now() {
    return RealDate.parse(PINNED);
  }
};

// fixture: live wp/v2/trail feed captured 2026-08-05 (x-wp-total: 23). Spirit
// does not reset the taxonomy at season end, so every trail is still tagged
// open in August - the fixture therefore pins the row set, the name spelling
// and the trail-difficulty -> level mapping rather than a real day's mix.
// The status vocabulary itself is covered in test/resorts/spirit-mountain.js.
trails(
  'spirit-mountain',
  [
    {
      'name': '18-Line (Jumps near Lone Oak)',
      'status': 'open',
      'level': 'terrainPark'
    },
    {
      'name': 'Spirit Park (Big Park)',
      'status': 'open',
      'level': 'terrainPark'
    },
    {
      'name': 'Lone Oak (Tow Park)',
      'status': 'open',
      'level': 'terrainPark'
    },
    {
      'name': 'Bear Claw',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Gandy Dancer',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Blue Ruin',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Bull Wacker',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Summit Chute',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Duck Leg Shorty',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Cinder Snapper',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Flume',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Skyhooker',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Bindle Stiff',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Log Roller',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Scissor Bill',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Timber Cruiser',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Prospector Beginner Area',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Downhill Musher',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Powder Monkey',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Four Pipe',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Double Jaw',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Juggler Joe',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Sour Dough Sam',
      'status': 'open',
      'level': 'green'
    }
  ],
  { ext: 'json', example: 'spirit-mountain-trails' }
);
