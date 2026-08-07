import trails from '../trails/index.js';

// 2025-02-19 wayback capture. Three graded pistes in table.slope - one of each
// Austrian colour, so blue/red/black all get exercised - then the five ski
// routes, which the page publishes with no difficulty cell at all. Karrinne
// open while the other four routes stay shut is the real report for that day,
// and it is what pins fa-times to closed here.
trails('nordkette', [
  {
    name: '4 Übungslift',
    status: 'open',
    level: 'blue',
    grade: 'blue'
  },
  {
    name: '7 Kurzes Tal',
    status: 'open',
    level: 'black',
    grade: 'red'
  },
  {
    name: '8 Kasermandel - Talele',
    status: 'open',
    level: 'doubleBlack',
    grade: 'black'
  },
  {
    name: '2 Zweier Abfahrt',
    status: 'closed'
  },
  {
    name: '1 Osthang',
    status: 'closed'
  },
  {
    name: '5 Karrinne',
    status: 'open'
  },
  {
    name: '6 Langes Tal',
    status: 'closed'
  },
  {
    name: '6 Seilbahnrinne',
    status: 'closed'
  }
]);
