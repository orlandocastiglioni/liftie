import trails from '../trails/index.js';

// Captured 2026-11-17: still closing day's report ("Date / Time Mar 29, 2026 - 6:00 AM";
// the page's own counts say 4 lifts and 21 trails open). The report is gated by
// lib/tools/stale.js on that stamp, so the clock is pinned to the day after it.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-03-30T15:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-03-30T15:00:00Z');
  }
};

trails('whitecap-mountains-resort', [
  { 'name': 'LECH', 'status': 'closed', 'level': 'green' },
  { 'name': 'SUD BOWL', 'status': 'open', 'level': 'green' },
  { 'name': 'LAXX', 'status': 'open', 'level': 'green' },
  { 'name': 'ACH', 'status': 'open', 'level': 'green' },
  { 'name': 'ARLBERG', 'status': 'open', 'level': 'green' },
  { 'name': 'COURCHEVEL', 'status': 'closed', 'level': 'green' },
  { 'name': 'JENNER PASS', 'status': 'open', 'level': 'green' },
  { 'name': 'NAVIGATOR', 'status': 'closed', 'level': 'green' },
  { 'name': 'DAVOS', 'status': 'open', 'level': 'green' },
  { 'name': 'SUNDANCE', 'status': 'closed', 'level': 'green' },
  { 'name': 'GSTAAD', 'status': 'open', 'level': 'green' },
  { 'name': 'HINTERTUX', 'status': 'open', 'level': 'green' },
  { 'name': 'COURCHEVEL SWITCHBACK', 'status': 'closed', 'level': 'green' },
  { 'name': 'NAVIGATOR CROSSOVER', 'status': 'closed', 'level': 'green' },
  { 'name': 'SOUTH POLE SLIDE', 'status': 'closed', 'level': 'green' },
  { 'name': 'ST. MORITZ', 'status': 'open', 'level': 'blue' },
  { 'name': 'CHARMONIZ', 'status': 'closed', 'level': 'blue' },
  { 'name': 'GRINDENWALD', 'status': 'closed', 'level': 'blue' },
  { 'name': 'ZURS', 'status': 'closed', 'level': 'blue' },
  { 'name': 'EDELWEISS', 'status': 'open', 'level': 'blue' },
  { 'name': 'TYROL', 'status': 'open', 'level': 'blue' },
  { 'name': 'INNSBRUCK', 'status': 'closed', 'level': 'blue' },
  { 'name': 'GREY EAGLE', 'status': 'closed', 'level': 'blue' },
  { 'name': 'ALPINE JUNCTION', 'status': 'closed', 'level': 'blue' },
  { 'name': 'BAD GASTEIN', 'status': 'open', 'level': 'blue' },
  { 'name': 'CORTINA', 'status': 'open', 'level': 'blue' },
  { 'name': 'NASTAR', 'status': 'open', 'level': 'blue' },
  { 'name': 'SCHATZYS', 'status': 'open', 'level': 'blue' },
  { 'name': 'GRENOBLE', 'status': 'closed', 'level': 'black' },
  { 'name': 'KILIMANJARO', 'status': 'closed', 'level': 'black' },
  { 'name': 'ZERMATT', 'status': 'open', 'level': 'black' },
  { 'name': 'MATTERHORN', 'status': 'closed', 'level': 'black' },
  { 'name': "MARY'S MISTAKE", 'status': 'open', 'level': 'black' },
  { 'name': 'LA SIALA', 'status': 'closed', 'level': 'black' },
  { 'name': 'VAL DISERE', 'status': 'closed', 'level': 'black' },
  { 'name': 'KITZBUEHL', 'status': 'open', 'level': 'black' },
  { 'name': 'GARMISCH', 'status': 'open', 'level': 'black' },
  { 'name': 'SCHWARTZWALD', 'status': 'open', 'level': 'black' },
  { 'name': 'BALZANO', 'status': 'closed', 'level': 'black' },
  { 'name': 'SNOWBOARD', 'status': 'open', 'level': 'black' },
  { 'name': 'DRAGON', 'status': 'closed', 'level': 'doubleBlack' },
  { 'name': 'STAR DUST', 'status': 'closed', 'level': 'doubleBlack' },
  { 'name': 'ST. GEORGE', 'status': 'closed', 'level': 'doubleBlack' },
  { 'name': 'DAGGER', 'status': 'closed', 'level': 'doubleBlack' },
  { 'name': 'ORE SHOOT', 'status': 'closed', 'level': 'doubleBlack' }
]);
