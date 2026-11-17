import lifts from '../lifts/index.js';

// Live API answer of 2026-11-17, early season: the gondola, Kelo (aerials
// training only), Saarua III and Saarua Express have hours today and are open;
// so are the six slopes they serve. The Ruka Coaster row is left out.

lifts('ruka-ski-resort', 'json', {
  'Village Express (A)': 'closed',
  'Village-2-Valley Gondola (B)': 'open',
  'Talvijärvi (C)': 'closed',
  'Kelo (E)': 'open',
  'Pessari (F)': 'closed',
  'Saarua III (G)': 'open',
  'Saarua Express (H)': 'open',
  'Saarua T-bar (I)': 'closed',
  'Magic carpet 20m (D)': 'closed',
  'Magic carpet 30m (K)': 'closed',
  'Magic carpet 80m (L)': 'closed',
  'Magic carpet 50m (T)': 'closed',
  'Magic carpet 50m (U)': 'closed',
  'Magic carpet 115m (V)': 'closed',
  'Bistro Lift (J)': 'closed',
  'Vuosseli T-bar (M)': 'closed',
  'Vuosseli Express (N)': 'closed',
  'Corner Lift (O)': 'closed',
  'Middle Lift (P)': 'closed',
  'Masto Express (Q)': 'closed',
  'Masto T-bar (R)': 'closed',
  'MastonAitio (S)': 'closed'
});
