import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// The Portes du Soleil network site publishes one WordPress "woody-addon-
// snowflake" card per named sector, and the whole 12-station network shares
// this markup - only the URL slug says which station you are looking at.
//
// Torgon's page carries three cards: its own 'Torgon' sector plus two
// inter-station link cards, 'Liaisons chapelle ab' and 'Liaison portes du
// soleil', which belong to La Chapelle d'Abondance and Chatel and are
// published on their pages too. Of the 23 rows on the page only 15 are
// Torgon's. Filter on the sector name rather than on a hand-written list of
// lift names, so a lift the operator adds tomorrow still shows up.
const AREA = /torgon/i;

// Inside a card each div.info-content.piste-wrapper is opened by a sub-header
// whose title is exactly 'Pistes' | 'Remontées mécaniques' | 'Liaisons'. Only
// pistes carry data-color and only lifts carry a lift icon, so that header is
// the one discriminator present on every row. 'Liaisons' are inter-station
// link routes - neither a lift nor a trail - and are dropped; note the Torgon
// card has a Liaisons block of its own, so the sector filter alone is not
// enough.
function kindOf(title = '') {
  if (/^remont/i.test(title)) {
    return 'lifts';
  }
  if (/^piste/i.test(title)) {
    return 'trails';
  }
}

// The CMS lower-cases an all-caps source and then ucfirst()s it without
// multibyte awareness, so accented letters survive in upper case mid-word:
// 'Tk djeu des tÊtes', 'Navette crÊt-beni'. Lower-case a non-ASCII capital
// that follows a letter; ASCII capitals are left alone so a genuine mid-name
// initial is never touched.
function fixCase(name) {
  return name.replace(/(?<=\p{L})\p{Lu}/gu, c => (c.codePointAt(0) < 128 ? c : c.toLowerCase()));
}

/**
 * every row of the given kind ('lifts' | 'trails') belonging to this station,
 * in page order, as { node, name, status } - node is the <li> so a caller can
 * read the piste-only attributes off it
 */
export default function rows(dom, kind) {
  const result = [];
  for (const card of select(dom, '.snowflake-sector-single')) {
    const sector = findText(select(card, '.sector-name')[0]);
    if (!AREA.test(sector ?? '')) {
      continue;
    }
    for (const block of select(card, '.info-content.piste-wrapper')) {
      if (kindOf(findText(select(block, '.sector-sub-header .title')[0])) !== kind) {
        continue;
      }
      for (const node of select(block, 'ul.sector-content > li.item')) {
        const name = findText(select(node, 'span.title')[0])?.trim();
        const status = findText(select(node, 'span.status')[0])?.trim();
        if (name && status) {
          result.push({ node, name: fixCase(name), status });
        }
      }
    }
  }
  return result;
}
