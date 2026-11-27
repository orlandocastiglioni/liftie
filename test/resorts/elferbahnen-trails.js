import trails from '../trails/index.js';

// Same capture as the lift test: the rows under the 'Slopes' caption - the two
// rote Abfahrten, the ungraded Skiroute and the Krößbach practice slope, which
// Intermaps files under slopes. Grades come off the slope icon, whose path
// this region prints with an empty segment (slope_diff_set_6//701/288.png).
trails('elferbahnen', [
  {
    'name': 'Abfahrt Elferhütte',
    'status': 'closed',
    'level': 'black',
    'grade': 'red'
  },
  {
    'name': 'Abfahrt Hölltal',
    'status': 'closed',
    'level': 'black',
    'grade': 'red'
  },
  {
    'name': 'Skiroute',
    'status': 'closed'
  },
  {
    'name': 'Übungslift Krößbach',
    'status': 'closed',
    'level': 'blue',
    'grade': 'blue'
  }
]);
