import lifts from '../lifts/index.js';

// Wayback capture of 2026-02-09 (in season): the Earth Dragon field running,
// the Sky Dragon field closed. Levels come from the Course Guide badges.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-02-09T12:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-02-09T12:00:00Z');
  }
};

lifts('togari-onsen-snow-resort', 'html', {
  'Earth Top Lift': 'open',
  'Earth Tail Lift': 'open',
  'Sky Top Lift': 'closed',
  'Sky Tail Lift': 'closed'
});
