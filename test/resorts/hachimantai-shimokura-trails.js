import trails from '../trails/index.js';

// 2025-03-20: all 11 Shimokura courses in page order, with the nine Panorama
// rows above them filtered out. ツリーランエリア「DROP」 is the one closed row
// ('－' with the note コンディション不良の為、クローズ) while its three siblings
// run, which is the only in-season proof we have that the closed glyph is read
// as closed rather than 'scheduled'.
//
// No level on any row: the resort publishes difficulty only as colour on the
// raster course-map JPEG.
trails(
  'hachimantai-shimokura',
  [
    { name: 'ダイヤモンドコース', status: 'open' },
    { name: 'ホワイトコース', status: 'open' },
    { name: 'シルキーコース', status: 'open' },
    { name: 'シルキーパウダーコース', status: 'open' },
    { name: 'グリーンAコース', status: 'open' },
    { name: 'グリーンBコース', status: 'open' },
    { name: 'グリーンCコース', status: 'open' },
    { name: 'ツリーランエリア「DROP」', status: 'closed' },
    { name: 'ツリーランエリア「FUN」', status: 'open' },
    { name: 'ツリーランエリア「CRUISE」', status: 'open' },
    { name: 'ツリーランエリア「EDGE」', status: 'open' }
  ],
  { example: 'hachimantai-shimokura-trails' }
);
