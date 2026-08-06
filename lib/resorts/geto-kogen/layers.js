import select from '../../select.js';

// リフト運行状況、コース開放状況 is not a table: it is a stack of absolutely
// positioned <img> overlays painted on one base trail map, and the whole report
// is encoded in their filenames.
//
//   <img src="../../documents/m_ski/course/1619228965_6_0.gif">
//                                          ^objectId ^stateId
//
// objectId identifies the lift line (.gif) or course polygon (.png) and is
// stable across seasons - it is the unix timestamp of the day that overlay was
// uploaded. stateId is the painted style, and only 4/5/6 exist on the server
// (1,2,3,7,8 all 404). See status.js for what each means.
//
// A layer that is ABSENT is not "no data": it is the default state, i.e. the
// look of the untouched base map. That default is opposite for the two halves,
// so both parsers iterate their own fixed id list rather than whatever the page
// happens to emit.
export default function layers(dom) {
  const state = {};
  for (const img of select(dom, '.course_wrapper img')) {
    const m = img.attribs.src?.match(/\/m_ski\/course\/(\d+)_(\d)_0\.(?:png|gif)$/);
    if (m) {
      state[m[1]] = m[2];
    }
  }
  return state;
}
