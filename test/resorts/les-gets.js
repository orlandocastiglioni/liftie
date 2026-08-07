import lifts from '../lifts/index.js';

// 2026-01-19 snapshot of Les Gets' page on the Portes du Soleil network site,
// caught at 07:20 local before the lifts spin: 25 lifts across four cards
// (Chavannes 13, Ranfoilly - nauchets 2, Rosta - perrières 4, Mont-chéry 6),
// 23 of them 'en préparation' - the network's most common status, and the one
// coerce has to reach 'scheduled' rather than falling through as unknown - and
// 2 'Fermée'. The fifth card, 'Liaisons', holds only inter-station link routes
// and is dropped by its sub-header.
lifts('les-gets', 'html', {
  'Tc chavannes': 'scheduled',
  'Fil-neige ebauds': 'scheduled',
  'Telecorde mouille au ble': 'scheduled',
  'Tsd chavannes express': 'scheduled',
  'Ts croix': 'scheduled',
  'Ts folliets du golf': 'scheduled',
  'Tk boule de gomme': 'scheduled',
  'Tk grand cry': 'scheduled',
  'Tk mouille au roi': 'scheduled',
  'Tk tete des crets': 'scheduled',
  'Tk vieux chene': 'scheduled',
  'Tapis chavannes': 'scheduled',
  'Tapis platais': 'scheduled',
  'Tsd nauchets express': 'scheduled',
  'Tsd ranfoilly express': 'scheduled',
  "Tsd grains d'or express": 'scheduled',
  'Tsd perrieres express': 'scheduled',
  'Tsd rosta express': 'scheduled',
  'Tk turche': 'scheduled',
  'Tc chery': 'scheduled',
  'Ts chery nord': 'scheduled',
  'Ts grande ourse': 'scheduled',
  'Ts planeys': 'scheduled',
  'Ts pointe': 'scheduled',
  'Tk super chery': 'scheduled'
});
