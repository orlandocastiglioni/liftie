import coerce from '../../tools/coerce.js';
import status from './status.js';

/**
 * Cloudflare covers the whole origin - plain curl gets 403 'Just a moment…' on
 * every path, including /robots.txt and the SPA's own bundle - so resort.json
 * routes /api/lifts through flaresolverr. It is slow: 60 s times out, the two
 * recon fetches took 94 s and 101 s, hence maxTimeout 150000. fetchvia unwraps
 * Chrome's JSON viewer <pre>, so this still receives parsed JSON.
 *
 * A bare array of the ten Palandöken lifts, which is all /liftler renders.
 * liftName and name hold the same value; the code (L-01 … L-10) is positional
 * and not carried into the report. The sister centre Konaklı is the same
 * endpoint with centerSlug=konakli and would be its own liftie resort.
 */
export default function parse(body) {
  const lifts = {};
  for (const lift of Array.isArray(body) ? body : []) {
    const name = (lift.liftName ?? lift.name)?.trim();
    if (!name) {
      continue;
    }
    lifts[name] = coerce(status(lift));
  }
  return lifts;
}
