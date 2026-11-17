import trails from '../trails/index.js';

// Captured 2026-11-17 from /conditions/. The board on it is still last season's last
// report, so it serves as a structural fixture; season.js only publishes inside the
// season window, so the clock is pinned to a January day inside it.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2027-01-10T15:00:00Z']));
  }
  static now() {
    return RealDate.parse('2027-01-10T15:00:00Z');
  }
};

trails('spring-mountain-adventures', [
  { 'name': 'Alpine', 'status': 'open' },
  { 'name': 'Glacier', 'status': 'closed' },
  { 'name': 'Fawn', 'status': 'open' },
  { 'name': 'Plummet', 'status': 'closed' },
  { 'name': 'Buck', 'status': 'closed' },
  { 'name': 'We Ride For Chris Terrain Park', 'status': 'open', 'level': 'terrainPark' },
  { 'name': 'Hawk', 'status': 'closed' },
  { 'name': 'Drifter', 'status': 'closed' }
]);
