import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// Wayback capture of 2026-01-03 (web.archive.org/web/20260103122530), read the
// same day ("Saturday, January 3rd, 2026 - Day# 22"): 5 lifts with a status, all
// open (Chipmunk, Grasshopper Carpet and Rabbits Run had none that day, so only
// their slopes publish) and 45 of 55 slopes open; the page's own counters say
// 38 slopes and 8 glades.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-01-03T16:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-01-03T16:00:00Z');
  }
};

lifts(
  'holimont',
  'html',
  {
    'Expo': 'open',
    'Sunset': 'open',
    'Meadow': 'open',
    'Cascade': 'open',
    'Greer': 'open'
  },
  { example: 'holimont-2026-01' }
);

trails(
  'holimont',
  [
    {
      'name': 'Lullaby Lane',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'T-Bar',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Snow Bird',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Snow Bird Glades',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Slow Poke',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Down Spout',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Corkscrew',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'West Connection',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Exhibition',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Low Road Glade',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'High Road',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'Loch Lomond',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'Gully Road',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'The Chute',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'The Loop',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Sky Way West',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'The Ridge',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Sunset Glades',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Slow Poke Glades',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Slow Poke Extension',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Half Moon',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Sunset',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Upper Goat Path',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Lower Highland Fling',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'One More Time',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'One More Time Glades',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Punch Bowl',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Punch Bowl Glades',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Razorback',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Meadow',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'ABC Gully',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Fall Line',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'The Jump',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Cascade',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': "Riley's Cut",
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Wild Turkey',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Irish Whiskey',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Home Run',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Sky Way East',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Highland Fling Upper',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Lower Goat Path',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Plum Creek',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Rim Run',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Condo Line',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Highland Fling Glades',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Greer',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Sling Shot',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Early Bird',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Early Bird Glades',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Twisty Christy',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'Last Chance',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'Sunrise',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'Chipmunk',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Grasshopper',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'Rabbits Run',
      'status': 'open',
      'level': 'green'
    }
  ],
  { example: 'holimont-2026-01' }
);
