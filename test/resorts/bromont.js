import lifts from '../lifts/index.js';

// Wayback capture of 2026-02-06 11:09Z (06:09 in Bromont), stamped "Updated on
// 05-02-2026 13:33:45". Before opening every lift reads "In real time: Closed"
// even where the day's plan says Open, which is what the parser publishes. The
// clock is pinned to the capture day because the report is date-gated
// (lib/tools/stale.js).
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-02-06T12:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-02-06T12:00:00Z');
  }
};

lifts('bromont', 'html', {
  '#3 Télésiège quadruple - La Directe': 'closed',
  "#4 Télésiège sextuple et télécabines - L'Express du Village": 'closed',
  "#5 Télésiège quadruple - L'Express du Lac": 'closed',
  '#6 Télésiège quadruple - L’Express des Épinettes': 'closed',
  '#1A Tapis Magique': 'closed',
  '#1B Tapis Magique': 'closed',
  '#1C Tapis Magique': 'closed',
  '#2 Télésiège quadruple du Mont Soleil': 'closed',
  '#9 Télésiège quadruple des Cantons': 'closed',
  '#7 Télésiège quadruple du Midi': 'closed',
  '#8 Télésiège double de la Côte Ouest': 'closed'
});
