import { parseDocument } from 'htmlparser2';
import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

/**
 * www.torrent.ch refuses TLS on 443 and leukerbad.ch answers every content path
 * with a Cloudflare Turnstile 403 (FlareSolverr times out on it), so the source
 * is infosnow.ch - which is the feed leukerbad.ch embeds anyway, not a
 * third-party aggregator: the p=135 report's own "Webseiten" block links back to
 * www.torrent.ch. saison=1 serves the COMPLETE winter roster year-round, so the
 * board never empties out of season.
 *
 * THE RESPONSE IS NOT HTML. It is
 *   <?xml?><Envelope><Body><script><![CDATA[ var sb=[]; sb[sb.length]='<div…>'; … ]]>
 * i.e. javascript that concatenates an HTML string. htmlparser2 hands the whole
 * CDATA block back as the script element's raw text, so recover the fragment by
 * concatenating the string literals in order, undoing the JS escaping, and
 * parsing the result as its own document.
 *
 * This unwrap is the load-bearing part of the parser: if infosnow ever changes
 * the builder there will be no rows at all rather than wrong ones.
 */
export function report(dom) {
  const js = select(dom, 'script').map(allText).join('');
  const html = [...js.matchAll(/sb\[sb\.length\]='((?:\\.|[^'\\])*)';/g)]
    .map(m => m[1].replace(/\\(.)/g, '$1'))
    .join('');
  return parseDocument(html);
}

/**
 * STATUS. Do not read the German word - read the icon number. The state icon
 * /pub/pics/state/3/N.svg is the authoritative code, spelled out by the legend
 * at the foot of every report (div.isF div.isFTxt): 1 offen, 2 in Vorbereitung,
 * 3 geschlossen, 0 keine Meldung. The per-row alt text for the SAME code varies
 * by row - state 3 renders as 'ausser Betrieb' on lifts and pistes but
 * 'geschlossen' and 'Betriebsferien' on restaurants - and of those words only
 * 'geschlossen' is in coerce.js. 'offen' is NOT, so reading the word would
 * publish every open lift as 'scheduled'.
 *
 * 0 (keine Meldung) means the resort reported nothing for that line, which is
 * liftie's 'scheduled' no-information bucket; 2 (in Vorbereitung) is genuinely
 * scheduled-like. Cross-checked against lang=en, which renders 1 as 'open',
 * 2 as 'in preparation' and 3 as 'closed'/'out of service'/'Annual closing'.
 */
const states = {
  0: 'scheduled',
  1: 'open',
  2: 'scheduled',
  3: 'closed'
};

function clean(text) {
  return text.replace(/\s+/g, ' ').trim();
}

/**
 * Row anatomy is identical for lifts and every kind of run: a state icon, a
 * type/difficulty icon whose title is the resort's own word for the kind, and
 * div.isTxt holding '<number/letter> • <name>' plus the length. Two things to
 * strip: the length, which is a <span> on pistes but bare text on the
 * Winterwanderwege, and the bullet, which becomes a plain space so the map
 * label that makes each name unique is kept. The attribute icons that follow
 * (img.isIcoR - beschneit / beleuchtet / Talabfahrt) are elements, so allText,
 * which takes only the direct text children, drops them either way.
 */
const length = /\s*\(\s*[\d.,]+\s*km\s*\)\s*$/i;
function row(node) {
  let state;
  let alt;
  let kind;
  for (const img of select(node, 'img.isIco')) {
    const src = img.attribs.src ?? '';
    const code = src.match(/\/pics\/state\/\d+\/(\d)\.svg/)?.[1];
    if (code !== undefined) {
      state ??= code;
      alt ??= img.attribs.title || img.attribs.alt;
    } else if (src.includes('/pics/svg/color/')) {
      kind ??= img.attribs.title || img.attribs.alt;
    }
  }
  const label = select(node, 'div.isTxt')[0];
  return {
    name: clean(allText(label ?? {}))
      .replace(length, '')
      .replace(/\s*•\s*/, ' '),
    // an unknown icon number falls back to the German word so coerce logs it
    status: states[state] ?? alt,
    kind
  };
}

/**
 * Each report block is a div.isBreakBox headed by a div.isH1 whose text is
 * '<section> (<summary>)' - 'Anlagen (3/9 offen)', 'Pisten (geschlossen)'.
 * Titles are stable German because the fetch pins lang=de.
 */
export function rows(doc, titles) {
  const out = [];
  for (const box of select(doc, 'div.isBreakBox')) {
    const title = clean(allText(select(box, 'div.isH1')[0] ?? {}))
      .split('(')[0]
      .trim();
    if (!titles.includes(title)) {
      continue;
    }
    for (const node of select(box, 'div.isRec')) {
      const r = row(node);
      if (r.name) {
        out.push(r);
      }
    }
  }
  return out;
}

/**
 * infosnow dates the report itself: div.isD reads 'Letzte Änderung: 07.08.2026
 * 05:15 Uhr' (dd.mm.yyyy, resort-local). Ask Intl for the Europe/Zurich offset
 * in force rather than hardcoding CET or CEST.
 */
const ZONE = 'Europe/Zurich';
const stamp = /(\d{2})\.(\d{2})\.(\d{4})\s+(\d{1,2}):(\d{2})/;

function zoneOffset(instant) {
  const name = new Intl.DateTimeFormat('en-US', { timeZone: ZONE, timeZoneName: 'longOffset' })
    .formatToParts(instant)
    .find(part => part.type === 'timeZoneName')?.value;
  // 'GMT+02:00' -> '+02:00', plain 'GMT' -> '+00:00'
  return name?.slice(3) || '+00:00';
}

export function reportedAt(doc) {
  const m = allText(select(doc, 'div.isD')[0] ?? {}).match(stamp);
  if (!m) {
    return;
  }
  const [, day, month, year, hour, minute] = m;
  const naive = `${year}-${month}-${day}T${hour.padStart(2, '0')}:${minute}:00`;
  const date = new Date(`${naive}${zoneOffset(new Date(`${naive}Z`))}`);
  if (!Number.isNaN(date.getTime())) {
    return date.toISOString();
  }
}
