import coerce from '../../tools/coerce.js';
import statusRows from './rows.js';

// lift rows are the ones under the sheet's "Lift Status" section; they carry no
// difficulty image. rows.js emits plain 'open'/'closed'/'scheduled' tokens.
export default function parse(dom) {
  const status = {};
  for (const row of statusRows(dom)) {
    if (row.isLift) {
      status[row.name] = coerce(row.status);
    }
  }
  return status;
}
