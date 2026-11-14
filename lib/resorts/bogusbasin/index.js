import Debug from 'debug';

const debug = Debug('liftie:resort:bogusbasin');

import select from '../../select.js';
import coerce from '../../tools/coerce.js';
export default parse;

function parse(dom) {
  const dataScript = select(dom, 'x-filterable-lift-trail-status').map(script => script.attribs['data-data'].trim());
  const data = JSON.parse(dataScript);

  // Out of season the same widget lists summer zones as "lifts" ("Hiking &
  // Cross Country Trails", "Morning Star Zone - The Basin Gravity Park"), each
  // with liftType and openingStatus UNDEF. Only real lifts carry a type.
  const liftStatus = data.lifts
    .filter(lift => lift.liftType && lift.liftType !== 'UNDEF')
    .reduce((ls, lift) => {
      ls[lift['title']] = coerce(lift['openingStatus']);
      return ls;
    }, {});

  debug('Bogus Basin Lift Status:', liftStatus);
  return liftStatus;
}
