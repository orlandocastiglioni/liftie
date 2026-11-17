import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// The same 2026-11-17 capture read the day after opening (2026-12-05): the gate
// is open and every row flows as the page lists it.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-12-06T12:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-12-06T12:00:00Z');
  }
};

lifts(
  'pine-mountain',
  'html',
  {
    'Bunny Hill Rope Tow': 'open',
    Hematite: 'open',
    Panorama: 'open'
  },
  { example: 'pine-mountain-2026-11' }
);

trails(
  'pine-mountain',
  [
    { name: 'Birch', status: 'open' },
    { name: 'Birch Access', status: 'open' },
    { name: 'Black Bear Way', status: 'open' },
    { name: 'Boneyard', status: 'open' },
    { name: 'Bonzai', status: 'open' },
    { name: 'Bunny Hill', status: 'open' },
    { name: 'Cubs Corner', status: 'open' },
    { name: 'Cut Across', status: 'open' },
    { name: 'Fallout', status: 'open' },
    { name: 'Fred’s Folly', status: 'open' },
    { name: 'Hematite', status: 'open' },
    { name: 'Here to There', status: 'open' },
    { name: "Irving's Ravine", status: 'open' },
    { name: 'Meadow', status: 'open' },
    { name: 'Meadows Landing Area', status: 'open' },
    { name: 'Middle Slope', status: 'open' },
    { name: 'Nirvana', status: 'open' },
    { name: 'Off the Grid', status: 'open' },
    { name: 'Open Slope', status: 'open' },
    { name: 'Oak', status: 'open' },
    { name: 'Panorama', status: 'open' },
    { name: 'Ricochet', status: 'open' },
    { name: 'Spruce', status: 'open' },
    { name: 'Upper Oak', status: 'open' },
    { name: 'West Wall', status: 'open' }
  ],
  { example: 'pine-mountain-2026-11' }
);
