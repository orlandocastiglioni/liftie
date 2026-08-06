import trails from '../trails/index.js';

// separate fixture: the 2025-02-11 capture carries the full 26-course
// catalogue (the 2024 one used by the lift test predates gc26 ロイヤルパウダー)
// with gc6 and gc8 CLOSE, so it exercises the gcN join in both directions.
trails(
  'kamui-ski-links',
  [
    { name: 'ちびっこ', status: 'open', level: 'green' },
    { name: 'レッスン', status: 'open', level: 'green' },
    { name: 'センター', status: 'open', level: 'green' },
    { name: 'ファミリー', status: 'open', level: 'green' },
    { name: '初心者コース', status: 'open', level: 'green' },
    { name: 'Jr.チャレンジ大岩', status: 'closed', level: 'green' },
    { name: '白樺１', status: 'open', level: 'green' },
    { name: 'バンク', status: 'closed', level: 'blue' },
    { name: 'ゴールド１', status: 'open', level: 'green' },
    { name: 'ゴールド３', status: 'open', level: 'blue' },
    { name: 'Jr.チャレンジ森道', status: 'open', level: 'blue' },
    { name: 'ゴールド２', status: 'open', level: 'blue' },
    { name: '白樺２', status: 'open', level: 'blue' },
    { name: 'ロイヤル中級', status: 'open', level: 'blue' },
    { name: '連絡', status: 'open', level: 'blue' },
    { name: 'スラロームバーン', status: 'open', level: 'blue' },
    { name: '林道', status: 'open', level: 'blue' },
    { name: 'ロイヤル上級', status: 'open', level: 'black' },
    { name: 'シルキー', status: 'open', level: 'black' },
    { name: 'ダイナミック', status: 'open', level: 'black' },
    { name: 'ディープパウダー', status: 'open', level: 'black' },
    { name: 'フレッシュパウダー', status: 'open', level: 'black' },
    { name: 'ツリーラン', status: 'open', level: 'black' },
    { name: 'バンプス', status: 'open', level: 'black' },
    { name: 'トド松', status: 'open', level: 'black' },
    { name: 'ロイヤルパウダー', status: 'open', level: 'black' }
  ],
  { example: 'kamui-ski-links-trails' }
);
