import lifts from '../lifts/index.js';

// 2026-08-07 live fetch of the Portes du Soleil station page. No Jan-Mar
// snapshot of this page exists in the Wayback Machine (the two archived copies
// both predate the snowflake component and render zero rows), so this is the
// only evidence with the current markup.
// The page holds 47 rows in two sector cards and, alone on the network, no
// 'Liaisons' block at all. All 15 lifts are kept: 9 from "Saint jean d'aulps"
// (Grande Terche / Roc d'Enfer) and 6 from 'La chevrerie', which is not on the
// Portes du Soleil lift pass but is published here and has no other home.
lifts('saint-jean-daulps', 'html', {
  'Le torchon': 'open',
  'Les follys': 'closed',
  'Cabri': 'closed',
  'Ecole 2': 'closed',
  'Ecole 1': 'closed',
  'Les etangs': 'closed',
  'Tc grande terche': 'open',
  'Ts de graydon': 'closed',
  'Ts des tetes': 'open',
  'Ts du chargeau': 'closed',
  "Tk d'esserailloux": 'closed',
  'Tk de la bray': 'closed',
  'Tk de la terchette': 'closed',
  'Tk du lac': 'closed',
  'Tk lanches': 'closed'
});
