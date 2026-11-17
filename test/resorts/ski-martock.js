import lifts from '../lifts/index.js';

// SYNTHETIC in-season variant of the real operations.php answer of 2026-11-17
// (fetched once with the owner's approval): `updated` moved to 2026-01-17 and a
// few states set by hand - the quad and the carpet open, Buttermilk, Sundance
// and Expressway open, Strawberry Jinx "partial" (open), Upper Glades on hold.
// The answer is date-gated, so the clock is pinned to the next day.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-01-18T12:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-01-18T12:00:00Z');
  }
};

lifts(
  'ski-martock',
  'json',
  {
    'Quad Chair': 'open',
    'T-Bar': 'closed',
    'T-Bar ½ Way Unload': 'closed',
    'Magic Carpet': 'open'
  },
  { example: 'ski-martock-season' }
);
