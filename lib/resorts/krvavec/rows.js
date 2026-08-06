/**
 * www.rtc-krvavec.si is a static Bootstrap site: every value on /krvavec-live
 * (and the English /krvavec-live-en, which loads the very same Slovenian file)
 * is injected client side by /assets/js/dataLoad.js, which fetches
 * /krvavec-data.json and assigns each entry's values[i] as innerHTML to
 * document.querySelectorAll(entry.selector)[i]. The JSON IS the report - the
 * shipped HTML is a set of empty `tr.d-none` placeholders - and reading it
 * directly is strictly better coverage than the browser, which silently drops
 * any value that has no placeholder row left for it.
 *
 * Shape: a top level array of {selector, values} objects. Sections are located
 * by their selector STRING, never by array index.
 */

// faq-item 1 is ŽIČNICE (lifts), 2 is PROGE (runs); -first holds the names,
// -third:not(.th-right) the status cells, as two positionally parallel arrays.
const offer = n => `#progeinnaprave .faq-container .faq-item:nth-of-type(${n}) .list-offer .list-offer-`;

// '30. nov 2025, 12:01' - see reported-at.js for why it matters here
export const STAMP = '.live-header-note i span';

export function values(data, selector) {
  const entry = Array.isArray(data) ? data.find(e => e?.selector === selector) : undefined;
  return Array.isArray(entry?.values) ? entry.values : [];
}

// the name cell leads with a badge - `<span class="white-circle"><p>A</p></span>`
// for a lift's map code, `<span class="red-circle"><p>1</p></span>` for a run's
// map number - and the badge, not any text, is where a run's difficulty lives
const BADGE = /<span class="([a-z]+)-circle">.*?<\/span>/;

function text(html = '') {
  return html
    .replace(BADGE, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function badge(html = '') {
  return html.match(BADGE)?.[1];
}

// OPEN IS NOT A WORD HERE. An open cell carries the operating hours
// ('08:00-17:00') or a bare '-'; only a closed cell says anything ('Zaprto').
// Neither the hours nor the Slovenian words are in lib/tools/coerce.js, so a
// text-only parser reports every open lift as 'scheduled'. The reliable token
// is the icon filename, and only two exist in the whole file (open.png,
// close.png). The words are kept as a fallback in case a third icon ever
// appears; the raw text falls through to coerce, which is where '-' and the
// hour ranges belong (unknown -> scheduled).
const words = {
  zaprto: 'closed',
  odprto: 'open'
};

export function status(html = '') {
  if (/open\.png/.test(html)) {
    return 'open';
  }
  if (/close\.png/.test(html)) {
    return 'closed';
  }
  const t = text(html).toLowerCase();
  return words[t] ?? t;
}

/**
 * zip one section's two parallel arrays into rows. A name whose status the
 * status array never reaches is dropped rather than published as 'scheduled':
 * the arrays are written by the same CMS pass and going out of sync would mean
 * the pairing is no longer trustworthy.
 */
export default function rows(data, section) {
  const names = values(data, `${offer(section)}first`);
  const statuses = values(data, `${offer(section)}third:not(.th-right)`);
  const list = [];
  for (const [i, html] of names.entries()) {
    const name = text(html);
    if (name && statuses[i] !== undefined) {
      list.push({ name, level: badge(html), status: status(statuses[i]) });
    }
  }
  return list;
}
