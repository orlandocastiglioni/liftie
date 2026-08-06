import trails from '../trails/index.js';

// Same 13 Mar 2026 page, first table (PROVOZ SJEZDOVEK): 13 downhill slopes in
// page order, eleven open. Three carry the hill's harder grade
// 'Středně těžká' (state--half state--blue-red, red-graded upper sections) -
// normalizeLevel has no 'red' tier, so this 2-tier scale maps its top grade to
// black. The rest are 'Lehká' -> blue.
trails('mala-upa', [
  { name: 'Pomezky', status: 'open', level: 'black' },
  { name: 'Spojka I.', status: 'open', level: 'blue' },
  { name: 'Spojka II.', status: 'open', level: 'blue' },
  { name: 'Dětský Skimu Park U Kostela', status: 'closed', level: 'blue' },
  { name: 'Hýbnerka', status: 'closed', level: 'blue' },
  { name: 'Dětský Skimu Park Pomezky', status: 'open', level: 'blue' },
  { name: 'Trautenberk', status: 'open', level: 'black' },
  { name: 'Kolbenka', status: 'open', level: 'blue' },
  { name: 'Moravanská spojka', status: 'open', level: 'blue' },
  { name: 'Rennerovka', status: 'open', level: 'blue' },
  { name: 'Vlčí spojka', status: 'open', level: 'blue' },
  { name: 'U Kostela 1000', status: 'open', level: 'black' },
  { name: 'U Kostela 400', status: 'open', level: 'blue' }
]);
