import trails from '../trails/index.js';

// Wayback capture of 2026-03-05 (report "Updated March 2, 2026 at 12:40 PM").
// The report is gated by lib/tools/stale.js on that stamp, so the clock is pinned
// to the day after it.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-03-03T15:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-03-03T15:00:00Z');
  }
};

trails('mt-ashland', [
  { 'name': 'Sonnet', 'status': 'open', 'level': 'green' },
  { 'name': 'Blossom', 'status': 'closed', 'level': 'green' },
  { 'name': 'Bumblebee', 'status': 'closed', 'level': 'blue' },
  { 'name': 'Lupine', 'status': 'open', 'level': 'blue' },
  { 'name': 'Poma', 'status': 'open', 'level': 'blue' },
  { 'name': 'Aisle One', 'status': 'open', 'level': 'blue' },
  { 'name': 'Doug’s Way', 'status': 'open', 'level': 'blue' },
  { 'name': 'Upper Juliet', 'status': 'open', 'level': 'black' },
  { 'name': 'Lower Juliet', 'status': 'open', 'level': 'blue' },
  { 'name': 'Mercutio', 'status': 'open', 'level': 'black' },
  { 'name': 'Upper Romeo', 'status': 'open', 'level': 'black' },
  { 'name': 'Lower Romeo', 'status': 'open', 'level': 'blue' },
  { 'name': 'Dan’s Slot', 'status': 'open', 'level': 'blue' },
  { 'name': 'Titus', 'status': 'open', 'level': 'black' },
  { 'name': 'Windsor Chairline', 'status': 'open', 'level': 'black' },
  { 'name': 'Upper Bottom', 'status': 'open', 'level': 'black' },
  { 'name': 'Lower Bottom', 'status': 'open', 'level': 'blue' },
  { 'name': 'Betwixt', 'status': 'open', 'level': 'blue' },
  { 'name': 'Avon', 'status': 'open', 'level': 'blue' },
  { 'name': 'Lower Tempest', 'status': 'open', 'level': 'blue' },
  { 'name': 'Brutus', 'status': 'open', 'level': 'black' },
  { 'name': 'Lower Winter', 'status': 'closed', 'level': 'blue' },
  { 'name': 'Ado', 'status': 'open', 'level': 'black' },
  { 'name': 'Ariel Chairline', 'status': 'open', 'level': 'black' },
  { 'name': 'Balcony', 'status': 'open', 'level': 'black' },
  { 'name': 'Birnam Wood', 'status': 'open', 'level': 'black' },
  { 'name': 'Pistol', 'status': 'open', 'level': 'black' },
  { 'name': 'Coolwater', 'status': 'open', 'level': 'black' },
  { 'name': 'Upper Winter', 'status': 'open', 'level': 'black' },
  { 'name': 'Upper Tempest', 'status': 'open', 'level': 'black' },
  { 'name': 'Upper Dream', 'status': 'open', 'level': 'blue' },
  { 'name': 'Lower Dream', 'status': 'open', 'level': 'blue' },
  { 'name': 'West Dream', 'status': 'open', 'level': 'blue' },
  { 'name': 'Caliban', 'status': 'open', 'level': 'blue' },
  { 'name': 'Rodgers Way', 'status': 'open', 'level': 'blue' },
  { 'name': 'Wong’s', 'status': 'closed', 'level': 'black' },
  { 'name': 'Chute 1', 'status': 'closed', 'level': 'doubleBlack' },
  { 'name': 'Chute 2', 'status': 'closed', 'level': 'doubleBlack' },
  { 'name': 'Chute 3', 'status': 'closed', 'level': 'doubleBlack' },
  { 'name': 'Chute 4', 'status': 'closed', 'level': 'doubleBlack' },
  { 'name': 'Chute 5', 'status': 'closed', 'level': 'doubleBlack' },
  { 'name': '2nd Bowl', 'status': 'closed', 'level': 'black' },
  { 'name': 'Moraine Glade', 'status': 'open', 'level': 'black' }
]);
