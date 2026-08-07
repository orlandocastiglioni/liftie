import lifts from '../lifts/index.js';

// 2026-02-07 snapshot of the Portes du Soleil station page - midwinter, so
// every status the network prints is represented: Ouverte, Fermée and the
// 'en préparation' that dominates the board at that time of year and reads as
// scheduled. The page holds 52 rows in three sector cards; only the 19 under
// 'Remontees morgins' > 'Remontées mécaniques' are lifts. The 6 'Liaisons
// morgins' rows - inter-station link routes, one of which ('Chatel-morgins')
// is printed on Chatel's page too - must not appear here.
lifts('morgins', 'html', {
  '40 tc morgins': 'open',
  '52 fil neige': 'closed',
  "31 pointe de l'au": 'scheduled',
  '36 aiguille des champeys': 'open',
  '41 chaux': 'scheduled',
  '46 bochasses': 'scheduled',
  '48 corbeau': 'scheduled',
  '20 gueilly': 'scheduled',
  '30 champey': 'open',
  '33 derriere-pertuis': 'scheduled',
  '34 sepaya i': 'open',
  '35 sepaya ii': 'scheduled',
  '42 gourtet': 'scheduled',
  '43 la truche': 'scheduled',
  '49 ecottis': 'scheduled',
  '51 geant': 'scheduled',
  '61 culet': 'scheduled',
  '62 snowly i': 'scheduled',
  '64 tapis mini-gourtet': 'closed'
});
