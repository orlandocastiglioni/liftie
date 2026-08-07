import trails from '../trails/index.js';

// 15 .slopes[] + 7 .routes[] + the Funpark from .pois['362'] = 23 status-bearing
// lines, in feed order. August capture: everything closed but the valley
// Winterwanderweg. blau->blue, rot->black, schwarz->doubleBlack keeps the
// Austrian three-tier scale ordered; `grade` carries the German word verbatim.
trails(
  'rauriser-hochalmbahnen',
  [
    {
      'name': '3 Gipfelbahn - Hochkar',
      'status': 'closed',
      'level': 'blue',
      'grade': 'blau'
    },
    {
      'name': '3a Gipfelbahn - Steinkar',
      'status': 'closed',
      'level': 'blue',
      'grade': 'blau'
    },
    {
      'name': '4 Waldalm - Einöd - Heimalm',
      'status': 'closed',
      'level': 'blue',
      'grade': 'blau'
    },
    {
      'name': '4 Gratlift - Einöd',
      'status': 'closed',
      'level': 'black',
      'grade': 'rot'
    },
    {
      'name': '5 Heimalm - Rauris',
      'status': 'closed',
      'level': 'doubleBlack',
      'grade': 'schwarz'
    },
    {
      'name': '6 Kreuzboden - Übungshang',
      'status': 'closed',
      'level': 'blue',
      'grade': 'blau'
    },
    {
      'name': '7 Schwarzwiese - Übungshang',
      'status': 'closed',
      'level': 'blue',
      'grade': 'blau'
    },
    {
      'name': '8 Muldenabfahrt',
      'status': 'closed',
      'level': 'blue',
      'grade': 'blau'
    },
    {
      'name': '1 Heuwand - Steilhang',
      'status': 'closed',
      'grade': 'Skiroute'
    },
    {
      'name': '2 Örg - Alm',
      'status': 'closed',
      'grade': 'Skiroute'
    },
    {
      'name': '1 Heimalm - Kreuzboden',
      'status': 'closed',
      'level': 'blue',
      'grade': 'blau'
    },
    {
      'name': '10 Kreuzboden - Rauris',
      'status': 'closed',
      'level': 'black',
      'grade': 'rot'
    },
    {
      'name': '1a Heimalm - Kreuzboden',
      'status': 'closed',
      'level': 'black',
      'grade': 'rot'
    },
    {
      'name': '2 Hochalm - Heimalm',
      'status': 'closed',
      'level': 'blue',
      'grade': 'blau'
    },
    {
      'name': '9 Waldalm - Kreuzboden',
      'status': 'closed',
      'level': 'black',
      'grade': 'rot'
    },
    {
      'name': 'Winterwanderweg Hochbühel-Heimalm',
      'status': 'closed',
      'grade': 'Winterwandern'
    },
    {
      'name': 'Rodelbahn Kreuzboden',
      'status': 'closed',
      'grade': 'Rodeln'
    },
    {
      'name': 'Winterwanderweg Seidlwinkltal',
      'status': 'closed',
      'grade': 'Winterwandern'
    },
    {
      'name': 'Winterwanderweg Rauris-Wörth',
      'status': 'open',
      'grade': 'Winterwandern'
    },
    {
      'name': 'Winterwanderweg Fröstlberg',
      'status': 'closed',
      'grade': 'Winterwandern'
    },
    {
      'name': 'Rennstrecke',
      'status': 'closed',
      'grade': 'Rennstrecke'
    },
    {
      'name': 'Familyslope',
      'status': 'closed',
      'level': 'terrainPark',
      'grade': 'Funslope'
    },
    {
      'name': 'Funpark Nuggetpark',
      'status': 'closed',
      'level': 'terrainPark',
      'grade': 'Funpark'
    }
  ],
  { ext: 'json' }
);
