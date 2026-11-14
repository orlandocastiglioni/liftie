import lifts from '../lifts/index.js';

// Les Sommets (lib/tools/sommets.js): the 2026-11-13 page trimmed to its condition blocks.
// The first trail is open by day and the first lift by night only, hand-flipped; both count as open.
lifts('sommet-saint-sauveur', 'html', {
  "Flèche d'Argent": "open",
  "Sommet Express": "closed",
  "L'Étoile": "closed",
  "Petit Viking": "closed",
  "Côte 71": "closed",
  "Le Piedmont": "closed",
  "Avila Express": "closed",
  "Babalou": "closed",
  "La Grosse Corde": "closed"
}, { example: 'sommets' });
