import coerce from '../../tools/coerce.js';
import records from './warmup.js';

// HBMLiftStatus holds one record per lift. title_fld is the lift name (some
// carry trailing spaces - trim); liftStatus1 is the raw status token
// (Open/Closed/hold, all understood by coerce).
export default function parse(dom) {
  const lifts = {};
  for (const r of records(dom, 'HBMLiftStatus')) {
    const name = r.title_fld?.trim();
    if (name) {
      lifts[name] = coerce(r.liftStatus1);
    }
  }
  return lifts;
}
