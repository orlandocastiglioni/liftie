import trails from '../trails/index.js';

// the 45 pistes of the three sector cards, in page order (Nyon 18, Pleney 19,
// Chamossiere 8), from the 2026-08-07 live fetch. All closed - it is August -
// but every grade is represented, which is what this fixture is really
// asserting: Morzine grades on the four-tier French scale, so `level` is the
// shifted reading (rouge -> black, noire -> doubleBlack) and `grade` carries
// the word the site actually prints. 'Zone débutants' appears twice because
// Nyon and Pleney each publish one; trails are a list, so both survive.
trails('pds-morzine', [
  {
    'name': 'La chouette',
    'status': 'closed',
    'level': 'green',
    'grade': 'verte'
  },
  {
    'name': 'Zone débutants',
    'status': 'closed',
    'level': 'green',
    'grade': 'verte'
  },
  {
    'name': 'Le lièvre partie haute',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'Les freux',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'Les granges',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'Les paquerages',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'Les poireaux',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'Les raverettes',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'Le lièvre partie basse',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': "L'aigle rouge",
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'La combe',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'Le chamois',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'Les lanches',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': "L'aigle noir",
    'status': 'closed',
    'level': 'doubleBlack',
    'grade': 'noire'
  },
  {
    'name': 'Boardercross des freux',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'Boardercross de nyon',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'Snow park de nyon',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'Espace luge plateau de nyon',
    'status': 'closed',
    'level': 'green',
    'grade': 'verte'
  },
  {
    'name': 'Zone débutants',
    'status': 'closed',
    'level': 'green',
    'grade': 'verte'
  },
  {
    'name': 'Mas verjus',
    'status': 'closed',
    'level': 'green',
    'grade': 'verte'
  },
  {
    'name': 'Corbeau',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'Daguet',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'Grizzli',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'Le bouchet',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'Nabor',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'Retour des nants',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'Piste b partie haute',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'Piste b partie basse',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'Daim',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'Abeille',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'Fouine',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'Hermine',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'Le stade',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'Renard',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'Olympique partie haute',
    'status': 'closed',
    'level': 'doubleBlack',
    'grade': 'noire'
  },
  {
    'name': 'Olympique partie basse',
    'status': 'closed',
    'level': 'doubleBlack',
    'grade': 'noire'
  },
  {
    'name': 'Espace luge les marmottes',
    'status': 'closed',
    'level': 'green',
    'grade': 'verte'
  },
  {
    'name': 'Le tétras',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'Les choucas',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'Bellemouille',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': "L'eterlou",
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'Les arbis',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'Les blanchots',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'Les chevrelles',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'Les creux',
    'status': 'closed',
    'level': 'doubleBlack',
    'grade': 'noire'
  }
]);
