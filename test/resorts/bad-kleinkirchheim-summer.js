import lifts from '../lifts/index.js';

// Wayback capture of 2026-08-07 ("last update: 07.08.26 18:30"): the summer cable cars
// running, so the check icon is exercised. Clock pinned to the day after the stamp.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-08-08T12:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-08-08T12:00:00Z');
  }
};

lifts(
  'bad-kleinkirchheim',
  'html',
  {
    '1 Kaiserburgbahn I': 'open',
    '2 Kaiserburgbahn II': 'open',
    '3 Muldenlift': 'closed',
    '4 Hirschsprunglift': 'closed',
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
    '22 BPB Brunnach': 'open',
    '23 Sonnleitenlift': 'closed',
    '24 Skischullift St. Oswald': 'closed',
    '25 Millstätter See Bahn': 'closed'
  },
  { example: 'bad-kleinkirchheim-summer' }
);
