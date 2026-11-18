import trails from '../trails/index.js';

// same 2026-11-17 capture as the lift test (see there): 67 slopes. The two
// luge runs are left out; snow-park and boardercross rows are terrainPark;
// the French colour scale is shifted down one level (rouge black, noire
// doubleBlack) with the colour word kept in `grade`.
// The widget dates its board ("Updated on 11/12/2026 04:42 AM"); pin the clock
// to the capture day so the 45-day stale gate never trips on the fixture.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-11-17T18:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-11-17T18:00:00Z');
  }
};

trails('orcieres-merlette-1850', [
  {
    'name': 'JARDIN',
    'status': 'closed',
    'level': 'terrainPark',
    'grade': 'verte'
  },
  {
    'name': 'PIOUPIOU',
    'status': 'closed',
    'level': 'terrainPark',
    'grade': 'verte'
  },
  {
    'name': 'SNOW PARK XS',
    'status': 'closed',
    'level': 'terrainPark',
    'grade': 'verte'
  },
  {
    'name': 'ZONE BLEUE S MOYEN',
    'status': 'closed',
    'level': 'terrainPark',
    'grade': 'bleue'
  },
  {
    'name': 'BOARDERCROSS XS',
    'status': 'closed',
    'level': 'terrainPark',
    'grade': 'verte'
  },
  {
    'name': 'ZONE ROUGE M DIFFICILE',
    'status': 'closed',
    'level': 'terrainPark',
    'grade': 'rouge'
  },
  {
    'name': 'LES VALLONS',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'LES PROVENCAUX',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'LES LAUZIERES',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'CAMILE RICOU',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'FAVUE',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'LES MARCHES',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'JARTOUX',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'ESPACE DEBUTANT ROCHEROUSSE FONTAINON',
    'status': 'closed',
    'level': 'green',
    'grade': 'verte'
  },
  {
    'name': 'TORRENT',
    'status': 'closed',
    'level': 'green',
    'grade': 'verte'
  },
  {
    'name': 'SIRENES',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'ROCHASSON',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'BOARDERCROSS ALIZÉE BARON',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'STADE DE ROCHASSON',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'FREISSINIERES',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'CHEMIN DES LACS',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'GNOUROU',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'PRELLES',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'LE GOUROU',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'JALABRES',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'LA COMBE',
    'status': 'closed',
    'level': 'green',
    'grade': 'verte'
  },
  {
    'name': 'LA DRAILLE',
    'status': 'closed',
    'level': 'green',
    'grade': 'verte'
  },
  {
    'name': 'SCHUSSEIS 1',
    'status': 'closed',
    'level': 'green',
    'grade': 'verte'
  },
  {
    'name': 'SCHUSSEIS 2',
    'status': 'closed',
    'level': 'green',
    'grade': 'verte'
  },
  {
    'name': 'CHARPENET',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'LES BOUQUETINS',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'PY MARTY',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'LES CLOTS',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'MEOLLION',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'STADE VALENTIN GIRAUD-MOINE',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'LES GENDARMES',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'SIRAC',
    'status': 'closed',
    'level': 'doubleBlack',
    'grade': 'noire'
  },
  {
    'name': 'PIERRE NOIRE',
    'status': 'closed',
    'level': 'doubleBlack',
    'grade': 'noire'
  },
  {
    'name': 'ROCHER BLANC',
    'status': 'closed',
    'level': 'doubleBlack',
    'grade': 'noire'
  },
  {
    'name': 'LES PORTETTES',
    'status': 'closed',
    'level': 'doubleBlack',
    'grade': 'noire'
  },
  {
    'name': 'LUTINS',
    'status': 'closed',
    'level': 'green',
    'grade': 'verte'
  },
  {
    'name': 'ROCHER',
    'status': 'closed',
    'level': 'green',
    'grade': 'verte'
  },
  {
    'name': 'ROCHEBRUNE',
    'status': 'closed',
    'level': 'green',
    'grade': 'verte'
  },
  {
    'name': 'MARMOTTE',
    'status': 'closed',
    'level': 'green',
    'grade': 'verte'
  },
  {
    'name': 'LES PEPES',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'LE GOULET',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'MEZELLE',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'BOTTE CROZE',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'CHARDONNETS',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'LES BANIOLS',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'BLANCHON',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'LES CRETES',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'MANROUSE',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'BARTAVELLE',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'LES HOMMES',
    'status': 'closed',
    'level': 'doubleBlack',
    'grade': 'noire'
  },
  {
    'name': 'GALLERON',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'CHAMOIS',
    'status': 'closed',
    'level': 'doubleBlack',
    'grade': 'noire'
  },
  {
    'name': 'BECHE',
    'status': 'closed',
    'level': 'doubleBlack',
    'grade': 'noire'
  },
  {
    'name': 'BABY',
    'status': 'closed',
    'level': 'green',
    'grade': 'verte'
  },
  {
    'name': 'LA TRANQUILITE',
    'status': 'closed',
    'level': 'green',
    'grade': 'verte'
  },
  {
    'name': 'LES BOIS',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'LES 3 SOLEILS',
    'status': 'closed',
    'level': 'blue',
    'grade': 'bleue'
  },
  {
    'name': 'LES CHAMPS LONGS',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'LE CHAMOIS',
    'status': 'closed',
    'level': 'doubleBlack',
    'grade': 'noire'
  },
  {
    'name': 'LA CROIX DU LOURET',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'LA RECULA',
    'status': 'closed',
    'level': 'black',
    'grade': 'rouge'
  },
  {
    'name': 'LA TETRAS',
    'status': 'closed',
    'level': 'doubleBlack',
    'grade': 'noire'
  }
]);

