import coerce from '../../tools/coerce.js';
import reportedAt from './reported-at.js';
import status from './status.js';

/**
 * norefjell.com is a Citybreak destination portal that renders its ski report
 * from fnugg.no, the Norwegian national ski-resort platform; the resort id (6)
 * comes from the portal's own drupal-settings-json, {"fnugg":{"resortId":"6"}}.
 * Read the API directly: it is 18 KB against the page's 2 MB, needs no key or
 * referer, and it is the ONLY place the slope difficulties exist - the
 * server-rendered page drops them.
 *
 * The response is an Elasticsearch document envelope; everything lives under
 * _source. Lifts are _source.lifts.list[] -> { name, status, slope_difficulty },
 * and slope_difficulty is the literal string "uknown" (Fnugg's own typo) on
 * every lift entry, so ignore it here.
 */
export default function lifts(body) {
  const source = body?._source ?? {};
  const ls = {};
  for (const lift of source.lifts?.list ?? []) {
    const name = lift?.name?.trim();
    if (name) {
      ls[name] = coerce(status(lift.status));
    }
  }
  const at = reportedAt(source);
  if (at) {
    Object.defineProperty(ls, 'reportedAt', { value: at });
  }
  return ls;
}
