import layers from './layers.js';
import { liftStatus } from './status.js';

// The five lifts are .gif overlay layers. Their names exist only as pixels
// painted into the base trail map, so the objectId -> name table has to be
// hardcoded; it was derived by masking the base map with each line's alpha
// channel and reading the label that survives inside the shape. objectIds are
// upload timestamps and are stable until the resort re-cuts the map.
//
// This is the complete set the resort publishes. Order follows the map legend.
const lifts = [
  ['1618995431', '第1ペアリフト'],
  ['1619225180', '第2ペアリフト'],
  ['1619228965', '第1ゴンドラ'],
  ['1619232636', '第2ゴンドラ'],
  ['1619240207', 'クワッドリフト']
];

// Three .gif layers are page furniture and never carry status - the base trail
// map 1618995312 (which also paints the legend and the solid closed-lift lines)
// and the two legend swatches 1619309299 / 1619310277, all three always emitted
// at state 4. They are simply not in the table above.
//
// Iterate the fixed list, not the page: a lift missing from the HTML is
// 運休・終了, not missing data.
export default function parse(dom) {
  const state = layers(dom);
  const result = {};
  for (const [id, name] of lifts) {
    result[name] = liftStatus(state[id]);
  }
  return result;
}
