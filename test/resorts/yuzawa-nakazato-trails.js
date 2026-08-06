import trails from '../trails/index.js';

// 2026-01-01: #todayLift03 names four of the six areas; ザ・パーク and
// ザ・バンピー were not open yet that week
trails('yuzawa-nakazato', [
  {
    'name': 'スマイルキッズパーク',
    'status': 'open'
  },
  {
    'name': '雪遊びパーク',
    'status': 'open'
  },
  {
    'name': 'エンゼルゲレンデ',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'ザ・パーク',
    'status': 'closed',
    'level': 'terrainPark'
  },
  {
    'name': 'ザ・ウェイビー',
    'status': 'open',
    'level': 'terrainPark'
  },
  {
    'name': 'ザ・バンピー',
    'status': 'closed',
    'level': 'terrainPark'
  }
]);

// off season: #todayLift03 does not exist, everything reads closed
trails(
  'yuzawa-nakazato',
  [
    {
      'name': 'スマイルキッズパーク',
      'status': 'closed'
    },
    {
      'name': '雪遊びパーク',
      'status': 'closed'
    },
    {
      'name': 'エンゼルゲレンデ',
      'status': 'closed',
      'level': 'green'
    },
    {
      'name': 'ザ・パーク',
      'status': 'closed',
      'level': 'terrainPark'
    },
    {
      'name': 'ザ・ウェイビー',
      'status': 'closed',
      'level': 'terrainPark'
    },
    {
      'name': 'ザ・バンピー',
      'status': 'closed',
      'level': 'terrainPark'
    }
  ],
  { example: 'yuzawa-nakazato-offseason' }
);
