import coerce from '../../tools/coerce.js';

/**
 * Alpine Media Technology feed behind the conditions-page embed, shaped
 * { total, limit, skip, data: [...] }.
 *
 * ONE THING IS STILL MISSING BEFORE THIS FETCHES: the token value in
 * resort.json is intentionally blank. The API is scoped by two request
 * headers (X-Alpine-API-Token and X-Alpine-Org, see resort.json) - without
 * the org header the feed answers {"total":0,"data":[]}, without the token
 * 401, and query-parameter forms of both were tested and none work.
 * url.headers passthrough now exists in lib/lifts/{rest,request}.js, so the
 * org header is already sent; only the token is left to fill in. It is the
 * public client key the embed app ships in its own javascript bundle
 * (ski-middlebury.app.alpinemedia.com /static/js/*.js, the expo config
 * "extra".apiKey); drop it in there, and expect to re-extract it if the
 * endpoint starts answering 401 after an app release.
 *
 * Until then this resort must stay OUT of LIFTIE_RESORTS - it would poll a
 * 401 every cycle.
 *
 * The embed renders displayName when it is set and falls back to name.
 * status is one of open | hold | closed - all three are known to coerce.
 * statusText is free-form display copy and must not be used as the status.
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
