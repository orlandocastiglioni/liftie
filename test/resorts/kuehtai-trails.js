import trails from '../trails/index.js';

// Skigebietsmanager region_id=860, captured live 2026-10-27: the rows under
// the 'Slopes' caption only (Winterhiking, Crosscountry and Legend excluded).
// Grades come off each slope's icon - the region prints its path with an
// empty segment (slope_diff_set_6//701/320.png), which the parser missed
// until 2026-11-27 and so published every slope here ungraded.
trails('kuehtai', [
  {
    'name': 'KPark',
    'status': 'closed',
    'level': 'doubleBlack',
    'grade': 'black'
  },
  {
    'name': 'Kühteppich Übungshang',
    'status': 'closed',
    'level': 'blue',
    'grade': 'blue'
  },
  {
    'name': 'Rennstrecke',
    'status': 'closed'
  },
  {
    'name': 'Skiweg Loisl´s Schirm',
    'status': 'closed',
    'level': 'blue',
    'grade': 'blue'
  },
  {
    'name': 'Sonnenlift-Skiweg',
    'status': 'closed',
    'level': 'blue',
    'grade': 'blue'
  },
  {
    'name': 'Sonnenlift-Übungshang',
    'status': 'closed',
    'level': 'blue',
    'grade': 'blue'
  },
  {
    'name': 'StartBahn-Skiweg',
    'status': 'closed',
    'level': 'blue',
    'grade': 'blue'
  },
  {
    'name': 'StartBahn-Übungshang Hab',
    'status': 'closed',
    'level': 'blue',
    'grade': 'blue'
  },
  {
    'name': 'StartBahn-Übungshang SL',
    'status': 'closed',
    'level': 'blue',
    'grade': 'blue'
  },
  {
    'name': 'Wiesberg-Park',
    'status': 'closed',
    'level': 'black',
    'grade': 'red'
  },
  {
    'name': 'Wunderteppich-Übungshang',
    'status': 'closed',
    'level': 'blue',
    'grade': 'blue'
  },
  {
    'name': '1 Hochalter',
    'status': 'closed',
    'level': 'black',
    'grade': 'red'
  },
  {
    'name': '2 Hochalter',
    'status': 'closed',
    'level': 'black',
    'grade': 'red'
  },
  {
    'name': '2 Hohe Mut',
    'status': 'closed'
  },
  {
    'name': '3 Hochalter',
    'status': 'closed',
    'level': 'black',
    'grade': 'red'
  },
  {
    'name': '4 Gaiskogel',
    'status': 'closed',
    'level': 'black',
    'grade': 'red'
  },
  {
    'name': '4a Gaiskogel',
    'status': 'closed',
    'level': 'doubleBlack',
    'grade': 'black'
  },
  {
    'name': '5 Gaiskogel',
    'status': 'closed',
    'level': 'doubleBlack',
    'grade': 'black'
  },
  {
    'name': '6 Gaiskogel',
    'status': 'closed',
    'level': 'doubleBlack',
    'grade': 'black'
  },
  {
    'name': '7 Wiesberg',
    'status': 'closed',
    'level': 'doubleBlack',
    'grade': 'black'
  },
  {
    'name': '8 Wiesberg',
    'status': 'closed',
    'level': 'black',
    'grade': 'red'
  },
  {
    'name': '9 Gaiskogel',
    'status': 'closed',
    'level': 'black',
    'grade': 'red'
  },
  {
    'name': '10 Dreiseen',
    'status': 'closed',
    'level': 'black',
    'grade': 'red'
  },
  {
    'name': '11 Alpenrosen',
    'status': 'closed',
    'level': 'black',
    'grade': 'red'
  },
  {
    'name': '12 Alpenrosen',
    'status': 'closed',
    'level': 'black',
    'grade': 'red'
  },
  {
    'name': '13 Alpenrosen',
    'status': 'closed',
    'level': 'black',
    'grade': 'red'
  },
  {
    'name': '13 HoheMut',
    'status': 'closed',
    'level': 'black',
    'grade': 'red'
  },
  {
    'name': '14 HoheMut',
    'status': 'closed',
    'level': 'doubleBlack',
    'grade': 'black'
  },
  {
    'name': '15 Kaiserbahn',
    'status': 'closed',
    'level': 'black',
    'grade': 'red'
  },
  {
    'name': '16 Kaiserbahn',
    'status': 'closed',
    'level': 'black',
    'grade': 'red'
  },
  {
    'name': '17 Schwarzmoos-Skiweg',
    'status': 'closed',
    'level': 'black',
    'grade': 'red'
  },
  {
    'name': '18 Schwarzmoos',
    'status': 'closed',
    'level': 'blue',
    'grade': 'blue'
  }
]);
