import trails from '../trails/index.js';

// 2026-03-06 wayback capture: all seven pistes open. Five blau and two rot -
// Serles publishes no schwarze Piste - and the rows come in the operator's
// order, not numeric order.
trails('serlesbahnen', [
  {
    name: '1 Waldrasteck',
    status: 'open',
    level: 'blue',
    grade: 'blue'
  },
  {
    name: '4 Ochsenschuss',
    status: 'open',
    level: 'black',
    grade: 'red'
  },
  {
    name: '2 Talabfahrt',
    status: 'open',
    level: 'black',
    grade: 'red'
  },
  {
    name: '6 Lärchenschuss',
    status: 'open',
    level: 'blue',
    grade: 'blue'
  },
  {
    name: '5 Besserbrunnen',
    status: 'open',
    level: 'blue',
    grade: 'blue'
  },
  {
    name: '3 Schneeboden',
    status: 'open',
    level: 'blue',
    grade: 'blue'
  },
  {
    name: '7 Kinderland',
    status: 'open',
    level: 'blue',
    grade: 'blue'
  }
]);

// live 2026-08-07 capture: same seven rows, same grades, all shut. No winter
// capture of this page has a single closed piste, so this is what proves
// fa-times reads as closed instead of coercing to 'scheduled'.
trails(
  'serlesbahnen',
  [
    {
      name: '1 Waldrasteck',
      status: 'closed',
      level: 'blue',
      grade: 'blue'
    },
    {
      name: '4 Ochsenschuss',
      status: 'closed',
      level: 'black',
      grade: 'red'
    },
    {
      name: '2 Talabfahrt',
      status: 'closed',
      level: 'black',
      grade: 'red'
    },
    {
      name: '6 Lärchenschuss',
      status: 'closed',
      level: 'blue',
      grade: 'blue'
    },
    {
      name: '5 Besserbrunnen',
      status: 'closed',
      level: 'blue',
      grade: 'blue'
    },
    {
      name: '3 Schneeboden',
      status: 'closed',
      level: 'blue',
      grade: 'blue'
    },
    {
      name: '7 Kinderland',
      status: 'closed',
      level: 'blue',
      grade: 'blue'
    }
  ],
  { example: 'serlesbahnen-summer' }
);
