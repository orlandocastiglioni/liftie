import trails from '../trails/index.js';

// 2024-04-17 capture rather than the lift fixture: it is the one that mixes the
// course states properly - seven polygons at state 5 (closed), four at state 4
// (open, ungroomed) and A1/A5/A6 emitting no overlay at all, which for a course
// means groomed and OPEN. Getting that inversion backwards is the whole risk in
// this parser, so both defaults are asserted here.
trails(
  'geto-kogen',
  [
    { name: 'A1コース', status: 'open', level: 'green' },
    { name: 'A2コース', status: 'closed', level: 'blue' },
    { name: 'A3コース', status: 'closed', level: 'black' },
    { name: 'A4コース', status: 'closed', level: 'blue' },
    { name: 'A5コース', status: 'open', level: 'green' },
    { name: 'A6コース', status: 'open', level: 'green' },
    { name: 'B1コース', status: 'open', level: 'blue' },
    { name: 'B2コース', status: 'closed', level: 'black' },
    { name: 'B3コース', status: 'open', level: 'black' },
    { name: 'C1コース', status: 'closed', level: 'black' },
    { name: 'C2コース', status: 'open', level: 'blue' },
    { name: 'C3コース', status: 'closed', level: 'blue' },
    { name: 'C4コース', status: 'closed', level: 'green' },
    { name: 'C5コース', status: 'closed', level: 'black' }
  ],
  { example: 'geto-kogen-2024-04' }
);
