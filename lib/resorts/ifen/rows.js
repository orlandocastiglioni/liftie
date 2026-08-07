import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

/**
 * Oberstdorf Kleinwalsertal Bergbahnen publish ONE server-rendered status page
 * for all six of their mountains, /skigebiete/status-anlagen-pisten-wege/, and
 * every lift and piste row on it carries its sector as a data-berg attribute:
 * fellhorn | nebelhorn | soellereck | ifen | walmendingerhorn | heuberg. That
 * attribute is the only thing separating the sectors - the ?berg= query param
 * on the operator's own filter links is ignored server-side (?berg=fellhorn
 * still returns all six areas), the filtering is jQuery on the client - so each
 * liftie sub-resort points at the same URL and selects its own rows here.
 *
 * Filtering on the TAG rather than on a hand-written list of lift names is what
 * makes that safe: a lift the operator adds next season arrives on its own.
 *
 * Strict equality is correct on #lifte and #pisten. Two non-sector values of
 * data-berg do exist on the page - "all" (piste-map thumbnails) and the
 * comma-joined "walmendingerhorn,heuberg" (three mountain restaurants) - but
 * never on a lift or a piste, so no comma-splitting is needed here.
 */
export const berg = 'ifen';

/**
 * STATUS. Nothing on this page speaks a vocabulary coerce.js knows except the
 * single word 'geschlossen'; left alone, every open lift and piste would
 * publish as 'scheduled'. The two legends, verbatim:
 *
 *   #lifte   offen.svg 'in Betrieb'  teilweise.svg 'in Vorbereitung'  zu.svg 'geschlossen'
 *   #pisten  offen.svg 'geöffnet'    teilweise.svg 'in Vorbereitung'  zu.svg 'geschlossen'
 *
 * with one wrinkle the legend does not admit: the lift ROWS say 'außer Betrieb'
 * where the lift legend says 'geschlossen'. Both mean closed, so both are here.
 */
const words = {
  'in betrieb': 'open',
  'außer betrieb': 'closed',
  geöffnet: 'open',
  geschlossen: 'closed',
  'in vorbereitung': 'scheduled'
};

/**
 * The icon filename is the same signal in every box on the page and it survives
 * a relabel, so it backs the word up. It is also the only usable signal on the
 * rows the CMS mislabels: the 'no information' icon renders with a raw record
 * id as its label, title="5161" alt="5161". noinfo is deliberately absent from
 * this map - such a row should fall through to liftie's own unknown-status
 * default rather than have this parser assert a state the operator never
 * published. (Today it only ever appears on hiking ways, which we do not read.)
 */
const icons = {
  offen: 'open',
  zu: 'closed',
  teilweise: 'scheduled'
};

export function status(node) {
  const img = select(node, 'span.status img')[0];
  if (!img) {
    return;
  }
  const word = img.attribs.title?.trim().toLowerCase();
  return words[word] ?? icons[img.attribs.src?.match(/\/(\w+)\.svg(?:$|[?#])/)?.[1]];
}

export function name(node) {
  return findText(select(node, 'span.name')[0])?.trim();
}

/**
 * reportedAt. The page stamps itself - 'Live-Status: 10.02.2026 09:54:44' - in
 * the headline of every sector's infotext, and repeats the same stamp in the
 * 'Gesamtskigebiet' block. Worth publishing because the piste board is never
 * emptied: in August all 98 pistes are still listed and all read 'geschlossen',
 * which is byte-for-byte what a board frozen at closing day would look like.
 * Prefer this sector's own block, fall back to the whole-area one.
 */
const re = /(\d{2})\.(\d{2})\.(\d{4})\D+(\d{1,2}):(\d{2}):(\d{2})/;

export function reportedAt(dom) {
  const box =
    select(dom, `.infotexte .infotext.${berg} .prognose .text`)[0] ??
    select(dom, '.infotexte .infotext.gesamt .prognose .text')[0];
  const m = box && findText(box)?.match(re);
  if (!m) {
    return;
  }
  const [, day, month, year, hour, minute, second] = m;
  // The stamp carries no offset - it is the operator's wall clock. Resolve it
  // against Europe/Vienna (Kleinwalsertal is Austrian, Oberstdorf German, one
  // zone either way) instead of against whatever zone the liftie host runs in,
  // and let the zone database decide CET vs CEST. Same trick as
  // lib/resorts/kaunertaler-gletscher/reported-at.js: read the naive stamp as
  // UTC, ask what wall clock Vienna shows at that instant, subtract the gap.
  const asUtc = new Date(`${year}-${month}-${day}T${hour.padStart(2, '0')}:${minute}:${second}Z`);
  if (Number.isNaN(asUtc.getTime())) {
    return;
  }
  const wall = new Date(`${asUtc.toLocaleString('sv-SE', { timeZone: 'Europe/Vienna' }).replace(' ', 'T')}Z`);
  return new Date(2 * asUtc.getTime() - wall.getTime()).toISOString();
}
