import coerce from '../../tools/coerce.js';

/**
 * tyrolbasin.com/slope-report/ is only an iframe around Alpine Media
 * Technology's embed; the embed itself talks socket.io, but the same
 * FeathersJS services answer plain REST at api.alpinemedia.com, shaped
 * { total, limit, skip, data: [...] }. Same platform as
 * lib/resorts/middlebury-snowbowl.
 *
 * BEFORE THIS FETCHES: the X-Alpine-API-Token value in resort.json is
 * intentionally blank, exactly as it is for middlebury-snowbowl. Without it
 * the service answers 401 {"name":"NotAuthenticated"}. The value is the
 * public client key the embed ships in its own javascript bundle - fetch
 * https://tyrol-basin.app.alpinemedia.com/embed/lifts-trails/conditions?resort=tyrol-basin
 * and read the expo config "extra".apiKey out of the /static/js/*.js chunk.
 * Unlike middlebury, the token alone scopes the response to Tyrol Basin
 * (resort _id 63287af7a33f3b8d3417c104), so no X-Alpine-Org header is
 * needed. Expect to re-extract the key if the endpoint starts answering 401
 * after an app release, and keep this resort out of LIFTIE_RESORTS until the
 * value is filled in - it would poll a 401 every cycle.
 *
 * displayName is empty on every Tyrol lift, so name is what shows. status is
 * one of open | hold | closed, all three known to coerce. statusText is
 * operator-editable display copy and must not be used as the status.
 */
export default function parse(body) {
  const lifts = {};
  for (const lift of body?.data ?? []) {
    const name = (lift.displayName || lift.name || '').trim();
    if (name) {
      lifts[name] = coerce(lift.status);
    }
  }
  return lifts;
}
