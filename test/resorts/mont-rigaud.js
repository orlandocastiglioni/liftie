import lifts from '../lifts/index.js';

// Fixture: live montrigaud.com/conditions/ (2026-11-17), trimmed to its
// Elementor loop items - the four lifts (activite-remontee) plus one piste
// (activite-piste) that must not be counted. Pre-season, every column Fermée.
lifts('mont-rigaud', 'html', {
  'Poma Express': 'closed',
  Doppelmayr: 'closed',
  'Tapis Emmegi': 'closed',
  'Tapis Sunkid': 'closed'
});

// Same capture with two statuses edited to Ouverte: Poma Express only in the
// night (Soir) column, Tapis Sunkid only in the day (Jour) column. A lift
// running under the lights is running.
lifts(
  'mont-rigaud',
  'html',
  {
    'Poma Express': 'open',
    Doppelmayr: 'closed',
    'Tapis Emmegi': 'closed',
    'Tapis Sunkid': 'open'
  },
  { example: 'mont-rigaud-open' }
);
