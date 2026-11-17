import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// The same live page read the day after its "Tuesday, April 7th, 2026" heading,
// to check today's layout: 8 lifts and 55 slopes, all closed.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-04-08T15:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-04-08T15:00:00Z');
  }
};

lifts('holimont', 'html', {
  'Expo': 'closed',
  'Sunset': 'closed',
  'Meadow': 'closed',
  'Cascade': 'closed',
  'Greer': 'closed',
  'Chipmunk': 'closed',
  'Grasshopper Carpet': 'closed',
  'Rabbits Run': 'closed'
});

trails('holimont', [
  {
    'name': 'Lullaby Lane',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'T-Bar',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Snow Bird',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Snow Bird Glades',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Slow Poke',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Down Spout',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Corkscrew',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'West Connection',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Exhibition',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Low Road Glade',
    'status': 'closed',
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
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'The Chute',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'The Loop',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Sky Way West',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': "Pete's Power Line",
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'The Ridge',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Sunset Glades',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Slow Poke Glades',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Slow Poke Extension',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Half Moon',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Sunset',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Wild Thing',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': "Scotty's Lane",
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Upper Goat Path',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Lower Highland Fling',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'One More Time',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'One More Time Glades',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Punch Bowl',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Punch Bowl Glades',
    'status': 'closed',
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
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Fall Line',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'The Jump',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Cascade',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': "Riley's Cut",
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Wild Turkey',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Irish Whiskey',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Home Run',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Sky Way East',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Highland Fling Upper',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Lower Goat Path',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Plum Creek',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Rim Run',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Condo Line',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Highland Fling Glades',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Greer',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Sling Shot',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Early Bird',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Early Bird Glades',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Twisty Christy',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Last Chance',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Sunrise',
    'status': 'closed',
    'level': 'black'
  }
]);
