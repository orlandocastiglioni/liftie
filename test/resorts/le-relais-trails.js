import trails from '../trails/index.js';

// SYNTHETIC in part: the live page of 2026-11-17 (pre-season, every cell .close)
// with five cells hand-flipped to .open - lift D (day), lift F (day and night),
// trail 2 (day) and trail 2A (night) - because no in-season capture exists. The
// .open class name is the theme's own (global-compiled.css: .element-status.open).

trails('le-relais', [
  { name: '1 La familiale', status: 'closed', level: 'green', grade: 'easy' },
  { name: '1A L’Alpi', status: 'closed', level: 'blue', grade: 'hard' },
  { name: '1B Le petit sentier', status: 'closed', level: 'green', grade: 'easy' },
  { name: '1C La débutante (Parc d’apprentissage)', status: 'closed', level: 'green', grade: 'easy' },
  { name: '1D Le sous-bois', status: 'closed', level: 'blue', grade: 'hard' },
  { name: '1E Le sous-bois des braves', status: 'closed', level: 'black', grade: 'very-hard' },
  { name: '1F Le petit détour', status: 'closed', level: 'blue', grade: 'hard' },
  { name: '2 Le premier défi', status: 'open', level: 'blue', grade: 'hard' },
  { name: '2A La balade', status: 'open', level: 'black', grade: 'very-hard' },
  { name: '2B La Laurentide', status: 'closed', level: 'blue', grade: 'hard' },
  { name: '3 Laurent-Bernier', status: 'closed', level: 'black', grade: 'very-hard' },
  { name: '3A La banane', status: 'closed', level: 'black', grade: 'very-hard' },
  { name: '3B La qui-sait-tout', status: 'closed', level: 'black', grade: 'very-hard' },
  { name: '3C L’expert sous-bois', status: 'closed', level: 'doubleBlack', grade: 'extreme' },
  { name: '4 La pente école', status: 'closed', level: 'green', grade: 'easy' },
  {
    name: '5 Conrad-Delisle (Parc débutant-Intermédiaire)',
    status: 'closed',
    level: 'terrainPark',
    grade: 'very-hard'
  },
  { name: '6 Le Mirador', status: 'closed', level: 'black', grade: 'very-hard' },
  { name: '7 Gaby-Pleau', status: 'closed', level: 'blue', grade: 'hard' },
  { name: '8 Lac-Beauport', status: 'closed', level: 'blue', grade: 'hard' },
  { name: '8A Docteur Pouliot (Parc de la 8)', status: 'closed', level: 'terrainPark', grade: 'hard' },
  { name: '8B La Promenade', status: 'closed', level: 'blue', grade: 'hard' },
  { name: '8C Audrey-Robichaud', status: 'closed', level: 'black', grade: 'very-hard' },
  { name: '9 Guy-A.-Paquet', status: 'closed', level: 'blue', grade: 'hard' },
  { name: '10 La bohème', status: 'closed', level: 'blue', grade: 'hard' },
  { name: '10A L’étonnante', status: 'closed', level: 'black', grade: 'very-hard' },
  { name: '10B Le grand sous-bois', status: 'closed', level: 'doubleBlack', grade: 'extreme' },
  { name: '11 Jean-Claude-Tremblay', status: 'closed', level: 'blue', grade: 'hard' },
  { name: '12 Suzanne-Proteau-Blais', status: 'closed', level: 'black', grade: 'very-hard' },
  { name: '13 La fougerole', status: 'closed', level: 'doubleBlack', grade: 'extreme' },
  { name: '14 La vertigineuse', status: 'closed', level: 'doubleBlack', grade: 'extreme' },
  { name: '15 Dorothée', status: 'closed', level: 'green', grade: 'easy' },
  { name: '15A La pente douce', status: 'closed', level: 'green', grade: 'easy' },
  { name: '15B Le hameau (Parc des Papoutes)', status: 'closed', level: 'terrainPark', grade: 'easy' },
  { name: '15C Le petit sous-bois', status: 'closed', level: 'blue', grade: 'hard' },
  { name: '15D La ligne secrète', status: 'closed', level: 'blue', grade: 'hard' }
]);
