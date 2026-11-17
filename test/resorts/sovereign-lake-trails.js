import trails from '../trails/index.js';

// fixture: nordic-pulse.com embed page, 2026-11-17 (trimmed to the ng-state
// trail feed and the area record). Early season: 5 trails open, 63 closed, and the
// club has hazard:true on all 68. hazard is a warning on an OPEN trail (Nordic Pulse:
// "Trail is open but hazards exist"), so the 5 open ones map to 'hold' and the 63
// closed ones stay 'closed'. Mapping hazard first published all 68 as 'hold'.
trails(
  'sovereign-lake',
  [
    {
      'name': 'Best In Snow 2KM',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Carl Wylie Trail',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Silver Queen',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': "Wylie's Loop",
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': "Montezuma's Revenge",
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Best In Snow 15KM',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Aberdeen',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'White Elephant Lobe 1',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Lower World Cup',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Maid of Vernon',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Passmore',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Stadium',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Aberdeen-SS Conector',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Sovereign',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Maid of Vernon Hill',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Gold Mountain',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Lars Taylor Way',
      'status': 'hold',
      'level': 'black'
    },
    {
      'name': 'Black Prince',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': "Comin' Round The Mountain",
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Black Prince East Loop',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Jessica Trail',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Prince of Wales',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'White Elephant Lobe 2',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Biathlon',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Best In Snow 1KM',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': '1/2 Sovereign',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Meadow Trails',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': "People's Trail",
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'The Whole',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Animal Trail',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Small connectors',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Best In Snow 5KM',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Saddle',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Carl Wylie Cutoff',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': '1400m Sprint Course',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Woodland Bell',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Stadium Bridge',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Montezuma Upper',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'White Elephant Inner',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Montezuma Lower',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Tear Drop',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': "Prince's View",
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Abermore',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'VSA PM S2S',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'World Cup 5KM',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'World Cup 2.5KM',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'VSA PM Early Season',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'VSA Ganzaveld Early Season',
      'status': 'hold',
      'level': 'black'
    },
    {
      'name': 'VSA Meadow',
      'status': 'hold',
      'level': 'black'
    },
    {
      'name': 'VSA Repeater Road',
      'status': 'hold',
      'level': 'blue'
    },
    {
      'name': 'Alder Trail',
      'status': 'closed',
      'level': 'doubleBlack'
    },
    {
      'name': 'Powder Queen',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Upper Kennedy',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Lower Kennedy',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': "Beth's Trail",
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Coyote Caper',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Passmore Connector',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Mystery Express',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Mystery BC',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Aberdeen Early Season',
      'status': 'hold',
      'level': 'black'
    },
    {
      'name': 'Wild Goose',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Cabin Fever',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'White Rabbit',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Trapline Cut-Off',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Hidden Meadow',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Ridgeline',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Trapline',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Trapline (Short)',
      'status': 'closed',
      'level': 'green'
    }
  ],
  { example: 'sovereign-lake-2026-11' }
);
