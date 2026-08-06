import trails from '../trails/index.js';

// same 2026-01-12 capture as the lift test: is-active, is-ready and is-close
// all appear, and たんぽぽコース is drawn as three separate <path> segments
// that must collapse to a single row
trails('hodaigi', [
  { name: '白樺ゲレンデ', status: 'closed', level: 'blue' },
  { name: '第2連絡コース', status: 'closed', level: 'green' },
  { name: '第1連絡コース', status: 'closed', level: 'green' },
  { name: '第2東コース', status: 'open', level: 'blue' },
  { name: '第2西コース', status: 'open', level: 'green' },
  { name: 'ファミリーゲレンデ', status: 'open', level: 'green' },
  { name: 'スラロームコース①', status: 'scheduled', level: 'blue' },
  { name: 'スラロームコース②', status: 'open', level: 'blue' },
  { name: 'イーグルコース①', status: 'scheduled', level: 'black' },
  { name: 'イーグルコース②', status: 'scheduled', level: 'black' },
  { name: 'ダウンヒルコース①', status: 'scheduled', level: 'black' },
  { name: 'ダウンヒルコース②', status: 'scheduled', level: 'black' },
  { name: 'パラダイスコース', status: 'scheduled', level: 'black' },
  { name: '第5西コース', status: 'scheduled', level: 'blue' },
  { name: 'パノラマコース', status: 'scheduled', level: 'blue' },
  { name: 'たんぽぽコース', status: 'open', level: 'green' },
  { name: '成平上部コース', status: 'open', level: 'black' },
  { name: '成平コース', status: 'open', level: 'black' },
  { name: '第9コース', status: 'open', level: 'black' },
  { name: '第10コース①', status: 'open', level: 'blue' },
  { name: '第10コース②', status: 'open', level: 'blue' },
  { name: '第10コース③', status: 'open', level: 'blue' }
]);
