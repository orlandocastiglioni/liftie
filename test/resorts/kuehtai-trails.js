import trails from '../trails/index.js';

// Same 20260218 winter capture as the lift test: 36 rows in page order, 32 open
// and 4 closed, which is exactly the "32 / 38" the page's own header prints
// (their denominator counts two rows the table does not).
//
// Grades are the three-tier Austrian scale published as a colour class: 11 blue,
// 16 red -> black, 7 black -> doubleBlack. The last two rows of the table, "1
// Gaiskogel" and "2 Hohe Mut", are ski routes folded into table.slope with an
// EMPTY difficulty cell - they publish with neither level nor grade rather than
// being guessed at.
trails('kuehtai', [
  { name: '1 Hochalter', status: 'open', level: 'black', grade: 'red' },
  { name: '10 Wiesberg', status: 'open', level: 'black', grade: 'red' },
  { name: '11 Alpenrosen', status: 'open', level: 'black', grade: 'red' },
  { name: '12 Alpenrosen', status: 'open', level: 'black', grade: 'red' },
  { name: '13 Alpenrosen', status: 'open', level: 'black', grade: 'red' },
  { name: '13 HoheMut', status: 'open', level: 'black', grade: 'red' },
  { name: '14 Alpenrosen', status: 'open', level: 'doubleBlack', grade: 'black' },
  { name: '14 HoheMut', status: 'open', level: 'doubleBlack', grade: 'black' },
  { name: '16 Kaiserbahn', status: 'open', level: 'black', grade: 'red' },
  { name: '2 Hochalter', status: 'open', level: 'black', grade: 'red' },
  { name: '3 Hochalter', status: 'open', level: 'black', grade: 'red' },
  { name: '4 Gaiskogel', status: 'open', level: 'black', grade: 'red' },
  { name: '4a Gaiskogel', status: 'closed', level: 'doubleBlack', grade: 'black' },
  { name: '5 Gaiskogel', status: 'closed', level: 'doubleBlack', grade: 'black' },
  { name: '6 Gaiskogel', status: 'open', level: 'doubleBlack', grade: 'black' },
  { name: '7 Wiesberg', status: 'open', level: 'doubleBlack', grade: 'black' },
  { name: '8 Wiesberg', status: 'open', level: 'black', grade: 'red' },
  { name: '9 Gaiskogel', status: 'open', level: 'black', grade: 'red' },
  { name: '10 Dreiseen', status: 'open', level: 'black', grade: 'red' },
  { name: 'Kühteppich Übungshang', status: 'open', level: 'blue', grade: 'blue' },
  { name: 'KPark', status: 'open', level: 'doubleBlack', grade: 'black' },
  { name: '17 Schwarzmoos-Skiweg', status: 'open', level: 'black', grade: 'red' },
  { name: 'Skiweg Kaiser-Max-Hütte', status: 'open', level: 'blue', grade: 'blue' },
  { name: 'Sonnenlift-Skiweg', status: 'open', level: 'blue', grade: 'blue' },
  { name: 'Sonnenlift-Übungshang', status: 'open', level: 'blue', grade: 'blue' },
  { name: 'StartBahn-Skiweg', status: 'open', level: 'blue', grade: 'blue' },
  { name: 'StartBahn-Übungshang Ost', status: 'open', level: 'blue', grade: 'blue' },
  { name: 'StartBahn-Übungshang West', status: 'open', level: 'blue', grade: 'blue' },
  // the operator really does publish two runs called Wiesberg-Skiweg, a blue
  // and a red; trails are an array so both survive
  { name: 'Wiesberg-Skiweg', status: 'open', level: 'blue', grade: 'blue' },
  { name: 'Wiesberg-Skiweg', status: 'open', level: 'black', grade: 'red' },
  { name: 'Wunderteppich-Übungshang', status: 'open', level: 'blue', grade: 'blue' },
  { name: 'Skiweg Loisl´s Schirm', status: 'open', level: 'blue', grade: 'blue' },
  { name: '1 Gaiskogel', status: 'closed' },
  { name: '15 Kaiserbahn', status: 'open', level: 'black', grade: 'red' },
  { name: '2 Hohe Mut', status: 'closed' },
  { name: '18 Schwarzmoos', status: 'open', level: 'blue', grade: 'blue' }
]);
