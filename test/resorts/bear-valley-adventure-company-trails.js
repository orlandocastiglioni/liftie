import trails from '../trails/index.js';

// fixture: nordic-pulse.com page for Bear Valley (the club's own "Winter Trail
// Report" at bvadventures.com/daily-trail-report is nothing but nordic-pulse
// iframes), Wayback snapshot 2026-01-22 - mid-season, 20 open / 25 closed.
// The shared tools/nordic-pulse.js parser reads body.trails out of the Angular
// TransferState blob in script#ng-state and emits only 'open' | 'closed' |
// 'hold' plus green/blue/black, all already known to coerce.js and
// normalizeLevel. Three hide:true segments ('Osborne Ridge', 'Obsorne Ridge -
// The Corkscrew', 'Osborne Ridge - Road') are dropped, leaving 45 of 48.
// 'Obsorne Ridge' is the club's own typo, passed through verbatim.
trails('bear-valley-adventure-company', [
  {
    name: 'Waterfall',
    status: 'open',
    level: 'green'
  },
  {
    name: 'Scenic Byway',
    status: 'open',
    level: 'green'
  },
  {
    name: 'Equipe Trail',
    status: 'open',
    level: 'black'
  },
  {
    name: 'Orvis Meadow',
    status: 'open',
    level: 'green'
  },
  {
    name: 'Bjornloppet',
    status: 'closed',
    level: 'blue'
  },
  {
    name: 'Aspen Forest',
    status: 'open',
    level: 'blue'
  },
  {
    name: 'Bear Trail',
    status: 'open',
    level: 'green'
  },
  {
    name: 'Warming Hut',
    status: 'open',
    level: 'green'
  },
  {
    name: 'Out and About',
    status: 'open',
    level: 'green'
  },
  {
    name: 'Sunshine Bowl',
    status: 'closed',
    level: 'blue'
  },
  {
    name: 'Stanislaus Lookout',
    status: 'open',
    level: 'blue'
  },
  {
    name: 'Grin and Bear It',
    status: 'closed',
    level: 'black'
  },
  {
    name: 'Hidden Meadow',
    status: 'open',
    level: 'green'
  },
  {
    name: 'Headwater Trail',
    status: 'closed',
    level: 'blue'
  },
  {
    name: 'Walden Cutoff',
    status: 'closed',
    level: 'black'
  },
  {
    name: 'Walden Meadow',
    status: 'closed',
    level: 'blue'
  },
  {
    name: 'Scenic Vista',
    status: 'closed',
    level: 'blue'
  },
  {
    name: 'Box Canyon',
    status: 'open',
    level: 'green'
  },
  {
    name: 'Ridgerunner',
    status: 'closed',
    level: 'black'
  },
  {
    name: 'Super Scenic',
    status: 'closed',
    level: 'black'
  },
  {
    name: 'Black Diamond',
    status: 'closed',
    level: 'black'
  },
  {
    name: 'Jacks Trail',
    status: 'closed',
    level: 'blue'
  },
  {
    name: 'Indian Rock',
    status: 'closed',
    level: 'blue'
  },
  {
    name: 'Ridgerunner Extension',
    status: 'closed',
    level: 'black'
  },
  {
    name: 'Stables Cruise',
    status: 'open',
    level: 'green'
  },
  {
    name: 'Creekside Cruise',
    status: 'open',
    level: 'green'
  },
  {
    name: "Ted's Trail",
    status: 'open',
    level: 'green'
  },
  {
    name: 'Canyon Vista',
    status: 'closed',
    level: 'blue'
  },
  {
    name: 'Bloods Creek',
    status: 'open',
    level: 'green'
  },
  {
    name: 'Headwaters Bridge',
    status: 'open',
    level: 'green'
  },
  {
    name: 'Lodgepole Loop',
    status: 'open',
    level: 'green'
  },
  {
    name: 'Grand Vista',
    status: 'closed',
    level: 'blue'
  },
  {
    name: 'Ridgerunner Viewpoint',
    status: 'closed',
    level: 'black'
  },
  {
    name: 'Pooh Trail',
    status: 'open',
    level: 'green'
  },
  {
    name: 'Biathlon',
    status: 'open',
    level: 'green'
  },
  {
    name: 'Obsorne Ridge',
    status: 'closed',
    level: 'black'
  },
  {
    name: 'Quick Connect',
    status: 'closed',
    level: 'blue'
  },
  {
    name: 'Granite Roller',
    status: 'closed',
    level: 'blue'
  },
  {
    name: 'Equipe Downhill',
    status: 'closed',
    level: 'blue'
  },
  {
    name: 'Lower Ridgerunner',
    status: 'closed',
    level: 'black'
  },
  {
    name: 'Aspen Uphill',
    status: 'closed',
    level: 'blue'
  },
  {
    name: 'Granite to Equipe',
    status: 'open',
    level: 'blue'
  },
  {
    name: 'Equipe Trail Connector',
    status: 'closed',
    level: 'black'
  },
  {
    name: 'Lower Osborne Ridge',
    status: 'closed',
    level: 'black'
  },
  {
    name: 'Super Scenic Vista',
    status: 'closed',
    level: 'black'
  }
]);
