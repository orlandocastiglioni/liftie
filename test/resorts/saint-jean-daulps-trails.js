import trails from '../trails/index.js';

// the 32 pistes of the two sector cards, in page order (La chevrerie 13,
// "Saint jean d'aulps" 19), from the 2026-08-07 live fetch. All closed - it is
// August - but every grade is represented, which is what this fixture is really
// asserting: the four-tier French scale, so `level` is the shifted reading
// (rouge -> black, noire -> doubleBlack) and `grade` carries the word the site
// actually prints.
trails('saint-jean-daulps', [
  {
    'name': 'Les favieres verte',
    'status': 'closed',
    'level': 'green',
    'grade': 'verte'
  },
  {
    'name': 'Ecole 1',
    'status': 'closed',
    'level': 'green',
    'grade': 'verte'
  },
  {
    'name': 'Les etangs',
    'status': 'closed',
    'level': 'green',
    'grade': 'verte'
  },
  {
    'name': 'Les sapins',
    'status': 'closed',
    'level': 'green',
    'grade': 'verte'
  },
  {
    'name': 'Les sapins bis',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'Alpages',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'Les favieres bleue',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'Ecole 2',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'Le chal',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'Savine',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'Le mur',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'Grand-souvroz',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'Les vous',
    'status': 'closed',
    'level': 'doubleBlack',
    'grade': 'noire'
  },
  {
    'name': 'La bray',
    'status': 'closed',
    'level': 'green',
    'grade': 'verte'
  },
  {
    'name': 'Les lanches verte',
    'status': 'closed',
    'level': 'green',
    'grade': 'verte'
  },
  {
    'name': 'Terchette',
    'status': 'closed',
    'level': 'green',
    'grade': 'verte'
  },
  {
    'name': 'Graydon bleue',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'Les lanches bleue',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'Les tetes bleue',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'Chanterelles',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'Graydon bis',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'Follys',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'Chargeau',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'Graydon rouge',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'La grande terche',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'Le lac',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'Les lanches rouge',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'Les tetes rouge',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'Esserailloux',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'Eterlou',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'La terche',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': "L'aigle",
    'status': 'closed',
    'level': 'doubleBlack',
    'grade': 'noire'
  }
]);
