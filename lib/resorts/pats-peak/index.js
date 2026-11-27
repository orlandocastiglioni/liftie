import Debug from 'debug';
import { mark, offseason } from './season.js';

const debug = Debug('liftie:resort:pats-peak');
export default parse;

// wp-api.patspeak.com/api/SnowReport/Status (2026 WordPress replatform of the
// old services.patspeak.com endpoint - identical JSON schema); the host sits
// behind Cloudflare, so resort.json routes it via flaresolverr and the JSON is
// unwrapped from Chrome's JSON-viewer <pre> page by fetchvia
function parse(data) {
  const liftStatus = {};
  if (offseason(data, data?.Lifts)) {
    return mark(liftStatus, data);
  }

  data.Lifts.forEach(lift => {
    if (!lift.Active) {
      // the resort's own snow report JS hides inactive lifts
      return;
    }
    liftStatus[lift.Name.trim()] = lift.Status.Open ? 'open' : 'closed';
  });

  debug('Pats Peak Lift Status:', liftStatus);
  return liftStatus;
}
