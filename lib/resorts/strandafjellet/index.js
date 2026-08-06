import coerce from '../../tools/coerce.js';
import reportedAt from './reported-at.js';
import status from './status.js';

/**
 * strandafjellet.no publishes no rows of its own: its winter landing page
 * embeds a Fnugg widget that shows only the aggregate counts ("Lifts 0\7",
 * "Slopes 0\19") and links out to fnugg.no/stranda for the detail. Fnugg is
 * therefore the resort's own published report, not a third-party substitute -
 * resort id 21, found through https://api.fnugg.no/search?q=stranda.
 *
 * (api.fnugg.no/docs/v1: the API is open but asks for a fnugg.no credit in
 * text or logo wherever the data is shown.)
 *
 * The response is an Elasticsearch document envelope; everything lives under
 * _source. Lifts are _source.lifts.list[] -> { name, status, slope_difficulty },
 * where slope_difficulty is the literal string "uknown" (Fnugg's own typo) on
 * every lift entry, so it is ignored here.
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
    // non-enumerable: metadata about the report, not one of its lifts
    Object.defineProperty(ls, 'reportedAt', { value: at });
  }
  return ls;
}
