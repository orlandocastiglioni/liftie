import Debug from 'debug';
import coerce from '../../tools/coerce.js';

const debug = Debug('liftie:resort:saddleback');

// the mountain report page fills itself from the public Lumiplan-backed
// netlify function; data.lifts is an object keyed by camelCase lift name -
// some keys and names carry trailing spaces, so trim; openingStatus is
// OPEN | FORECAST | CLOSED (coerce maps forecast to scheduled)
export default function parse({ data } = {}) {
  const liftStatus = {};

  for (const { name, openingStatus } of Object.values(data?.lifts ?? {})) {
    if (name) {
      liftStatus[name.trim()] = coerce(openingStatus);
    }
  }

  debug('Lift Status', liftStatus);
  return liftStatus;
}
