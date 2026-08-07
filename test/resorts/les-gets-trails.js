import trails from '../trails/index.js';

// Same 2026-01-19 snapshot: 40 pistes in card order (Chavannes 12,
// Ranfoilly - nauchets 8, Rosta - perrières 9, Mont-chéry 11), all still 'en
// préparation'. Les Gets grades on the four-tier French scale, so rouge lands
// on black and noire on doubleBlack while `grade` keeps the resort's own word;
// the cross-country loops the operator files under 'Pistes' come through
// green, as published.
trails('les-gets', [
  { name: 'Piste 64', status: 'scheduled', level: 'green', grade: 'verte' },
  { name: 'Zone des mappys', status: 'scheduled', level: 'green', grade: 'verte' },
  { name: 'Bleuet', status: 'scheduled', level: 'blue', grade: 'bleue' },
  { name: 'Bruyere', status: 'scheduled', level: 'blue', grade: 'bleue' },
  { name: 'Chardon bleu', status: 'scheduled', level: 'blue', grade: 'bleue' },
  { name: 'Crocus', status: 'scheduled', level: 'blue', grade: 'bleue' },
  { name: 'Fougere', status: 'scheduled', level: 'blue', grade: 'bleue' },
  { name: 'Gentiane', status: 'scheduled', level: 'blue', grade: 'bleue' },
  { name: 'Vieux chene', status: 'scheduled', level: 'blue', grade: 'bleue' },
  { name: 'Perce-neige', status: 'scheduled', level: 'blue', grade: 'bleue' },
  { name: 'Orchis', status: 'scheduled', level: 'black', grade: 'rouge' },
  { name: 'Ski de fond chavannes', status: 'scheduled', level: 'green', grade: 'verte' },
  { name: 'Cyclamen', status: 'scheduled', level: 'blue', grade: 'bleue' },
  { name: 'Tulipe', status: 'scheduled', level: 'blue', grade: 'bleue' },
  { name: 'Violette', status: 'scheduled', level: 'blue', grade: 'bleue' },
  { name: 'Ambresalles', status: 'scheduled', level: 'black', grade: 'rouge' },
  { name: 'Arnica', status: 'scheduled', level: 'black', grade: 'rouge' },
  { name: 'Fenerets', status: 'scheduled', level: 'black', grade: 'rouge' },
  { name: 'Rhodos', status: 'scheduled', level: 'black', grade: 'rouge' },
  { name: 'Sautenailles', status: 'scheduled', level: 'black', grade: 'rouge' },
  { name: 'Campanule', status: 'scheduled', level: 'blue', grade: 'bleue' },
  { name: 'Les trembles', status: 'scheduled', level: 'blue', grade: 'bleue' },
  { name: 'Reine des pres', status: 'scheduled', level: 'blue', grade: 'bleue' },
  { name: 'Renardiere', status: 'scheduled', level: 'blue', grade: 'bleue' },
  { name: 'Vorosses', status: 'scheduled', level: 'blue', grade: 'bleue' },
  { name: 'Eglantine', status: 'scheduled', level: 'black', grade: 'rouge' },
  { name: 'Melezes', status: 'scheduled', level: 'black', grade: 'rouge' },
  { name: 'Myrtilles', status: 'scheduled', level: 'doubleBlack', grade: 'noire' },
  { name: 'Yeti', status: 'scheduled', level: 'doubleBlack', grade: 'noire' },
  { name: 'Ourson', status: 'scheduled', level: 'blue', grade: 'bleue' },
  { name: 'Chamois', status: 'scheduled', level: 'black', grade: 'rouge' },
  { name: 'Epervier', status: 'scheduled', level: 'black', grade: 'rouge' },
  { name: 'Lievre', status: 'scheduled', level: 'black', grade: 'rouge' },
  { name: 'Marmotte', status: 'scheduled', level: 'black', grade: 'rouge' },
  { name: 'Cabri', status: 'closed', level: 'black', grade: 'rouge' },
  { name: 'Bouquetin', status: 'scheduled', level: 'doubleBlack', grade: 'noire' },
  { name: 'Chevreuil', status: 'scheduled', level: 'doubleBlack', grade: 'noire' },
  { name: 'Gazelle', status: 'closed', level: 'doubleBlack', grade: 'noire' },
  { name: 'Mouflon', status: 'scheduled', level: 'doubleBlack', grade: 'noire' },
  { name: 'Ski de fond mont-chery', status: 'scheduled', level: 'green', grade: 'verte' }
]);