// SYNTHETIC, same edits as the lift test: LES VALLONS open, SIRAC the red
// "closed" icon, PIERRE NOIRE "temporarily closed" (hold)
trails(
  'orcieres-merlette-1850',
  [
    {
      'name': 'JARDIN',
      'status': 'closed',
      'level': 'terrainPark',
      'grade': 'verte'
    },
    {
      'name': 'PIOUPIOU',
      'status': 'closed',
      'level': 'terrainPark',
      'grade': 'verte'
    },
    {
      'name': 'SNOW PARK XS',
      'status': 'closed',
      'level': 'terrainPark',
      'grade': 'verte'
    },
    {
      'name': 'ZONE BLEUE S MOYEN',
      'status': 'closed',
      'level': 'terrainPark',
      'grade': 'bleue'
    },
    {
      'name': 'BOARDERCROSS XS',
      'status': 'closed',
      'level': 'terrainPark',
      'grade': 'verte'
    },
    {
      'name': 'ZONE ROUGE M DIFFICILE',
      'status': 'closed',
      'level': 'terrainPark',
      'grade': 'rouge'
    },
    {
      'name': 'LES VALLONS',
      'status': 'open',
      'level': 'blue',
      'grade': 'bleue'
    },
    {
      'name': 'LES PROVENCAUX',
      'status': 'closed',
      'level': 'black',
      'grade': 'rouge'
    },
    {
      'name': 'LES LAUZIERES',
      'status': 'closed',
      'level': 'black',
      'grade': 'rouge'
    },
    {
      'name': 'CAMILE RICOU',
      'status': 'closed',
      'level': 'black',
      'grade': 'rouge'
    },
    {
      'name': 'FAVUE',
      'status': 'closed',
      'level': 'black',
      'grade': 'rouge'
    },
    {
      'name': 'LES MARCHES',
      'status': 'closed',
      'level': 'black',
      'grade': 'rouge'
    },
    {
      'name': 'JARTOUX',
      'status': 'closed',
      'level': 'black',
      'grade': 'rouge'
    },
    {
      'name': 'ESPACE DEBUTANT ROCHEROUSSE FONTAINON',
      'status': 'closed',
      'level': 'green',
      'grade': 'verte'
    },
    {
      'name': 'TORRENT',
      'status': 'closed',
      'level': 'green',
      'grade': 'verte'
    },
    {
      'name': 'SIRENES',
      'status': 'closed',
      'level': 'blue',
      'grade': 'bleue'
    },
    {
      'name': 'ROCHASSON',
      'status': 'closed',
      'level': 'blue',
      'grade': 'bleue'
    },
    {
      'name': 'BOARDERCROSS ALIZÉE BARON',
      'status': 'closed',
      'level': 'black',
      'grade': 'rouge'
    },
    {
      'name': 'STADE DE ROCHASSON',
      'status': 'closed',
      'level': 'black',
      'grade': 'rouge'
    },
    {
      'name': 'FREISSINIERES',
      'status': 'closed',
      'level': 'blue',
      'grade': 'bleue'
    },
    {
      'name': 'CHEMIN DES LACS',
      'status': 'closed',
      'level': 'blue',
      'grade': 'bleue'
    },
    {
      'name': 'GNOUROU',
      'status': 'closed',
      'level': 'blue',
      'grade': 'bleue'
    },
    {
      'name': 'PRELLES',
      'status': 'closed',
      'level': 'blue',
      'grade': 'bleue'
    },
    {
      'name': 'LE GOUROU',
      'status': 'closed',
      'level': 'black',
      'grade': 'rouge'
    },
    {
      'name': 'JALABRES',
      'status': 'closed',
      'level': 'black',
      'grade': 'rouge'
    },
    {
      'name': 'LA COMBE',
      'status': 'closed',
      'level': 'green',
      'grade': 'verte'
    },
    {
      'name': 'LA DRAILLE',
      'status': 'closed',
      'level': 'green',
      'grade': 'verte'
    },
    {
      'name': 'SCHUSSEIS 1',
      'status': 'closed',
      'level': 'green',
      'grade': 'verte'
    },
    {
      'name': 'SCHUSSEIS 2',
      'status': 'closed',
      'level': 'green',
      'grade': 'verte'
    },
    {
      'name': 'CHARPENET',
      'status': 'closed',
      'level': 'blue',
      'grade': 'bleue'
    },
    {
      'name': 'LES BOUQUETINS',
      'status': 'closed',
      'level': 'blue',
      'grade': 'bleue'
    },
    {
      'name': 'PY MARTY',
      'status': 'closed',
      'level': 'blue',
      'grade': 'bleue'
    },
    {
      'name': 'LES CLOTS',
      'status': 'closed',
      'level': 'black',
      'grade': 'rouge'
    },
    {
      'name': 'MEOLLION',
      'status': 'closed',
      'level': 'black',
      'grade': 'rouge'
    },
    {
      'name': 'STADE VALENTIN GIRAUD-MOINE',
      'status': 'closed',
      'level': 'black',
      'grade': 'rouge'
    },
    {
      'name': 'LES GENDARMES',
      'status': 'closed',
      'level': 'black',
      'grade': 'rouge'
    },
    {
      'name': 'SIRAC',
      'status': 'closed',
      'level': 'doubleBlack',
      'grade': 'noire'
    },
    {
      'name': 'PIERRE NOIRE',
      'status': 'hold',
      'level': 'doubleBlack',
      'grade': 'noire'
    },
    {
      'name': 'ROCHER BLANC',
      'status': 'closed',
      'level': 'doubleBlack',
      'grade': 'noire'
    },
    {
      'name': 'LES PORTETTES',
      'status': 'closed',
      'level': 'doubleBlack',
      'grade': 'noire'
    },
    {
      'name': 'LUTINS',
      'status': 'closed',
      'level': 'green',
      'grade': 'verte'
    },
    {
      'name': 'ROCHER',
      'status': 'closed',
      'level': 'green',
      'grade': 'verte'
    },
    {
      'name': 'ROCHEBRUNE',
      'status': 'closed',
      'level': 'green',
      'grade': 'verte'
    },
    {
      'name': 'MARMOTTE',
      'status': 'closed',
      'level': 'green',
      'grade': 'verte'
    },
    {
      'name': 'LES PEPES',
      'status': 'closed',
      'level': 'blue',
      'grade': 'bleue'
    },
    {
      'name': 'LE GOULET',
      'status': 'closed',
      'level': 'blue',
      'grade': 'bleue'
    },
    {
      'name': 'MEZELLE',
      'status': 'closed',
      'level': 'blue',
      'grade': 'bleue'
    },
    {
      'name': 'BOTTE CROZE',
      'status': 'closed',
      'level': 'blue',
      'grade': 'bleue'
    },
    {
      'name': 'CHARDONNETS',
      'status': 'closed',
      'level': 'blue',
      'grade': 'bleue'
    },
    {
      'name': 'LES BANIOLS',
      'status': 'closed',
      'level': 'blue',
      'grade': 'bleue'
    },
    {
      'name': 'BLANCHON',
      'status': 'closed',
      'level': 'blue',
      'grade': 'bleue'
    },
    {
      'name': 'LES CRETES',
      'status': 'closed',
      'level': 'black',
      'grade': 'rouge'
    },
    {
      'name': 'MANROUSE',
      'status': 'closed',
      'level': 'black',
      'grade': 'rouge'
    },
    {
      'name': 'BARTAVELLE',
      'status': 'closed',
      'level': 'black',
      'grade': 'rouge'
    },
    {
      'name': 'LES HOMMES',
      'status': 'closed',
      'level': 'doubleBlack',
      'grade': 'noire'
    },
    {
      'name': 'GALLERON',
      'status': 'closed',
      'level': 'black',
      'grade': 'rouge'
    },
    {
      'name': 'CHAMOIS',
      'status': 'closed',
      'level': 'doubleBlack',
      'grade': 'noire'
    },
    {
      'name': 'BECHE',
      'status': 'closed',
      'level': 'doubleBlack',
      'grade': 'noire'
    },
    {
      'name': 'BABY',
      'status': 'closed',
      'level': 'green',
      'grade': 'verte'
    },
    {
      'name': 'LA TRANQUILITE',
      'status': 'closed',
      'level': 'green',
      'grade': 'verte'
    },
    {
      'name': 'LES BOIS',
      'status': 'closed',
      'level': 'blue',
      'grade': 'bleue'
    },
    {
      'name': 'LES 3 SOLEILS',
      'status': 'closed',
      'level': 'blue',
      'grade': 'bleue'
    },
    {
      'name': 'LES CHAMPS LONGS',
      'status': 'closed',
      'level': 'black',
      'grade': 'rouge'
    },
    {
      'name': 'LE CHAMOIS',
      'status': 'closed',
      'level': 'doubleBlack',
      'grade': 'noire'
    },
    {
      'name': 'LA CROIX DU LOURET',
      'status': 'closed',
      'level': 'black',
      'grade': 'rouge'
    },
    {
      'name': 'LA RECULA',
      'status': 'closed',
      'level': 'black',
      'grade': 'rouge'
    },
    {
      'name': 'LA TETRAS',
      'status': 'closed',
      'level': 'doubleBlack',
      'grade': 'noire'
    }
  ],
  { example: 'orcieres-merlette-1850-mixed' }
);
