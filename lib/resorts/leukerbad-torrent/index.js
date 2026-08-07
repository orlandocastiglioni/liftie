import coerce from '../../tools/coerce.js';
import { report, reportedAt, rows } from './report.js';

// The 'Anlagen' block of the infosnow p=135 report: 7 lifts, named with the
// letter the piste map labels them with (A Leukerbad - Rinderhütte). Status is
// the state icon number, never the German word - see report.js.
//
// SCOPE: infosnow keeps the two lift systems the Indy listing bundles as
// separate entries and a resort can only fetch one url, so this is Torrent
// (e=135). Gemmi (e=136, two cable cars, no alpine pistes) is not included.
export default function lifts(dom) {
  const doc = report(dom);
  const ls = {};
  for (const { name, status } of rows(doc, ['Anlagen'])) {
    ls[name] = coerce(status);
  }
  const at = reportedAt(doc);
  if (at) {
    Object.defineProperty(ls, 'reportedAt', { value: at });
  }
  return ls;
}
