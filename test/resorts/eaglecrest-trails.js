import trails from '../trails/index.js';

// wayback capture of /conditions/ from 2026-02-25: tablepress-15 carries
// Groomed / 'Open Not Groomed', the gates table is mostly Closed, and the
// nordic table is Groomed - so the fixture exercises every published token.
// East Bowl Chutes / West Bowl / Steep Chutes are listed in both the trail
// report and the gates table; the trail report wins, hence 51 rows and not 54.
// Eaglecrest publishes no difficulty column, so no trail has a level.
trails(
  'eaglecrest',
  [
    { name: 'Muskeg', status: 'open' },
    { name: 'Dolly Varden', status: 'open' },
    { name: 'Platter Chutes', status: 'open' },
    { name: 'Stickleback', status: 'open' },
    { name: 'Black Bear Access', status: 'open' },
    { name: 'Sneaky', status: 'open' },
    { name: 'Sourdough', status: 'open' },
    { name: 'Easy Bowl', status: 'open' },
    { name: 'Williwaw', status: 'open' },
    { name: 'Otter Slide', status: 'open' },
    { name: 'Upper Sluice Box', status: 'open' },
    { name: 'Grubstake', status: 'open' },
    { name: 'Trickster', status: 'open' },
    { name: 'Ego', status: 'open' },
    { name: "Upper Hilary's", status: 'open' },
    { name: "Middle Hilary's", status: 'open' },
    { name: "Lower Hilary's", status: 'open' },
    { name: 'Log Jam', status: 'open' },
    { name: 'Log Jam Runout', status: 'open' },
    { name: 'Raven', status: 'open' },
    { name: 'Raven Runout', status: 'open' },
    { name: 'Barrel Roll', status: 'open' },
    { name: 'Inside Passage', status: 'open' },
    { name: 'Nugget', status: 'open' },
    { name: 'Cheechako', status: 'open' },
    { name: 'Motherlode', status: 'open' },
    { name: 'Drifter', status: 'open' },
    { name: 'Marmot', status: 'open' },
    { name: 'Vertigo', status: 'open' },
    { name: 'Sundance', status: 'open' },
    { name: 'Breakfast Bowl', status: 'open' },
    { name: 'East Bowl Chutes', status: 'open' },
    { name: 'West Bowl', status: 'open' },
    { name: 'Steep Chutes', status: 'open' },
    { name: 'Lower Spruce Chutes', status: 'open' },
    { name: 'Insane', status: 'open' },
    { name: 'Bear Trap', status: 'open' },
    { name: 'Waterfall', status: 'open' },
    { name: 'Most', status: 'open' },
    { name: 'Face', status: 'open' },
    { name: 'Wolverine', status: 'open' },
    { name: 'Hang Ten', status: 'open' },
    { name: 'Lower Trail (Skate)', status: 'open' },
    { name: 'Lower Trail (Classic)', status: 'open' },
    { name: 'Upper Trails (Skate)', status: 'open' },
    { name: 'Upper Trails (Classic)', status: 'open' },
    { name: "People's Park", status: 'closed' },
    { name: 'Terrain Park (Ego)', status: 'closed' },
    { name: "Pittman's Ridge", status: 'closed' },
    { name: 'Beacon Park', status: 'closed' },
    { name: 'Raven Rock', status: 'open' }
  ],
  { example: 'eaglecrest-trails' }
);
