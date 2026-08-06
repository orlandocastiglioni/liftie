/**
 * White Pine Touring Nordic (Park City Golf Club, UT) - the XC track run by
 * Jans. No lift-served terrain at all, hence "no": { "lifts": true }.
 *
 * The conditions page (cross-country-track-conditions-park-city.php) only
 * embeds <iframe src="https://trailhub.org/ts/RvQi14VbCTv36ilhWhhw/hybrid/embed">.
 * trailhub.org is a Vue SPA whose html is an empty 3.5 KB shell - neither the
 * flaresolverr nor the renderd tier can render it (both time out waiting for
 * the Firebase WebChannel to populate .trail-item), so we go straight to the
 * public-read Firestore behind it. Config comes from trailhub's own bundle
 * (js/app.*.js): project trail-hub, collection "trails", filtered on
 * trailSystemId exactly like the app does.
 *
 * The response is the runQuery array of { document: { fields } } envelopes in
 * arbitrary order, so we sort on the operator's own "order" field to match the
 * order trailhub renders.
 *
 * Statuses are trailhub's fixed { Open, Caution, Closed } set, all known to
 * coerce(). Difficulties are its { circle, square, diamond, doubleDiamond }
 * enum, none of which normalizeLevel() knows, so they are translated here.
 */
const levels = {
  circle: 'green',
  square: 'blue',
  diamond: 'black',
  doubleDiamond: 'doubleBlack'
};

export default function parse(body) {
  return (body ?? [])
    .map(entry => entry?.document)
    .filter(doc => doc?.fields && !doc.fields.hidden?.booleanValue)
    .sort((a, b) => order(a) - order(b))
    .map(({ fields }) => ({
      name: fields.name?.stringValue,
      status: fields.status?.stringValue,
      level: levels[fields.difficulty?.stringValue]
    }));
}

// "order" is written as an integer by the current trailhub build, but older
// documents in the same collection carry it as a string
function order({ fields }) {
  return Number(fields.order?.integerValue ?? fields.order?.stringValue ?? 0);
}
