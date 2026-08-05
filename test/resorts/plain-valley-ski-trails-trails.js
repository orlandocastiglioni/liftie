import trails from '../trails/index.js';

// fixture: nordic-pulse.com embed page for Plain Valley Ski Trails, Wayback
// snapshot 2026-02-08 (mid-season). The shared tools/nordic-pulse.js parser
// reads body.trails out of the Angular TransferState blob in script#ng-state
// and emits only 'open' | 'closed' | 'hold' plus green/blue/black, all of
// which coerce.js and normalizeLevel already know. 'BCT Bridge Connector' is
// hide:true in the feed (an internal sub-segment) so it is dropped, leaving
// 26 of the 27 published segments.
trails('plain-valley-ski-trails', [
  {
    name: 'Grizzly Mountain',
    status: 'hold',
    level: 'black'
  },
  {
    name: 'Sprint Loop',
    status: 'closed',
    level: 'black'
  },
  {
    name: 'Stonewater Loop South',
    status: 'hold',
    level: 'blue'
  },
  {
    name: 'Meadow Loop',
    status: 'open',
    level: 'green'
  },
  {
    name: 'Chainsaw Ridge',
    status: 'closed',
    level: 'black'
  },
  {
    name: 'Swamp Creek Loop',
    status: 'open',
    level: 'blue'
  },
  {
    name: 'Cougar Run',
    status: 'closed',
    level: 'black'
  },
  {
    name: 'Mill Hill',
    status: 'hold',
    level: 'black'
  },
  {
    name: 'Rowdy Coyote',
    status: 'hold',
    level: 'black'
  },
  {
    name: 'Meadow Loop Cutoff',
    status: 'open',
    level: 'green'
  },
  {
    name: 'Lumi Lane',
    status: 'closed',
    level: 'black'
  },
  {
    name: 'BCT South',
    status: 'open',
    level: 'blue'
  },
  {
    name: 'BCT Middle',
    status: 'hold',
    level: 'green'
  },
  {
    name: 'BCT North',
    status: 'hold',
    level: 'green'
  },
  {
    name: 'Grizzly Mountain North',
    status: 'open',
    level: 'black'
  },
  {
    name: 'Sprint Loop Connector',
    status: 'closed',
    level: 'green'
  },
  {
    name: 'Osprey Lodge Trailhead',
    status: 'open',
    level: 'green'
  },
  {
    name: 'Walk In Trailhead',
    status: 'hold',
    level: 'green'
  },
  {
    name: 'Rowdy Coyote Cutoff',
    status: 'hold',
    level: 'blue'
  },
  {
    name: 'Cougar Run Cutoff',
    status: 'closed',
    level: 'black'
  },
  {
    name: 'BCT Middle North',
    status: 'hold',
    level: 'green'
  },
  {
    name: 'Stonewater Loop North',
    status: 'open',
    level: 'black'
  },
  {
    name: 'Beaver Creek Loop',
    status: 'open',
    level: 'green'
  },
  {
    name: 'Campground Loop',
    status: 'open',
    level: 'green'
  },
  {
    name: 'Skier Drops',
    status: 'closed',
    level: 'green'
  },
  {
    name: 'Mountain Springs Lodge Access',
    status: 'open',
    level: 'green'
  }
]);
