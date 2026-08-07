import trails from '../trails/index.js';

// Wayback capture from 2026-01-09, midwinter: 33 of 38 pistas open, and every
// grade in the legend represented. That season /estado-pistas served the
// Baqueira sector alone.
trails('baqueira-beret', [
  {
    'name': 'Era Coma',
    'status': 'open',
    'level': 'green',
    'grade': 'verde'
  },
  {
    'name': 'Pastors',
    'status': 'open',
    'level': 'green',
    'grade': 'verde'
  },
  {
    'name': 'Rabada',
    'status': 'open',
    'level': 'green',
    'grade': 'verde'
  },
  {
    'name': 'Cara Nord',
    'status': 'open',
    'level': 'blue',
    'grade': 'azul'
  },
  {
    'name': 'Cargòlh',
    'status': 'open',
    'level': 'blue',
    'grade': 'azul'
  },
  {
    'name': 'Dera Cascada',
    'status': 'open',
    'level': 'blue',
    'grade': 'azul'
  },
  {
    'name': 'Era Cabana',
    'status': 'open',
    'level': 'blue',
    'grade': 'azul'
  },
  {
    'name': 'Horat deth Bo',
    'status': 'open',
    'level': 'blue',
    'grade': 'azul'
  },
  {
    'name': 'Lebre',
    'status': 'open',
    'level': 'blue',
    'grade': 'azul'
  },
  {
    'name': 'Pla de Baqueira 1',
    'status': 'open',
    'level': 'blue',
    'grade': 'azul'
  },
  {
    'name': 'Salida Cara Nord',
    'status': 'open',
    'level': 'blue',
    'grade': 'azul'
  },
  {
    'name': 'Ta Argulls 1',
    'status': 'open',
    'level': 'blue',
    'grade': 'azul'
  },
  {
    'name': 'Ta Orri',
    'status': 'open',
    'level': 'blue',
    'grade': 'azul'
  },
  {
    'name': 'Tortuga',
    'status': 'open',
    'level': 'blue',
    'grade': 'azul'
  },
  {
    'name': 'Vista Ruda',
    'status': 'open',
    'level': 'blue',
    'grade': 'azul'
  },
  {
    'name': '2200',
    'status': 'open',
    'level': 'black',
    'grade': 'roja'
  },
  {
    'name': 'Antigua Solei',
    'status': 'open',
    'level': 'black',
    'grade': 'roja'
  },
  {
    'name': 'Baqueira',
    'status': 'open',
    'level': 'black',
    'grade': 'roja'
  },
  {
    'name': 'Blanqueta',
    'status': 'open',
    'level': 'black',
    'grade': 'roja'
  },
  {
    'name': 'Bosque',
    'status': 'open',
    'level': 'black',
    'grade': 'roja'
  },
  {
    'name': 'Esquirós',
    'status': 'open',
    'level': 'black',
    'grade': 'roja'
  },
  {
    'name': 'Glacièr',
    'status': 'open',
    'level': 'black',
    'grade': 'roja'
  },
  {
    'name': 'Guineu',
    'status': 'open',
    'level': 'black',
    'grade': 'roja'
  },
  {
    'name': 'Lebre 2',
    'status': 'open',
    'level': 'black',
    'grade': 'roja'
  },
  {
    'name': 'Mirador',
    'status': 'open',
    'level': 'black',
    'grade': 'roja'
  },
  {
    'name': 'Os',
    'status': 'open',
    'level': 'black',
    'grade': 'roja'
  },
  {
    'name': 'Perdiu Blanca',
    'status': 'open',
    'level': 'black',
    'grade': 'roja'
  },
  {
    'name': 'Pinarrets',
    'status': 'open',
    'level': 'black',
    'grade': 'roja'
  },
  {
    'name': 'Pla de Baqueira 2',
    'status': 'open',
    'level': 'black',
    'grade': 'roja'
  },
  {
    'name': 'Stadium',
    'status': 'open',
    'level': 'black',
    'grade': 'roja'
  },
  {
    'name': 'Ta Argulls 2',
    'status': 'open',
    'level': 'black',
    'grade': 'roja'
  },
  {
    'name': 'Tamarro',
    'status': 'open',
    'level': 'black',
    'grade': 'roja'
  },
  {
    'name': 'Luis Arias',
    'status': 'open',
    'level': 'doubleBlack',
    'grade': 'negra'
  },
  {
    'name': 'Pales der Arias',
    'status': 'closed',
    'level': 'doubleBlack',
    'grade': 'negra'
  },
  {
    'name': 'Tubo Nere',
    'status': 'closed',
    'level': 'doubleBlack',
    'grade': 'negra'
  },
  {
    'name': 'Pasarells',
    'status': 'closed',
    'level': 'doubleBlack',
    'grade': 'doble-negra'
  },
  {
    'name': 'Deth Lac de Baciver',
    'status': 'closed',
    'grade': 'itinerario'
  },
  {
    'name': 'Escornacrabes',
    'status': 'closed',
    'grade': 'itinerario'
  }
]);

