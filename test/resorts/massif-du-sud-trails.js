import trails from '../trails/index.js';

// Winter Wayback snapshot (2026-01-13): 23/41 slopes open, matching the site's
// own "Pistes ouvertes : 23/41". Rows are every run across all five sectors in
// page order. status comes from the JSON boolean 'open' (String(open) coerced);
// difficulty easy/difficult/very_difficult/extreme -> green/black/black/doubleBlack.
trails('massif-du-sud', [
  { name: 'La Familiale (1)', status: 'open', level: 'green' },
  { name: 'La Villageoise (9)', status: 'open', level: 'black' },
  { name: 'La Volte-face (9A)', status: 'open', level: 'black' },
  { name: 'La mistrale (10)', status: 'open', level: 'black' },
  { name: 'La nouvelle (10A)', status: 'open', level: 'black' },
  { name: 'Freeride Parc (11)', status: 'open', level: 'black' },
  { name: 'La transit (11A)', status: 'open', level: 'black' },
  { name: 'La passe (11B)', status: 'open', level: 'black' },
  { name: "L'écolière (12)", status: 'open', level: 'green' },
  { name: 'La junior (12A)', status: 'open', level: 'green' },
  { name: 'La planche (12B)', status: 'open', level: 'black' },
  { name: 'La grande allée (13)', status: 'open', level: 'black' },
  { name: 'Le défi (13A)', status: 'open', level: 'black' },
  { name: "L'olympique (14)", status: 'open', level: 'black' },
  { name: 'La buissonnière (14A)', status: 'open', level: 'black' },
  { name: 'La panoramique (15)', status: 'open', level: 'black' },
  { name: 'La promenade (16)', status: 'open', level: 'black' },
  { name: 'La cloche (16A)', status: 'closed', level: 'black' },
  { name: 'Le boisé (16B)', status: 'open', level: 'black' },
  { name: 'La Réserve (8A)', status: 'closed', level: 'black' },
  { name: 'La bipolaire (9B)', status: 'open', level: 'black' },
  { name: 'La timide (9C)', status: 'closed', level: 'black' },
  { name: 'La polaire (10B)', status: 'closed', level: 'black' },
  { name: 'La Super Naturel (11C)', status: 'closed', level: 'doubleBlack' },
  { name: 'Forêt du Sasquatch (12C)', status: 'closed', level: 'black' },
  { name: 'La criminelle (13B)', status: 'closed', level: 'black' },
  { name: 'La légale (14B)', status: 'closed', level: 'black' },
  { name: 'Pow Pow (16C)', status: 'open', level: 'black' },
  { name: 'La skinusite (17)', status: 'closed', level: 'black' },
  { name: 'Loin-Loin (2)', status: 'closed', level: 'doubleBlack' },
  { name: 'Cachetier (3)', status: 'closed', level: 'doubleBlack' },
  { name: 'La merveille (4)', status: 'closed', level: 'doubleBlack' },
  { name: 'La surprenante (5)', status: 'closed', level: 'doubleBlack' },
  { name: 'La délinquante (6)', status: 'closed', level: 'doubleBlack' },
  { name: 'La septième ciel (7)', status: 'closed', level: 'doubleBlack' },
  { name: 'La cathédrale (8)', status: 'closed', level: 'doubleBlack' },
  { name: "Sentier d'ascension A", status: 'open', level: 'green' },
  { name: "Sentier d'ascension B", status: 'open', level: 'black' },
  { name: "Sentier d'ascension C", status: 'open', level: 'black' },
  { name: "Sentier d'ascension D", status: 'closed', level: 'black' },
  { name: 'La 5e dimension', status: 'closed', level: 'black' }
]);
