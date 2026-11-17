import lifts from '../lifts/index.js';

// Wayback capture of winter.json, 2026-02-24 20:00 (Resort.Date): the cable car
// and all T-bars running (StatusID 1), the GLOBI cabin closed (16), runs open
// (8) except Carving and Stäghorn (15). The export is date-gated, so the clock
// is pinned to the next day.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-02-25T12:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-02-25T12:00:00Z');
  }
};

lifts('engstligenalp', 'json', {
  'E01 Unter dem Birg - Engstligenalp': 'open',
  'E00 GLOBI-Bahn Unter dem Birg - Engstligenalp': 'closed',
  'E02 Dossen I': 'open',
  'E03 Dossen II': 'open',
  'E04 Bockmatti': 'open',
  'E05 Zubringer': 'open',
  'E06 Ponylift': 'open',
  'E07 Kleinskilift': 'open'
});
