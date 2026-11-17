import trails from '../trails/index.js';

// Captured 2026-11-17 before opening ("last update: 17.11.26 14:15"; all closed, winter
// season from 11/18 Dec). The board is gated by lib/tools/stale.js on that stamp, so
// the clock is pinned to the capture day.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-11-17T15:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-11-17T15:00:00Z');
  }
};

trails('bad-kleinkirchheim', [
  { 'name': '1 Kaiserburgabfahrt', 'status': 'closed', 'level': 'black', 'grade': 'red' },
  { 'name': '1T Talabfahrt Kaiserburg', 'status': 'closed', 'level': 'blue', 'grade': 'blue' },
  { 'name': '2 Muldenabfahrt', 'status': 'closed', 'level': 'black', 'grade': 'red' },
  { 'name': '2a Verbindung Kaiserburgabfahrt', 'status': 'closed', 'grade': 'skiroute' },
  { 'name': '3 Muldenabfahrt', 'status': 'closed', 'level': 'doubleBlack', 'grade': 'black' },
  { 'name': '4 Buckelpiste Hirschsprung', 'status': 'closed', 'level': 'doubleBlack', 'grade': 'black' },
  { 'name': '5 Hirschsprungabfahrt', 'status': 'closed', 'level': 'black', 'grade': 'red' },
  { 'name': '6 FIS K70 - Skiroute', 'status': 'closed', 'grade': 'skiroute' },
  { 'name': '7 Strohsackabfahrt', 'status': 'closed', 'level': 'black', 'grade': 'red' },
  { 'name': '8 Weltcupabfahrt', 'status': 'closed', 'level': 'doubleBlack', 'grade': 'black' },
  { 'name': '9 Sonnenhang', 'status': 'closed', 'level': 'black', 'grade': 'red' },
  { 'name': '10 Maibrunn-Weltcupabfahrt', 'status': 'closed', 'level': 'black', 'grade': 'red' },
  { 'name': '11 Maibrunnabfahrt', 'status': 'closed', 'level': 'black', 'grade': 'red' },
  { 'name': '12 Verbindung Sonnwiesen', 'status': 'closed', 'level': 'blue', 'grade': 'blue' },
  { 'name': '13 Sonnwiesen II', 'status': 'closed', 'level': 'black', 'grade': 'red' },
  { 'name': '13T Talabfahrt Sonnwiesen', 'status': 'closed', 'level': 'black', 'grade': 'red' },
  { 'name': '14 Thermenabfahrt', 'status': 'closed', 'level': 'black', 'grade': 'red' },
  { 'name': '15 Panoramaabfahrt', 'status': 'closed', 'level': 'blue', 'grade': 'blue' },
  { 'name': '16 16/a Priedröfabfahrt', 'status': 'closed', 'level': 'black', 'grade': 'red' },
  { 'name': '17 Priedröf Skiroute', 'status': 'closed', 'grade': 'skiroute' },
  { 'name': '18 Höhenabfahrt', 'status': 'closed', 'level': 'blue', 'grade': 'blue' },
  { 'name': '19 Wiesernockabfahrt', 'status': 'closed', 'level': 'black', 'grade': 'red' },
  { 'name': '20 Seenabfahrt', 'status': 'closed', 'level': 'black', 'grade': 'red' },
  { 'name': '21 Radentheiner Streif', 'status': 'closed', 'level': 'doubleBlack', 'grade': 'black' },
  { 'name': '22 Rosennockabfahrt', 'status': 'closed', 'level': 'black', 'grade': 'red' },
  { 'name': '22a Verbindung Rosennockabfahrt', 'status': 'closed', 'grade': 'skiroute' },
  { 'name': '23 Schartenabfahrt', 'status': 'closed', 'level': 'black', 'grade': 'red' },
  { 'name': '24 Spitzeckabfahrt', 'status': 'closed', 'level': 'black', 'grade': 'red' },
  { 'name': '25 Mallnockabfahrt', 'status': 'closed', 'level': 'black', 'grade': 'red' },
  { 'name': '26 Nock IN-Abfahrt', 'status': 'closed', 'level': 'black', 'grade': 'red' },
  { 'name': '27 Brunnachabfahrt', 'status': 'closed', 'level': 'black', 'grade': 'red' },
  { 'name': '28 Langalmabfahrt', 'status': 'closed', 'level': 'black', 'grade': 'red' },
  { 'name': '29 Verbindung Langalmabfahrt', 'status': 'closed', 'grade': 'skiroute' },
  { 'name': 'Übungshang Bach', 'status': 'closed', 'level': 'blue', 'grade': 'blue' },
  { 'name': 'Übungshang Star', 'status': 'closed', 'level': 'blue', 'grade': 'blue' },
  { 'name': 'Übungshang Sonnleiten', 'status': 'closed', 'level': 'blue', 'grade': 'blue' },
  { 'name': 'Übungshang St. Oswald', 'status': 'closed', 'level': 'blue', 'grade': 'blue' }
]);
