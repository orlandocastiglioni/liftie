import lifts from '../lifts/index.js';

// Live API answer of 2026-11-17, before the season: every
// row has open_today null, so everything is closed.

lifts('pyha-ski-resort', 'json', {
  'PyhäExpress (A)': 'closed',
  '3-person chairlift (B)': 'closed',
  'Middle lift (C)': 'closed',
  'Family T-bar (D)': 'closed',
  'Northern Slopes T-bar (E)': 'closed',
  'Polar platter (F)': 'closed',
  'Huttuland Magic Carpet (G)': 'closed',
  'PohjoisExpress (H)': 'closed',
  'Huttu platter (I)': 'closed'
});
