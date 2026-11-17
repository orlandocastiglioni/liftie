import trails from '../trails/index.js';

// lib/resorts/maple-ski-ridge/season.js publishes nothing before resort.json's
// opening day, so the clock is pinned to a winter day after it.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2027-01-15T15:00:00Z']));
  }
  static now() {
    return RealDate.parse('2027-01-15T15:00:00Z');
  }
};

trails('maple-ski-ridge', [
  {
    name: 'Turkey Run',
    status: 'open',
    level: 'blue'
  },
  {
    name: 'Ridge Run',
    status: 'open',
    level: 'blue'
  },
  {
    name: 'Ash Dash',
    status: 'open',
    level: 'black'
  },
  {
    name: 'The Chute',
    status: 'closed',
    level: 'black'
  },
  {
    name: 'Hickory Way',
    status: 'open',
    level: 'black'
  },
  {
    name: 'Spruce Run',
    status: 'open',
    level: 'blue'
  },
  {
    name: 'Turtle Slope',
    status: 'open',
    level: 'green'
  },
  {
    name: 'Bunny Hill',
    status: 'closed',
    level: 'green'
  }
]);