// The layout the site serves today: all four sectors in one document, 132
// pistas. Also covers the two ungraded kinds - 'itinerario' and the single
// 'j' (ESQUÍ FONDO) nordic loop - which publish with no level.
trails(
  'baqueira-beret',
  [
    {
      'name': 'Era Coma',
      'status': 'closed',
      'level': 'green',
      'grade': 'verde'
    },
    {
      'name': 'Pastors',
      'status': 'closed',
      'level': 'green',
      'grade': 'verde'
    },
    {
      'name': 'Rabada',
      'status': 'closed',
      'level': 'green',
      'grade': 'verde'
    },
    {
      'name': 'Cara Nord',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Cargòlh',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Dera Cascada',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Era Cabana',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Horat deth Bo',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Lebre',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Pla de Baqueira 1',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Salida Cara Nord',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Ta Argulls 1',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Ta Orri',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Tortuga',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Vista Ruda',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': '2200',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Antigua Solei',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Baqueira',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Blanqueta',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Bosque',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Esquirós',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Glacièr',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Guineu',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Lebre 2',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Mirador',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Os',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Perdiu Blanca',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Pinarrets',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Pla de Baqueira 2',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Stadium',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Ta Argulls 2',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Tamarro',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Luis Arias',
      'status': 'closed',
      'level': 'doubleBlack',
      'grade': 'negra'
    },
    {
      'name': 'Pales der Arias',
      'status': 'closed',
      'level': 'doubleBlack',
      'grade': 'negra'
    },
    {
      'name': 'Tubo Nere',
      'status': 'closed',
      'level': 'doubleBlack',
      'grade': 'negra'
    },
    {
      'name': 'Pasarells',
      'status': 'closed',
      'level': 'doubleBlack',
      'grade': 'doble-negra'
    },
    {
      'name': 'Deth Lac de Baciver',
      'status': 'closed',
      'grade': 'itinerario'
    },
    {
      'name': 'Escornacrabes',
      'status': 'closed',
      'grade': 'itinerario'
    },
    {
      'name': 'Pla de Beret',
      'status': 'closed',
      'level': 'green',
      'grade': 'verde'
    },
    {
      'name': 'Pla de Beret 2',
      'status': 'closed',
      'level': 'green',
      'grade': 'verde'
    },
    {
      'name': 'Arrianglo',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Arriu dera Serra',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Blanhiblar',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Clot der Os',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Colhet de Marimanha',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Costarjas',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Dera Reina 1',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Dera Reina 2',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Funpark',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Gargolha',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Marmòtes',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Molins',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': "Passada d'Auba",
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Poric',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': "Ròques d'en Macià",
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Sautarèth',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Ta Baqueira 1',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Ta Baqueira 2',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Ta Beret 1',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Ta Beret 2',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Ta Costarjas',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Ta Dossau',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Torn de Baciver',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Torn de Baciver 2',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Triton',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Vista Beret',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Audi Ski Kronos',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Audèth',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Boardercross',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Comalada',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Dossau',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Egua 2',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Esmeligàs',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Montgarri',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Pales deth Miei',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Parros',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Pins',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Pèira Arroja',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Shivau',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Stadium 2',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Stadium Fdez. Ochoa',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Ticolet',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Tuc deth Miei',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Egua 1',
      'status': 'closed',
      'level': 'doubleBlack',
      'grade': 'negra'
    },
    {
      'name': 'Barlongueta',
      'status': 'closed',
      'grade': 'itinerario'
    },
    {
      'name': 'Lacs deth Clòt der Os',
      'status': 'closed',
      'grade': 'itinerario'
    },
    {
      'name': 'Circuito de Fondo',
      'status': 'closed',
      'grade': 'esqui-fondo'
    },
    {
      'name': 'Debutants',
      'status': 'closed',
      'level': 'green',
      'grade': 'verde'
    },
    {
      'name': 'Argulls',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Bonaigua',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Cabirol',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Cap a Baqueira',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Costes de Ruda',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'La Llança',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Lhastres dera Mina',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Obaga',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Pleta del Duc',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Teso dera Mina',
      'status': 'closed',
      'level': 'blue',
      'grade': 'azul'
    },
    {
      'name': 'Barqueta 1',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Barqueta 2',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Bosc de Peülla 1',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Cresta de Bonaigua',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Del Riu',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'La Perdiu',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'La Peülla',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Muntanyó 1',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Muntanyó 2',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': "Pletiu d'Arnaldo",
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Solei',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Barranc der Aire',
      'status': 'closed',
      'level': 'doubleBlack',
      'grade': 'negra'
    },
    {
      'name': 'Bosc de Peülla 2',
      'status': 'closed',
      'level': 'doubleBlack',
      'grade': 'negra'
    },
    {
      'name': 'Cigalera',
      'status': 'closed',
      'level': 'doubleBlack',
      'grade': 'negra'
    },
    {
      'name': 'Gerber',
      'status': 'closed',
      'level': 'doubleBlack',
      'grade': 'negra'
    },
    {
      'name': 'La Pala Gran',
      'status': 'closed',
      'level': 'doubleBlack',
      'grade': 'negra'
    },
    {
      'name': 'Les Paletes',
      'status': 'closed',
      'level': 'doubleBlack',
      'grade': 'negra'
    },
    {
      'name': 'Manaud',
      'status': 'closed',
      'level': 'doubleBlack',
      'grade': 'negra'
    },
    {
      'name': 'Muguet',
      'status': 'closed',
      'level': 'doubleBlack',
      'grade': 'negra'
    },
    {
      'name': 'Pala del Teso',
      'status': 'closed',
      'level': 'doubleBlack',
      'grade': 'negra'
    },
    {
      'name': 'Baciver',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Estanholets',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Eth Coret',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Orqueta 1',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Orqueta 2',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Paum',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Roca Blanca',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Saumet',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Ta Baciver',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Ta Baciver 2',
      'status': 'closed',
      'level': 'black',
      'grade': 'roja'
    },
    {
      'name': 'Craba',
      'status': 'closed',
      'level': 'doubleBlack',
      'grade': 'negra'
    },
    {
      'name': 'Sanglièr',
      'status': 'closed',
      'level': 'doubleBlack',
      'grade': 'negra'
    },
    {
      'name': 'Garia',
      'status': 'closed',
      'level': 'doubleBlack',
      'grade': 'doble-negra'
    },
    {
      'name': 'Orri de Tredós',
      'status': 'closed',
      'level': 'doubleBlack',
      'grade': 'doble-negra'
    }
  ],
  { example: 'baqueira-beret-all-sectors' }
);
