import lifts from '../lifts/index.js';

// Live infosnow report for area 47, 2026-11-17 17:45 (pre-season): every lift
// closed (state 3); two runs carry state 0, "keine Meldung", which reads
// scheduled - nothing filed, not a closed claim.

lifts('pizol', 'html', {
  'A Bad Ragaz-Pardiel': 'closed',
  'B Pardiel-Laufböden': 'closed',
  'C Übungslift Prodboden': 'closed',
  'D 6er-Sessel Schwamm': 'closed',
  'E Verbindungslift Pizolhütte - Laufböden': 'closed',
  'F SAC-Lift': 'closed',
  'G 4er-Sessel Gaffia - Pizolhütte': 'closed',
  'H 4er-Sessel Furt - Gaffia': 'closed',
  'I Übungslift Furt': 'closed',
  'J Gondelbahn Wangs - Maienberg - Furt': 'closed',
  'K Förderbänder Pardiel': 'closed',
  'L Riderlift Riderpark': 'closed'
});
