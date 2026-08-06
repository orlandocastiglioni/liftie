import rows from './rows.js';
import status from './status.js';

// /winter/shimokura/course/ - コース名 | 営業状況 | 営業予定時間 | 備考, the same
// shared two-area table as the lift page, so rows.js does the same Panorama
// filtering. Shimokura publishes 11 courses, including the four ツリーランエリア.
//
// No difficulty is published anywhere in the HTML: 初級 / 中級 / 上級 / 難易度 do
// not appear on the course page, the Shimokura index or any winter snapshot -
// difficulty exists only as colour on the raster course-map JPEG. So rows carry
// name + status and no level (lib/trails/parse.js makes level optional).
export default function parse(dom) {
  return rows(dom).map(row => ({ name: row.name, status: status(row.status) }));
}
