import trails from '../trails/index.js';

// 2025-02-09: all 21 courses under <h3>コース</h3> in page order, three of them
// closed, followed by the three on-snow rows allow-listed out of <h3>その他施設</h3>.
// The nine facility rows in that block - スノーラフティング, スノーモビル,
// 野尻湖ラウンジ, ZIGZAG（ランチ）, Centotto CAFE, 独楽, 雪上ドッグラン,
// タングラム斑尾温泉, 室内プール - must NOT appear: on this capture the onsen is
// closed while the pool is open, and in midsummer the pool is the only open row
// on the whole page.
//
// 無圧雪 (ungroomed) and ツリーラン in a course name are descriptive; the site
// publishes no difficulty at all, so only the park rows carry a level.
trails(
  'tangram-ski-circus',
  [
    { name: 'ハートランドライン', status: 'open' },
    { name: 'クイーンズダウンヒル（上部）', status: 'open' },
    { name: 'クイーンズダウンヒル（下部）', status: 'open' },
    { name: 'ジグザグライン', status: 'open' },
    { name: 'グリーンライン', status: 'open' },
    { name: 'フォレストライン（上部）', status: 'open' },
    { name: 'フォレストライン（下部）', status: 'open' },
    { name: 'ビレッジライン(無圧雪）', status: 'closed' },
    { name: 'ホワイトライン(無圧雪）', status: 'closed' },
    { name: 'パンタンライン', status: 'open' },
    { name: 'プライマリーライン', status: 'open' },
    { name: 'ジャックダウンヒル(無圧雪）', status: 'open' },
    { name: 'ファミリーライン', status: 'open' },
    { name: 'マルチプレイライン', status: 'open' },
    { name: 'スカイラブライン', status: 'open' },
    { name: 'キングススラローム(無圧雪）', status: 'open' },
    { name: 'ももダウンヒル（ツリーラン）', status: 'open' },
    { name: 'あんずダウンヒル（ツリーラン）', status: 'open' },
    { name: 'りんごランド（ツリーラン）', status: 'open' },
    { name: 'ぶどう沢（ツリーラン）', status: 'open' },
    { name: 'ぶどう谷（ツリーラン）', status: 'closed' },
    { name: 'スキー＆ボードパーク', status: 'closed', level: 'terrainPark' },
    { name: 'キッズ・初心者練習エリア', status: 'open', level: 'terrainPark' },
    { name: 'キッズパーク', status: 'open', level: 'terrainPark' }
  ],
  { example: 'tangram-ski-circus-2025' }
);
