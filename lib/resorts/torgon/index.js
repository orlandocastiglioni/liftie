import coerce from '../../tools/coerce.js';
import rows from './snowflake.js';

// Server-rendered snowflake card on the Portes du Soleil network site; see
// snowflake.js for how a row is recognised as Torgon's and as a lift.
// Status is published twice, as a CSS class (open | closed | prepare) and as
// visible French text; the text is the one coerce already speaks - 'Ouverte'
// -> open, 'Fermée' -> closed, 'en préparation' -> scheduled (which is what a
// lift on this network is: groomed and about to spin).
export default function parse(dom) {
  const lifts = {};
  for (const { name, status } of rows(dom, 'lifts')) {
    lifts[name] = coerce(status);
  }
  return lifts;
}
