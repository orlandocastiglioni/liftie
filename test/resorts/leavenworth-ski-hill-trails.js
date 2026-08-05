import trails from '../trails/index.js';

// Same fixture as the lift test - one JSON:API node carries all 14 rows for
// the club's four venues (see leavenworth-ski-hill.js for how the fixture was
// built). Venue prefixes are required: 'Snowshoe Trail' appears three times
// and 'Nordic Trails 8km' twice. No difficulty is published, so no level.
trails(
  'leavenworth-ski-hill',
  [
    { name: 'Ski Hill - Tubing Park', status: 'open' },
    { name: 'Ski Hill - Nordic Trails 10km', status: 'open' },
    { name: 'Ski Hill - Snowshoe Trail', status: 'open' },
    { name: 'Ski Hill - Fat Bike Trail', status: 'open' },
    { name: 'Ski Hill - Ski Jump', status: 'open' },
    { name: 'Ski Hill - Lodge', status: 'open' },
    { name: 'Icicle River Trails - Nordic Trails 8km', status: 'open' },
    { name: 'Icicle River Trails - Snowshoe Trail', status: 'open' },
    { name: 'Golf Course - Nordic Trails 8km', status: 'closed' },
    { name: 'Golf Course - Snowshoe Trail', status: 'closed' },
    { name: 'Golf Course - Sledding Hill', status: 'open' },
    { name: 'Peshastin Mill Site - Dog Friendly Nordic Trail', status: 'open' }
  ],
  { ext: 'json' }
);
