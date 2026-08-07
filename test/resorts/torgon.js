import lifts from '../lifts/index.js';

// 2026-03-10 snapshot of the Portes du Soleil station page. The page holds 23
// rows in three sector cards; only the 5 under Torgon's 'Remontées mécaniques'
// sub-header are lifts. The 8 'Liaisons' rows (2 in Torgon's own card, plus the
// 'Liaisons chapelle ab' and 'Liaison portes du soleil' cards that belong to La
// Chapelle d'Abondance and Chatel) must not appear here.
lifts('torgon', 'html', {
  'Tk conche 2000': 'closed',
  'Tk djeu des têtes': 'closed',
  'Ts du tronchey': 'scheduled',
  'Fil neige mini moilles': 'scheduled',
  'Tapis plan de croix': 'scheduled'
});
