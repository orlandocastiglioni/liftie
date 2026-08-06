// /mtn-xml/ is an unlinked SnoCountry-style feed (found via page-sitemap.xml)
// and the only per-lift source - the public conditions page publishes just an
// aggregate "6 / 8". It is served as text/xml but is not well formed (bogus
// <xml version=...> root element), so it goes through the normal html pipe;
// htmlparser2 nests the custom <lifts>/<lift> tags fine and parser.js keeps
// attribute names verbatim (lowerCaseAttributeNames: false).
// @status is 'Open' | 'Closed'; @nightStatus is deliberately ignored - it stays
// 'open' for Rafferty/Cougar even when @status is 'Closed'.
export default {
  selector: 'lifts lift',
  parse: {
    name: { attribute: 'name' },
    status: { attribute: 'status' }
  }
};
