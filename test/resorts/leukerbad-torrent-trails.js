import trails from '../trails/index.js';

// Every run the p=135 report publishes, in page order: 19 Pisten, the Funpark,
// the Schlittelpiste, 6 Winterwanderwege and the 3 Tourenski tracks under
// Diverses = 30 rows. All closed in the August capture (saison=1 keeps the
// winter roster on the board). rot->black and schwarz->doubleBlack keep the
// Swiss scale ordered, gelb is the yellow freeride grade and gets no level, and
// `grade` carries the German word - or the kind's own label - verbatim.
trails('leukerbad-torrent', [
  {
    'name': '1 Gonenstein',
    'status': 'closed',
    'level': 'black',
    'grade': 'rot'
  },
  {
    'name': '1a Rennpiste',
    'status': 'closed',
    'level': 'black',
    'grade': 'rot'
  },
  {
    'name': '2 Kumme',
    'status': 'closed',
    'level': 'blue',
    'grade': 'blau'
  },
  {
    'name': '3 Rinderhalde',
    'status': 'closed',
    'level': 'black',
    'grade': 'rot'
  },
  {
    'name': '3a Reservoir',
    'status': 'closed',
    'level': 'doubleBlack',
    'grade': 'schwarz'
  },
  {
    'name': '4 Alter Stafel FIS',
    'status': 'closed',
    'level': 'doubleBlack',
    'grade': 'schwarz'
  },
  {
    'name': '5 Schwalbennest',
    'status': 'closed',
    'level': 'blue',
    'grade': 'blau'
  },
  {
    'name': '7 Torrenthotel',
    'status': 'closed',
    'level': 'black',
    'grade': 'rot'
  },
  {
    'name': '8 Plampulet',
    'status': 'closed',
    'level': 'black',
    'grade': 'rot'
  },
  {
    'name': '9 Lingelen',
    'status': 'closed',
    'level': 'black',
    'grade': 'rot'
  },
  {
    'name': '11 Torrentalp',
    'status': 'closed',
    'level': 'black',
    'grade': 'rot'
  },
  {
    'name': '12 Planedri',
    'status': 'closed',
    'level': 'black',
    'grade': 'rot'
  },
  {
    'name': '13 Waldpiste FIS',
    'status': 'closed',
    'level': 'black',
    'grade': 'rot'
  },
  {
    'name': '14 Flaschenhalde',
    'status': 'closed',
    'level': 'doubleBlack',
    'grade': 'schwarz'
  },
  {
    'name': '15 Talabfahrt nach Leukerbad',
    'status': 'closed',
    'level': 'doubleBlack',
    'grade': 'schwarz'
  },
  {
    'name': '16 Talstation',
    'status': 'closed',
    'level': 'doubleBlack',
    'grade': 'schwarz'
  },
  {
    'name': '20 Freeride Direttissima',
    'status': 'closed',
    'grade': 'gelb'
  },
  {
    'name': '21 Freeride Tschantamaria',
    'status': 'closed',
    'grade': 'gelb'
  },
  {
    'name': '22 Freeride Torrentstafel',
    'status': 'closed',
    'grade': 'gelb'
  },
  {
    'name': '10 Funpark / Tempomessung',
    'status': 'closed',
    'level': 'terrainPark',
    'grade': 'Snowpark'
  },
  {
    'name': 'Velogemel-Trail Torrent',
    'status': 'closed',
    'grade': 'Schlittelbahn'
  },
  {
    'name': '31 Sennhütte - Schnydi',
    'status': 'closed',
    'grade': 'Wanderweg'
  },
  {
    'name': '32 Schwalbennest - Rinderhütte',
    'status': 'closed',
    'grade': 'Wanderweg'
  },
  {
    'name': '30 Panoramaweg',
    'status': 'closed',
    'grade': 'Wanderweg'
  },
  {
    'name': '30a Rinderhütte - Bankjini',
    'status': 'closed',
    'grade': 'Wanderweg'
  },
  {
    'name': '30b Bankjini - Torrentalp',
    'status': 'closed',
    'grade': 'Wanderweg'
  },
  {
    'name': '33 Flaschen - Torrentalp',
    'status': 'closed',
    'grade': 'Schneeschuh-Wandern'
  },
  {
    'name': '1 MOVEMENT Tracks Torrentalp',
    'status': 'closed',
    'grade': 'Tourenski'
  },
  {
    'name': '2 MOVEMENT Tracks Rinderhütte',
    'status': 'closed',
    'grade': 'Tourenski'
  },
  {
    'name': '3 MOVEMENT Tracks Schnydi',
    'status': 'closed',
    'grade': 'Tourenski'
  }
]);
