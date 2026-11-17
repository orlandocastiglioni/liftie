import trails from '../trails/index.js';

// fixture: web.archive.org capture of the Nordic Pulse area page from
// 2026-03-06, late winter - 83 open, 17 hold, 15 closed across 115 trails.
// The shared tool in lib/tools/nordic-pulse.js reads the data-npww payload out
// of the Angular TransferState blob in script#ng-state and maps
// open + hazard -> hold, open -> open, otherwise closed (8 closed rows carry
// hazard:true and used to be published as 'hold').
//
// The five trails with no level (Lower/Upper Sunnyside, Beaver Pond, Beaver
// Loop, Aspen Loop) are published as piste:difficulty "novice", which the
// shared tool's own levels map does not know - lib/trails/parse.js does map
// novice to green, so adding it to the tool would give these five a level and
// flip those five expectations.
trails('methow-trails-xc', [
  {
    'name': 'Cow Creek',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': "Lynn's",
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Cedar Creek Loop (black)',
    'status': 'hold',
    'level': 'black',
    'hazard': true
  },
  {
    'name': 'Homestead',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Ponderosa',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Horse Trail',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Little Wolf',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Tawlk-Foster Suspension Bridge',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Radar Creek',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Raven',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Blue Jay',
    'status': 'hold',
    'level': 'blue',
    'hazard': true
  },
  {
    'name': 'Gunn Ranch',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Winthrop Trail (Lower)',
    'status': 'hold',
    'level': 'blue',
    'hazard': true
  },
  {
    'name': 'Patterson Lake',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Yellow Jacket',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Founders Trail',
    'status': 'hold',
    'level': 'green',
    'hazard': true
  },
  {
    'name': 'Lower Meadowlark',
    'status': 'hold',
    'level': 'blue',
    'hazard': true
  },
  {
    'name': 'Little Cub Creek',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Thompson Pass',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Sunnyside Access',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Moose',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Cassal Cutoff',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Lower Sunnyside',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Upper Fox',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Powers Plunge',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Overland',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Heifer Hut',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Lower River Run',
    'status': 'hold',
    'level': 'green',
    'hazard': true
  },
  {
    'name': 'Lower Inside Passage',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Upper Inside Passage',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Lower Rendezvous Basin',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Upper Fawn Creek',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Inn Run Loop',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Cabin',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Rader Creek',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Beaver Pond',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Goat Wall Loop',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Rodeo',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Methow Valley Community Trail- Powers Plunge to Wolf Ridge',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Lower Fox',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Sandy Butte',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Big Valley (Inner Loop)',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Rattlesnake Cutoff',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Aqua Loop',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Lower Fawn Creek',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'View Ridge',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Upper River Run',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Grizzly Mountain Loop',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Goat Creek Cutoff',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Cub Creek',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': "Jack's",
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Base Camp',
    'status': 'hold',
    'level': 'green',
    'hazard': true
  },
  {
    'name': 'Methow Valley Community Trail- Mazama to Freestone Inn',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Cedar Creek Loop (blue)',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Cassal Hut',
    'status': 'hold',
    'level': 'black',
    'hazard': true
  },
  {
    'name': 'Cougar Mountain Loop',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Winthrop Trail (Upper)',
    'status': 'hold',
    'level': 'black',
    'hazard': true
  },
  {
    'name': 'Criss Cross',
    'status': 'hold',
    'level': 'blue',
    'hazard': true
  },
  {
    'name': 'Flagg Mountain Loop',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Methow',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Shortcut',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Chickadee',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': "Upper Jack's",
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Upper Cougar Bait',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Bitterbrush',
    'status': 'hold',
    'level': 'blue',
    'hazard': true
  },
  {
    'name': 'Fish Hatchery',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Grizzly Hut',
    'status': 'hold',
    'level': 'blue',
    'hazard': true
  },
  {
    'name': 'Cassal Creek Loop (black)',
    'status': 'hold',
    'level': 'black',
    'hazard': true
  },
  {
    'name': 'Lunachik',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Bob',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Rendezvous Pass',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Thompson Ridge',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Rendezvous Hut',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Coyote Run',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Upper Thompson Ridge',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Lakeview',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Methow Valley Community Trail- Winthrop to Powers Plunge',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Kraule',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Black Bear',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Spring Creek Ranch & Loop',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Lower Rendezvous Pass',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Magpie Loop',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': "John's Way",
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Methow Valley Community Trail- Browns Farm to Suspension Bridge Trailhead',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Winthrop Fatbike Snowshoe',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Cassal Creek Loop (blue)',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Grizzly Way',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Doe Canyon Loop',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Goat Creek',
    'status': 'hold',
    'level': 'blue',
    'hazard': true
  },
  {
    'name': 'Early Winters',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Big Valley (Outer Loop)',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Beaver Loop',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Rendezvous Basin',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Methow Valley Community Trail- Wolf Ridge to Browns Farm',
    'status': 'hold',
    'level': 'green',
    'hazard': true
  },
  {
    'name': 'Aspen Loop',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Barnsley Lake',
    'status': 'hold',
    'level': 'blue',
    'hazard': true
  },
  {
    'name': 'Sick Joke Hill',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Doe Canyon',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Corral Trail',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Click-A-Pic',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Brown’s Farm loop',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'TWiN',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Red Tail',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Washington Pass',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Klipchuck',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Cutthroat',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Lone Fir',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Methow Community Trail- Powers Plunge to Wolf Ridge',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Methow Community Trail- Wolf Ridge to Browns Farm',
    'status': 'hold',
    'level': 'blue',
    'hazard': true
  },
  {
    'name': 'Methow Community Trail- Browns Farm to Suspension Bridge Trailhead',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Methow Community Trail- Winthrop to Powers Plunge',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Climb It Change Lower',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Upper Meadowlark',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Upper Sunnyside',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Cub Creek Connector',
    'status': 'open',
    'level': 'green'
  }
]);
