import trails from '../trails/index.js';

// 2026-01-01 capture: every group carries an OPEN/CLOSED marker, and the
// green/black/glade groups put theirs in a different order than the blue one
trails('camden-snow-bowl', [
  {
    'name': 'Slipway',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Coaster',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Lower Foxy',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Upper Foxy',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Half Hitch',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Spinnaker',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Windjammer',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Lower Mussel Ridge',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Clipper',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Northeaster',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'T-Line',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Chair Line',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Mizzensail Crossing',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Mainsail Crossing',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Upper Mussel ridge',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Lookout',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Wave Pool',
    'status': 'open',
    'level': 'terrainPark'
  },
  {
    'name': 'Windjammer',
    'status': 'closed',
    'level': 'terrainPark'
  },
  {
    'name': 'Mainsail',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Topsail',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Mizzensail',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Crows Nest',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Whale Belly',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'The Graves',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Scrimshaw',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': "Connie's Light",
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Holy Stone',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Downeast',
    'status': 'closed',
    'level': 'black'
  }
]);

// 2026-02-01 capture: the Glades group ships with no status marker at all,
// so that whole run falls back to closed instead of coercing to scheduled
trails(
  'camden-snow-bowl',
  [
    {
      'name': 'Slipway',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Coaster',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Lower Foxy',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Clipper',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Half Hitch',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Lower Mussel Ridge',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Spinnaker',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'T-Line',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Upper Foxy',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Windjammer',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Chair Line',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Northeaster',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Upper Mussel ridge',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Lookout',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Wave Pool',
      'status': 'open',
      'level': 'terrainPark'
    },
    {
      'name': 'Windjammer',
      'status': 'open',
      'level': 'terrainPark'
    },
    {
      'name': 'Mainsail',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Topsail',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Mizzensail',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Crows Nest',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Whale Belly',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'The Graves',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Scrimshaw',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': "Connie's Light",
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Holy Stone',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Downeast',
      'status': 'closed',
      'level': 'black'
    }
  ],
  { example: 'camden-snow-bowl-feb' }
);
