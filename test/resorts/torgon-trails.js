import trails from '../trails/index.js';

// the 8 pistes of Torgon's own sector card, in page order. rouge normalises
// down to black and noire would go to doubleBlack, so `grade` carries the
// French word the site actually prints; 'Freeride tronchey' is published with
// no data-color and no grade span at all, so it gets neither field.
trails('torgon', [
  {
    name: 'Espace débutant',
    status: 'closed',
    level: 'green',
    grade: 'verte'
  },
  {
    name: 'Recon',
    status: 'closed',
    level: 'blue',
    grade: 'bleue'
  },
  {
    name: 'Col de croix',
    status: 'closed',
    level: 'black',
    grade: 'rouge'
  },
  {
    name: 'Lac léman',
    status: 'closed',
    level: 'black',
    grade: 'rouge'
  },
  {
    name: 'Stade de slalom',
    status: 'closed',
    level: 'black',
    grade: 'rouge'
  },
  {
    name: 'Djeu des têtes',
    status: 'closed',
    level: 'black',
    grade: 'rouge'
  },
  {
    name: 'Conche',
    status: 'closed',
    level: 'black',
    grade: 'rouge'
  },
  {
    name: 'Freeride tronchey',
    status: 'closed'
  }
]);
