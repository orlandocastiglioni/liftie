import lifts from '../lifts/index.js';

// 2026-08-07 live fetch of the Portes du Soleil station page. No Jan-Mar
// snapshot of this page exists in the Wayback Machine, so this is the only
// evidence with the current markup; it is genuinely live rather than a frozen
// winter board - the four lifts reading open are exactly Morzine's summer
// sightseeing lifts, with their real summer hours in div.horaires.
// The page holds 64 rows in three sector cards (Nyon, Pleney, Chamossiere);
// only the 18 under a 'Remontées mécaniques' sub-header are lifts. The single
// 'Liaisons' row on the Pleney card ('Pleney - les gets') must not appear here.
// Super Morzine's lifts are absent because the operator files them on the
// Avoriaz page, not this one.
lifts('pds-morzine', 'html', {
  'Tph de nyon': 'open',
  'Tsd les troncs': 'closed',
  'Ts des raverettes': 'closed',
  'Ts du pré favre': 'closed',
  'Ts pointe de nyon': 'open',
  'Tk du poireau 1': 'closed',
  'Tk du poireau 2': 'closed',
  "Tapis de l'aiglon": 'closed',
  'Tc du pleney': 'open',
  'Ts de nabor': 'closed',
  'Ts des fys': 'closed',
  'Ts des mouilles': 'closed',
  'Tsd belvédère': 'closed',
  'Ts de la crusaz': 'open',
  'Tk bouchet': 'closed',
  'Tk mas verjus': 'closed',
  'Tsd chamossière': 'closed',
  'Ts les têtes': 'closed'
});
