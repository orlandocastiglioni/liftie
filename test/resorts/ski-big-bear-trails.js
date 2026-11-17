import { mock } from 'node:test';
import trails from '../trails/index.js';

// the dated 'Open 12/13/25' rows read open from that day on: pin the clock to
// opening day, 2025-12-13 (see ski-big-bear-scheduled.js for the day before)
mock.timers.enable({ apis: ['Date'], now: new Date('2025-12-13T15:00:00Z') });

trails(
  'ski-big-bear',
  [
    { name: 'Snowbird', status: 'open', level: 'green' },
    { name: 'Whispering Run', status: 'open', level: 'green' },
    { name: 'Lower Jamboree', status: 'open', level: 'green' },
    { name: "Upper Eagle's Pass", status: 'open', level: 'green' },
    { name: "Lower Eagle's Pass", status: 'open', level: 'green' },
    { name: "Cruisin'", status: 'open', level: 'green' },
    { name: 'Upper Jamboree', status: 'open', level: 'blue' },
    { name: 'Terrain Park', status: 'open', level: 'terrainPark' },
    { name: 'Grizzly', status: 'open', level: 'blue' },
    { name: 'Upper Polar Bear', status: 'closed', level: 'blue' },
    { name: "Sheldon's Way (Formerly Bailout)", status: 'closed', level: 'blue' },
    { name: 'Shortcut', status: 'open', level: 'blue' },
    { name: 'Upper Thundercloud', status: 'closed', level: 'black' },
    { name: 'Lower Thundercloud', status: 'open', level: 'black' },
    { name: "Devil's Bowl", status: 'closed', level: 'black' },
    { name: "Devil's Dip", status: 'open', level: 'black' },
    { name: 'Lower Polar Bear', status: 'closed', level: 'black' },
    { name: "Screamin' Demon", status: 'closed', level: 'doubleBlack' }
  ],
  { ext: 'json' }
);
