import { parseDocument } from 'htmlparser2';
import select from '../select.js';
import { allText, findText } from './domutil.js';

/**
 * Shared reader for the infosnow.ch (APG|SGA) "portal" report:
 *
 *   https://infosnow.ch/portal/?type=ajax-raw&tab=map-1/dlg-sys&lang=de&e=<area>&saison=1
 *
 * the same report lib/resorts/hohsaas and lib/resorts/leukerbad-torrent read,
 * pulled out so a new Swiss area is a descriptor plus a category list. Many
 * Swiss operators embed exactly this report on their own "Betriebsinfo" /
 * "winter sports report" page (Engstligenalp e=62, Pizol e=47).
 *
 * saison=1 pins the winter configuration, which the portal serves all year (in
 * summer it reports the ski half closed), and the report dates itself in its
 * header, so `reportedAt` is what tells a current all-closed morning from a
 * frozen board.
 *
 * TRANSPORT. The answer is an XML envelope whose only payload is a <script>
 * CDATA block that builds the report HTML by string concatenation
 * (`sb[sb.length]='<div …>'`). htmlparser2 hands script contents through as raw
 * text, so the chunks are joined, un-escaped and re-parsed as their own
 * document.
 */
const CHUNK = /sb\[sb\.length\]\s*=\s*'((?:[^'\\]|\\.)*)'/g;

export function report(dom) {
  const js = select(dom, 'script').map(findText).join('');
  // PHP addslashes: only the apostrophe (and the backslash) is escaped
  const html = [...js.matchAll(CHUNK)].map(m => m[1].replace(/\\(.)/g, '$1')).join('');
  return parseDocument(html, { decodeEntities: true, lowerCaseTags: true, lowerCaseAttributeNames: false }).children;
}

/**
 * Sections are keyed by infosnow's own category id appended to the area id:
 * #isCBox<area>_1 is Anlagen (lifts), _2 Pisten, _3 Schlittelwege, _4
 * Winterwanderwege, _5 Funparks, _7 Langlauf and so on. Reading the id rather
 * than the heading keeps parsers off the display language. The area id is
 * matched as any number, since one fetch carries exactly one area.
 */
export function rows(doc, category) {
  const suffix = `_${category}`;
  return select(doc, '.isCBox')
    .filter(box => /^isCBox\d+_\d+$/.test(box.attribs.id ?? '') && box.attribs.id.endsWith(suffix))
    .flatMap(box => select(box, '.isRec'));
}

/**
 * STATUS is the state icon number, never the word: /pub/pics/state/3/N.svg,
 * per the legend in div.isF: 1 offen | 2 in Vorbereitung | 3 geschlossen |
 * 0 keine Meldung. coerce.js does not know 'offen', so reading the alt text
 * would publish every open lift as 'scheduled'. 0 means the resort filed
 * nothing for that row - liftie's neutral unknown, never an invented 'closed'.
 */
const states = {
  1: 'open',
  2: 'scheduled',
  3: 'closed',
  0: 'scheduled'
};

export function status(row) {
  const src = select(row, 'img.isIco[src*="/pics/state/"]')[0]?.attribs.src;
  return states[src?.match(/\/state\/\d+\/(\d+)\.svg/)?.[1]];
}

/** the row's type icon title: 'Sesselbahn - 4 Personen', 'Skipiste - rot' */
export function type(row) {
  return select(row, 'img.isIco[src*="/pics/svg/color/"]')[0]?.attribs.title;
}

/**
 * div.isTxt is '<number> • <name> <span>(2.5 km)</span>' plus optional
 * attribute icons; take the direct text and any anchor text, which leaves the
 * length span and the icons out, and fold the bullet into a space so the map
 * label that keeps names unique survives ('1 Gletscher').
 */
export function name(row) {
  const txt = select(row, '.isTxt')[0];
  return (txt?.children ?? [])
    .filter(c => c.type === 'text' || c.name === 'a')
    .map(c => (c.type === 'text' ? c.data : allText(c)))
    .join('')
    .replace(/\s*•\s*/, ' ')
    .replace(/\s*\(\s*[\d.,]+\s*km\s*\)\s*$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Swiss three-tier piste colours, mapped one step down so the tiers stay
 * distinct and ordered, the reading lib/resorts/hohsaas documents: blau ->
 * blue, rot -> black, schwarz -> doubleBlack. gelb is the yellow ski ROUTE
 * (marked, not groomed or patrolled): no level, grade only.
 */
const levels = {
  blau: 'blue',
  rot: 'black',
  schwarz: 'doubleBlack'
};

export function piste(row) {
  const grade = type(row)?.split(' - ')[1]?.trim();
  return {
    name: name(row),
    status: status(row),
    level: levels[grade?.toLowerCase()],
    grade
  };
}

/**
 * The header stamp - 'Status (17.11.2026 17:45 Uhr)' - is Europe/Zurich wall
 * clock with no offset: read it as UTC, ask what Zurich shows at that instant,
 * and subtract the difference.
 */
const STAMP = /(\d{2})\.(\d{2})\.(\d{4})\s+(\d{1,2}):(\d{2})/;

export function reportedAt(doc) {
  const m = findText(select(doc, '.dlgLinkTit')[0])?.match(STAMP);
  if (!m) {
    return;
  }
  const [, day, month, year, hour, minute] = m;
  const asUtc = new Date(`${year}-${month}-${day}T${hour.padStart(2, '0')}:${minute}:00Z`);
  if (Number.isNaN(asUtc.getTime())) {
    return;
  }
  const wall = new Date(`${asUtc.toLocaleString('sv-SE', { timeZone: 'Europe/Zurich' }).replace(' ', 'T')}Z`);
  return new Date(2 * asUtc.getTime() - wall.getTime()).toISOString();
}

/** non-enumerable, so lib/lifts/stats.js does not count it as a lift */
export function dated(result, doc) {
  const at = reportedAt(doc);
  if (at) {
    Object.defineProperty(result, 'reportedAt', { value: at });
  }
  return result;
}

/** lifts of one or more categories as liftie's { name: status } map */
export function lifts(doc, categories = [1]) {
  const ls = {};
  for (const category of categories) {
    for (const row of rows(doc, category)) {
      const n = name(row);
      if (n) {
        ls[n] = status(row) ?? 'scheduled';
      }
    }
  }
  return dated(ls, doc);
}

/** pistes of one or more categories as trail rows */
export function trails(doc, categories = [2]) {
  return dated(
    categories.flatMap(category => rows(doc, category).map(piste)),
    doc
  );
}
