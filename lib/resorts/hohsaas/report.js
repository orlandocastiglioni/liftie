import { parseDocument } from 'htmlparser2';
import select from '../../select.js';
import { allText, findText } from '../../tools/domutil.js';

/**
 * Bergbahnen Hohsaas publishes its board through Saastal Tourismus' infosnow
 * portal (APG|SGA), whose smallest unit is the village pair "Saas-Grund &
 * Saas-Balen" - so the roster carries the seven Hohsaas mountain lifts plus the
 * two village tows, exactly as the operator's own page presents it. Sibling
 * areas Saas-Fee (e=252), Saas-Almagell (254) and Saas-Balen (609) are separate
 * infosnow entries and are NOT in here.
 *
 * saison=1 pins the winter configuration, which the portal keeps serving all
 * year (in August it simply reports the ski half closed). That is why this is
 * the source rather than the prettier www.saas-fee.ch page: saas-fee.ch drops
 * the Pisten card entirely in summer, and even in winter it prints the identical
 * "Skipiste / slope" icon on every run, i.e. it publishes no difficulty at all.
 * infosnow is the only feed that carries the grade, and one request serves both
 * lifts and pistes.
 *
 * TRANSPORT. The endpoint answers with an XML envelope whose only payload is a
 * <script> CDATA block that assembles the report HTML by string concatenation:
 *
 *   var sb=[];sb[sb.length]='<div class="dlgReport">';sb[sb.length]=...
 *
 * htmlparser2 hands script contents through as one raw text node (correctly -
 * entities are not decoded inside <script>), so the chunks have to be joined,
 * un-escaped and re-parsed before anything can be selected.
 */
const CHUNK = /sb\[sb\.length\]\s*=\s*'((?:[^'\\]|\\.)*)'/g;

export function report(dom) {
  const js = findText(select(dom, 'script')[0]) ?? '';
  // PHP addslashes: only the apostrophe is escaped, quotes are left bare
  const html = [...js.matchAll(CHUNK)].map(m => m[1].replace(/\\'/g, "'")).join('');
  return parseDocument(html, { decodeEntities: true, lowerCaseTags: true, lowerCaseAttributeNames: false }).children;
}

/**
 * Sections are keyed by infosnow's own category id, appended to the area id
 * from the query string: #isCBox206_1 is Anlagen (lifts), _2 Pisten, _5
 * Funparks, _6 Langlauf and so on. Reading the id rather than the German
 * heading keeps the two parsers off the display language.
 */
export function rows(doc, category) {
  return select(doc, `#isCBox206_${category} .isRec`);
}

/**
 * STATUS is the state icon, never a word. /pub/pics/state/3/N.svg, per the
 * legend in div.isF:
 *   1 offen | 2 in Vorbereitung | 3 geschlossen | 0 keine Meldung
 * The alt text would be a trap: coerce.js knows 'geschlossen' but NOT 'offen',
 * so every open lift would publish as 'scheduled'; 'in Vorbereitung' and
 * 'ausser Betrieb' (which the platform uses on restaurant rows) are unknown to
 * it too. 0 means the resort has filed nothing for that row - liftie's neutral
 * unknown, never a 'closed' claim we would be inventing.
 */
const states = {
  1: 'open',
  2: 'scheduled',
  3: 'closed',
  0: 'scheduled'
};

export function status(row) {
  const src = select(row, 'img.isIco[src*="/pub/pics/state/"]')[0]?.attribs.src;
  return states[src?.match(/\/state\/\d+\/(\d+)\.svg/)?.[1]];
}

/** the row's type icon title: 'Gondelbahn - 8 Personen', 'Skipiste - rot' */
export function type(row) {
  return select(row, 'img.isIco[src*="/pub/pics/svg/color/"]')[0]?.attribs.title;
}

/**
 * div.isTxt is '<number> • <name> <span>(2.5 km)</span>' followed by optional
 * attribute icons (beschneit, beleuchtet, Bemerkungen), and on a couple of
 * lifts the name is wrapped in an <a> to the operator's site. Take the direct
 * text and any anchor text - which leaves the length span and the icons out -
 * and fold the bullet separator into a space, so piste 1 reads '1 Gletscher
 * rot' the way the resort numbers it on the map.
 */
export function name(row) {
  const txt = select(row, '.isTxt')[0];
  return (txt?.children ?? [])
    .filter(c => c.type === 'text' || c.name === 'a')
    .map(c => (c.type === 'text' ? c.data : allText(c)))
    .join('')
    .replace(/\s*•\s*/, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * The report dates itself in its own header - 'Status (07.08.2026 05:16 Uhr)'.
 * Worth publishing: saison=1 means the winter roster is served in August too,
 * all closed, which is indistinguishable from a genuinely current all-closed
 * morning without the date.
 */
const STAMP = /(\d{2})\.(\d{2})\.(\d{4})\s+(\d{1,2}):(\d{2})/;

export function reportedAt(doc) {
  const m = findText(select(doc, '.dlgLinkTit')[0])?.match(STAMP);
  if (!m) {
    return;
  }
  const [, day, month, year, hour, minute] = m;
  // Wall clock with no offset; Saas-Grund is Europe/Zurich, CET in season and
  // CEST over the summer the board is also stamped in. Same trick as
  // lib/resorts/steinplatte/reported-at.js: read the naive stamp as UTC, ask
  // what wall clock Zurich shows at that instant, subtract the difference.
  const asUtc = new Date(`${year}-${month}-${day}T${hour.padStart(2, '0')}:${minute}:00Z`);
  if (Number.isNaN(asUtc.getTime())) {
    return;
  }
  const wall = new Date(`${asUtc.toLocaleString('sv-SE', { timeZone: 'Europe/Zurich' }).replace(' ', 'T')}Z`);
  return new Date(2 * asUtc.getTime() - wall.getTime()).toISOString();
}
