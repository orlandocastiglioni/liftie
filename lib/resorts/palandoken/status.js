import Debug from 'debug';

const debug = Debug('liftie:resort:palandoken');

/**
 * Lifts and pistes share one status vocabulary, taken from the admin select and
 * the status-pill logic in the site's SPA bundle: Active | Closed | Maintenance
 * | Inactive. Only 'Closed' survives coerce.js unaided - 'Active', 'Inactive'
 * and 'Maintenance' are all unknown to it and would land on 'scheduled', so a
 * running lift and a decommissioned one would read the same, and both would
 * read as about to open. Hence the explicit map.
 *
 * The tokens are ASCII, which is the reason this parser reads the API and not
 * the page: the rendered pill says ' Açık' / ' Kapalı' and JS case folding is
 * locale independent, so 'KAPALI'.toLowerCase() is 'kapali' while
 * 'Kapalı'.toLowerCase() is 'kapalı' - two spellings of one word.
 *
 * isOpen is the SPA's own derivation (operatingStatus === 'Active') and is the
 * fallback when operatingStatus is missing or carries a word this map has not
 * seen: 'true'/'false' both coerce correctly, and following the site's own
 * reading beats guessing. The schema was seeded days ago and may still churn,
 * so an unrecognised word is logged rather than passed off silently.
 */
const states = {
  active: 'open',
  closed: 'closed',
  maintenance: 'hold',
  inactive: 'closed'
};

export default function status(row = {}) {
  const token = String(row.operatingStatus ?? '').trim();
  const state = states[token.toLowerCase()];
  if (state) {
    return state;
  }
  if (token) {
    debug('unknown operatingStatus %s', token);
  }
  return typeof row.isOpen === 'boolean' ? String(row.isOpen) : token;
}
