import coerce from '../../tools/coerce.js';
import rows from './rows.js';

// lifts are the rows under the 'Remontées mécaniques' sub-header; see rows.js.
// Status is published twice, as a CSS class (open | closed | prepare) and as
// visible French text; the text is the one coerce already speaks - 'Ouverte'
// -> open, 'Fermée' -> closed, 'en préparation' -> scheduled (which is what a
// lift on this network is: being readied and about to spin). Midwinter
// 'en préparation' is by far the most common value here, so it is the token
// that matters most.
export default function parse(dom) {
  const lifts = {};
  for (const { name, status } of rows(dom, 'lifts')) {
    lifts[name] = coerce(status);
  }
  return lifts;
}
