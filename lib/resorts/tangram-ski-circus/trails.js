import rows from './rows.js';
import status from './status.js';

// <h3>その他施設</h3> mixes on-snow terrain with restaurants, an onsen, a dog run
// and an indoor pool, and nothing in the markup distinguishes them, so the three
// terrain rows are allow-listed by name. Without this the trail list would carry
// タングラム斑尾温泉 and 室内プール - and in midsummer the pool is the only OPEN row
// on the whole page.
const parks = new Set(['スキー＆ボードパーク', 'キッズ・初心者練習エリア', 'キッズパーク']);

// Courses live under <h3>コース</h3>; 21 of them, from ハートランドライン down to
// the five ツリーラン runs. No difficulty is published anywhere on the site
// (初級 / 中級 / 上級 / 難易度 appear on neither lift.php nor map.php - the trail
// map is a raster JPEG), so courses carry no level and only the three park rows
// are labelled. 無圧雪 (ungroomed) and ツリーラン in a course name are descriptive,
// not difficulty.
export default function parse(dom) {
  const list = rows(dom, 'course').map(row => ({
    name: row.name,
    status: status(row.token, row.label)
  }));
  for (const row of rows(dom, 'park')) {
    if (parks.has(row.name)) {
      list.push({
        name: row.name,
        status: status(row.token, row.label),
        level: 'terrainPark'
      });
    }
  }
  return list;
}
