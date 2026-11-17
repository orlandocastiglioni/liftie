import lifts from '../lifts/index.js';

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

lifts('bad-kleinkirchheim', 'html', {
  '1 Kaiserburgbahn I': 'closed',
  '2 Kaiserburgbahn II': 'closed',
  '3 Muldenlift': 'closed',
  '5 Strohsackbahn': 'closed',
  '6 Sonnenhanglift': 'closed',
  '7 Maibrunnbahn': 'closed',
  '8 Trattniglift': 'closed',
  '9 Bachlift': 'closed',
  '10 Bach-Förderbänder': 'closed',
  '11 Ottinger-Förderband': 'closed',
  '12 Sonnwiesenbahn I': 'closed',
  '13 Sonnwiesenbahn II': 'closed',
  '14 Priedröflift': 'closed',
  '15 Panoramalift': 'closed',
  '17 Nockalmbahn': 'closed',
  '18 Höhenlift': 'closed',
  '19 Wiesernockbahn': 'closed',
  '20 Schartenbahn': 'closed',
  '21 Spitzeckbahn': 'closed',
  '22 BPB Brunnach': 'closed',
  '23 Sonnleitenlift': 'closed',
  '24 Skischullift St. Oswald': 'closed',
  '25 Millstätter See Bahn': 'closed'
});
