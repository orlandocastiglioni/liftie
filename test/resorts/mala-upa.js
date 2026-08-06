import lifts from '../lifts/index.js';

// /zima/vleky-a-sjezdovky captured from Wayback on 13 Mar 2026, midwinter, so
// the per-row statuses are genuinely mixed: seven vleky running, the U Kostela
// children's tow and Hýbnerka shut. All nine rows carry the Czech
// 'V provozu' / 'Mimo provoz' titles, which coerce.js does not know - a
// closure would publish as 'scheduled' without lib/resorts/mala-upa/status.js.
// The tbody's trailing "Celkem" totals row must not appear as a tenth lift.
lifts('mala-upa', 'html', {
  'Pomezky': 'open',
  'Dětský park Pomezky - zastřešený pás': 'open',
  'Trautenberk': 'open',
  'Kolbenka': 'open',
  'Rennerovka': 'open',
  'U Kostela 1000': 'open',
  'U Kostela 400': 'open',
  'Dětský park U Kostela - dětský vlek': 'closed',
  'Hýbnerka': 'closed'
});
