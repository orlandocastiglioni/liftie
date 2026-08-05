import coerce from '../../tools/coerce.js';
import normalizeStatus from './status.js';

// Remix route-loader payload (?_data=routes/_page.conditions-trail-map on the
// conditions page) - one request carries lifts, trails and the base/snowfall
// conditions. $.status.lifts is [{ name, status }].
// The ?_data= query protocol is a Remix v2 internal that only answers while
// the app ships future.v3_singleFetch=false; if that ever changes the endpoint
// returns the page HTML instead, so bail out rather than publishing garbage.
export default function parse(data) {
  const lifts = data?.status?.lifts;
  if (!Array.isArray(lifts)) {
    return {};
  }
  const liftStatus = {};
  for (const lift of lifts) {
    if (lift?.name) {
      liftStatus[lift.name.trim()] = coerce(normalizeStatus(lift.status));
    }
  }
  return liftStatus;
}
