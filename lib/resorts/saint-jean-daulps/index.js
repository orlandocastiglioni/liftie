import coerce from '../../tools/coerce.js';
import rows from './rows.js';

// lifts are the rows under the 'Remontées mécaniques' sub-header of either
// sector card; see rows.js. Status is published twice, as a CSS class
// (open | closed | prepare) and as visible French text; the text is the one
// coerce already speaks - 'Ouverte' -> open, 'Fermée' -> closed,
// 'en préparation' -> scheduled (which is what a lift on this network is:
// being readied and about to spin).
//
// La Chevrerie's 'Ecole 1', 'Ecole 2' and 'Les etangs' are lift names as well
// as piste names on this page. They do not collide here because the collision
// is across kinds, not within one - but two lifts sharing a name would, since
// lifts are keyed by name.
export default function parse(dom) {
  const lifts = {};
  for (const { name, status } of rows(dom, 'lifts')) {
    lifts[name] = coerce(status);
  }
  return lifts;
}
