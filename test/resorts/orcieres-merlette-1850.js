import lifts from '../lifts/index.js';

// fixture: orcieres.com/en/live/resort-openings/ rendered by the Pi's renderd
// with shadow=1 on 2026-11-17 (pre-season: every row shows the widget's
// "out of period" icon), trimmed to <widget-digisnow-ski-area> and its inlined
// shadow root, <style> blocks removed. 29 lifts in 7 sectors.
// The widget dates its board ("Updated on 11/12/2026 04:42 AM"); pin the clock
// to the capture day so the 45-day stale gate never trips on the fixture.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-11-17T18:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-11-17T18:00:00Z');
  }
};

lifts('orcieres-merlette-1850', 'html', {
  'TK JARDIN': 'closed',
  'TAPIS ESF': 'closed',
  'TAPIS DU CLOT': 'closed',
  'TK SNOW PARK': 'closed',
  'TELECORDE': 'closed',
  'TSD DE LA MUANDE': 'closed',
  'TS DU SOLEIL': 'closed',
  'TK DES MARCHES': 'closed',
  'TS GNOUROU': 'closed',
  'TSD DES ESTARIS': 'closed',
  'TK DU TORRENT': 'closed',
  'TMX DROUVET 1': 'closed',
  'TMX DROUVET 2': 'closed',
  'TK CHARPENET': 'closed',
  'TAPIS ETOILE': 'closed',
  'TK SCHUSSEIS 1': 'closed',
  'TK SCHUSSEIS 2': 'closed',
  'TK DE MEOLLION 1': 'closed',
  'TK DE MEOLLION 2': 'closed',
  'TMX ROCHEROUSSE': 'closed',
  'TS CROZE DES HOMMES': 'closed',
  'TK DE MANROUSE': 'closed',
  'TAPIS LUTIN': 'closed',
  'TK ROCHER': 'closed',
  "TK TRAIT D' UNION": 'closed',
  'TK BOTTE CROZE': 'closed',
  'TK BABY': 'closed',
  'LE LOURET': 'closed',
  'LA CROIX DU LOURET': 'closed'
});

// SYNTHETIC: the same capture with two legend entries added by hand ("open",
// green; "temporarily closed", orange) and row icons switched: TSD DE LA MUANDE
// open, TS DU SOLEIL temporarily closed (hold), TK DES MARCHES the legend's red
// "closed". TK JARDIN got an icon that is not in the legend and TAPIS DU CLOT a
// bare "?" (the widget's no-status placeholder): both must be dropped, not
// guessed. TAPIS ESF shows its status as text ("Open"), as the widget does for
// a status that has no icon.
lifts(
  'orcieres-merlette-1850',
  'html',
  {
    'TAPIS ESF': 'open',
    'TK SNOW PARK': 'closed',
    'TELECORDE': 'closed',
    'TSD DE LA MUANDE': 'open',
    'TS DU SOLEIL': 'hold',
    'TK DES MARCHES': 'closed',
    'TS GNOUROU': 'closed',
    'TSD DES ESTARIS': 'closed',
    'TK DU TORRENT': 'closed',
    'TMX DROUVET 1': 'closed',
    'TMX DROUVET 2': 'closed',
    'TK CHARPENET': 'closed',
    'TAPIS ETOILE': 'closed',
    'TK SCHUSSEIS 1': 'closed',
    'TK SCHUSSEIS 2': 'closed',
    'TK DE MEOLLION 1': 'closed',
    'TK DE MEOLLION 2': 'closed',
    'TMX ROCHEROUSSE': 'closed',
    'TS CROZE DES HOMMES': 'closed',
    'TK DE MANROUSE': 'closed',
    'TAPIS LUTIN': 'closed',
    'TK ROCHER': 'closed',
    "TK TRAIT D' UNION": 'closed',
    'TK BOTTE CROZE': 'closed',
    'TK BABY': 'closed',
    'LE LOURET': 'closed',
    'LA CROIX DU LOURET': 'closed'
  },
  { example: 'orcieres-merlette-1850-mixed' }
);
