import coerce from '../../tools/coerce.js';
import rows from './rows.js';

// Server-rendered snowflake cards on the Portes du Soleil network site; see
// rows.js for how a row is recognised as this station's and as a lift (the
// 'Remontées mécaniques' sub-header). Status is published twice, as a CSS
// class (open | closed | prepare) and as visible French text; the text is the
// one coerce already speaks - 'Ouverte' -> open, 'Fermée' -> closed,
// 'en préparation' -> scheduled, which is what a lift in that state is:
// groomed and due to spin shortly.
export default function parse(dom) {
  const lifts = {};
  for (const { name, status } of rows(dom, 'lifts')) {
    lifts[name] = coerce(status);
  }
  return lifts;
}
