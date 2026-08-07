/**
 * hochalmbahnen.at publishes no status of its own - the conditions page is
 * three third-party embeds - so the source is the intermaps skimap feed the
 * page itself loads (winter.intermaps.com/rauris/data).
 *
 * intermaps ships its status vocabulary in the sibling /rauris/config response
 * (.translations), so this is the COMPLETE enum rather than only what happens
 * to be live today. Every token and its German label:
 *
 *   open                offen
 *   open_groomed        offen & präpariert
 *   open_ungroomed      offen
 *   open_waitingtimes   offen, Wartezeit
 *   partially_open      teilweise geöffnet
 *   in_preparation      in Vorbereitung
 *   unknown             unbekannt
 *   closed              geschlossen
 *   closed_outoforder   außer Betrieb
 *   closed_atmos        geschlossen auf Grund von Sturm
 *   closed_avalanche    geschlossen
 *
 * Only `open`, `closed` and `partially_open` survive coerce.js (which strips
 * [\s_-] before the lookup); the other eight all fall through to 'scheduled',
 * so an out-of-order lift and a storm-closed lift would both publish as if
 * they were about to open. Map them here instead of relying on the fallback.
 *
 * Every closed_* variant is rendered to the resort's own visitors with the word
 * "geschlossen", and intermaps has no separate running-but-stopped state, so
 * they all read as closed rather than as liftie's `hold` (which is for wind
 * holds and standby). `unknown` means the resort published nothing for that
 * line; 'scheduled' is liftie's no-information bucket.
 */
const map = {
  open: 'open',
  open_groomed: 'open',
  open_ungroomed: 'open',
  open_waitingtimes: 'open',
  partially_open: 'open',

  in_preparation: 'scheduled',
  unknown: 'scheduled',

  closed: 'closed',
  closed_outoforder: 'closed',
  closed_atmos: 'closed',
  closed_avalanche: 'closed'
};

// unmapped tokens are handed to coerce untouched so a new state shows up in
// the coerce debug log instead of being silently swallowed here
export default function status(token) {
  return map[token] ?? token;
}
