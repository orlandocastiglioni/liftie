import trails from '../trails/index.js';

// 2026-01-10: 15 COURSE runs (難易度 column -> 初級/中級/上級), 3 MOGUL rows with
// no difficulty column, then the four name-less tables whose name is their <h3>
trails('whitepia-takasu', [
  {
    'name': 'センターA',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'センターB',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'センターC',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'ブラックベア',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'パノラマウェイ',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'ダイビング',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'パノラマウェイ下部',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'スイング',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'ダンシング',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'スキップ',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'ジャンピング',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'スネークストリート',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'ブラックベア下部',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'センターウェイ',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'スターコース',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': '初級コース',
    'status': 'closed'
  },
  {
    'name': '中級コース',
    'status': 'closed'
  },
  {
    'name': '上級コース',
    'status': 'closed'
  },
  {
    'name': 'フリースタイルパーク',
    'status': 'open',
    'level': 'terrainPark'
  },
  {
    'name': 'キッズピア',
    'status': 'closed'
  },
  {
    'name': 'レッツピア',
    'status': 'closed'
  },
  {
    'name': '展望スノートレッキング',
    'status': 'closed'
  }
]);

// 2026-02-08: same 22 rows, ○ vs the em dash "—" (ブラックベア, ジャンピング,
// 初級コース, 上級コース, レッツピア) which must read closed, not scheduled
trails(
  'whitepia-takasu',
  [
    {
      'name': 'センターA',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'センターB',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'センターC',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'ブラックベア',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'パノラマウェイ',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'ダイビング',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'パノラマウェイ下部',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'スイング',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'ダンシング',
      'status': 'open',
      'level': 'black'
    },
    {
      'name': 'スキップ',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': 'ジャンピング',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'スネークストリート',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'ブラックベア下部',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'センターウェイ',
      'status': 'open',
      'level': 'green'
    },
    {
      'name': 'スターコース',
      'status': 'open',
      'level': 'blue'
    },
    {
      'name': '初級コース',
      'status': 'closed'
    },
    {
      'name': '中級コース',
      'status': 'open'
    },
    {
      'name': '上級コース',
      'status': 'closed'
    },
    {
      'name': 'フリースタイルパーク',
      'status': 'open',
      'level': 'terrainPark'
    },
    {
      'name': 'キッズピア',
      'status': 'open'
    },
    {
      'name': 'レッツピア',
      'status': 'closed'
    },
    {
      'name': '展望スノートレッキング',
      'status': 'open'
    }
  ],
  { example: 'whitepia-takasu-20260208' }
);
