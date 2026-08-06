import trails from '../trails/index.js';

// Winter capture of activities/v1/slopes from the same 2025-11-17 19:43Z
// wayback snapshot as the lifts fixture. Early season: N.1 / ICE.1 / ICE.2
// plus the Fun Park are open, and seven more carry inSnowPreparation=true
// (snowmaking under way, not open yet) which this parser publishes as
// 'scheduled'. Levi's own statistics/v1/today from that snapshot reports
// slopes 3 of 44 open plus snowParks 1 of 4 - the Fun Park is the snow park,
// so 4 open rows here is the same number counted differently.
//
// All 50 rows are published. The resort's headline 44 excludes the six
// dontCount=1 entries (Fun Park, Leevilandia, Mini Park, 13.3 and the two
// connector routes).
//
// Levels are the four-tier European scale: Helppo->blue, Keskivaikea (red)
// ->black, Vaikea (black)->doubleBlack. '6.3 ' arrives with a trailing space
// in the feed and is trimmed by lib/trails/parse.js.
trails(
  'levi',
  [
    { name: 'E.1', status: 'scheduled', level: 'black' },
    { name: 'N.1', status: 'open', level: 'black' },
    { name: 'ICE.1', status: 'open', level: 'black' },
    { name: 'ICE.2', status: 'open', level: 'black' },
    { name: 'Fun Park', status: 'open', level: 'black' },
    { name: '4.1', status: 'closed', level: 'blue' },
    { name: '8.1', status: 'closed', level: 'blue' },
    { name: '8.2', status: 'closed', level: 'blue' },
    { name: '8.3', status: 'closed', level: 'blue' },
    { name: '8.4', status: 'scheduled', level: 'blue' },
    { name: '8.5', status: 'closed', level: 'blue' },
    { name: 'Leevilandia', status: 'closed', level: 'blue' },
    { name: 'Mini Park', status: 'closed', level: 'blue' },
    { name: '9.1 Junior Park', status: 'closed', level: 'blue' },
    { name: '9.2 South Park', status: 'closed', level: 'doubleBlack' },
    { name: 'W.1', status: 'closed', level: 'black' },
    { name: 'W.2', status: 'closed', level: 'black' },
    { name: 'W.3', status: 'scheduled', level: 'black' },
    { name: '12.1', status: 'closed', level: 'blue' },
    { name: '12.2', status: 'closed', level: 'blue' },
    { name: '12.3', status: 'closed', level: 'blue' },
    { name: 'G.1', status: 'closed', level: 'blue' },
    { name: 'G.2', status: 'scheduled', level: 'doubleBlack' },
    { name: 'G.3', status: 'closed', level: 'blue' },
    { name: '13.1', status: 'closed', level: 'doubleBlack' },
    { name: '13.2', status: 'closed', level: 'black' },
    { name: '13.3', status: 'closed', level: 'doubleBlack' },
    { name: 'Alpine Training Park', status: 'scheduled', level: 'black' },
    { name: '13.4', status: 'closed', level: 'black' },
    { name: '14.1', status: 'closed', level: 'black' },
    { name: '14.2', status: 'closed', level: 'black' },
    { name: '14.3', status: 'scheduled', level: 'blue' },
    { name: '5.1', status: 'closed', level: 'black' },
    { name: '5.3 non-groomed', status: 'closed', level: 'black' },
    { name: '5.4', status: 'closed', level: 'black' },
    { name: '6.1', status: 'scheduled', level: 'black' },
    { name: '6.2', status: 'closed', level: 'black' },
    { name: '6.3', status: 'closed', level: 'black' },
    { name: '6.4', status: 'closed', level: 'black' },
    { name: '7.3', status: 'closed', level: 'black' },
    { name: '7.4', status: 'closed', level: 'blue' },
    { name: '7.5', status: 'closed', level: 'black' },
    { name: '7.2', status: 'closed', level: 'black' },
    { name: '7.1', status: 'closed', level: 'blue' },
    { name: '7B.1', status: 'closed', level: 'blue' },
    { name: '7B.2', status: 'closed', level: 'blue' },
    { name: '7B.3', status: 'closed', level: 'blue' },
    { name: '7B.4', status: 'closed', level: 'blue' },
    { name: 'Siirtymäreitti / Connecting Route 1-5', status: 'closed', level: 'blue' },
    { name: 'Siirtymäreitti / Connecting Route 8-10', status: 'closed', level: 'blue' }
  ],
  { ext: 'json', example: 'levi-trails' }
);
