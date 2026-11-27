import trails from '../trails/index.js';

// Skigebietsmanager region_id=1060, captured live 2026-10-27: the rows under
// the 'Slopes' caption only (Winterhiking, Crosscountry and Legend excluded).
// Grades come off each slope's icon - the region prints its path with an
// empty segment (slope_diff_set_6//701/320.png), which the parser missed
// until 2026-11-27 and so published every slope here ungraded.
trails('serlesbahnen', [
  {
    'name': '1 Waldrasteck',
    'status': 'closed',
    'level': 'blue',
    'grade': 'blue'
  },
  {
    'name': '2 Talabfahrt',
    'status': 'closed',
    'level': 'black',
    'grade': 'red'
  },
  {
    'name': '3 Schneeboden',
    'status': 'closed',
    'level': 'blue',
    'grade': 'blue'
  },
  {
    'name': '4 Ochsenschuss',
    'status': 'closed',
    'level': 'black',
    'grade': 'red'
  },
  {
    'name': '5 Besserbrunnen',
    'status': 'closed',
    'level': 'blue',
    'grade': 'blue'
  },
  {
    'name': '6 Lärchenschuss',
    'status': 'closed',
    'level': 'blue',
    'grade': 'blue'
  },
  {
    'name': '7 Kinderland',
    'status': 'closed',
    'level': 'blue',
    'grade': 'blue'
  }
]);
