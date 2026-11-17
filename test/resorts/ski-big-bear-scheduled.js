import { mock } from 'node:test';
import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// The 2025-12-11 payload as it read on the day it was captured: "We will be
// open Saturday, December 13". Its dated 'Open 12/13/25' rows are an announced
// opening, not an open lift, so two days early they are scheduled. Undated
// 'Open to Little Bear Chair' stays open.
mock.timers.enable({ apis: ['Date'], now: new Date('2025-12-11T15:30:00Z') });

lifts('ski-big-bear', 'json', {
  'Thundercloud Chair 1': 'scheduled',
  'Thundercloud Chair 2': 'closed',
  'Little Bear Chair': 'scheduled',
  'Grizzly': 'closed',
  'Magic Carpet 1': 'scheduled',
  'Magic Carpet 2': 'closed',
  'SunKid Carpet': 'closed'
});

trails(
  'ski-big-bear',
  [
    { name: 'Snowbird', status: 'scheduled', level: 'green' },
    { name: 'Whispering Run', status: 'open', level: 'green' },
    { name: 'Lower Jamboree', status: 'scheduled', level: 'green' },
    { name: "Upper Eagle's Pass", status: 'scheduled', level: 'green' },
    { name: "Lower Eagle's Pass", status: 'scheduled', level: 'green' },
    { name: "Cruisin'", status: 'scheduled', level: 'green' },
    { name: 'Upper Jamboree', status: 'scheduled', level: 'blue' },
    { name: 'Terrain Park', status: 'scheduled', level: 'terrainPark' },
    { name: 'Grizzly', status: 'scheduled', level: 'blue' },
    { name: 'Upper Polar Bear', status: 'closed', level: 'blue' },
    { name: "Sheldon's Way (Formerly Bailout)", status: 'closed', level: 'blue' },
    { name: 'Shortcut', status: 'scheduled', level: 'blue' },
    { name: 'Upper Thundercloud', status: 'closed', level: 'black' },
    { name: 'Lower Thundercloud', status: 'scheduled', level: 'black' },
    { name: "Devil's Bowl", status: 'closed', level: 'black' },
    { name: "Devil's Dip", status: 'scheduled', level: 'black' },
    { name: 'Lower Polar Bear', status: 'closed', level: 'black' },
    { name: "Screamin' Demon", status: 'closed', level: 'doubleBlack' }
  ],
  { ext: 'json' }
);
