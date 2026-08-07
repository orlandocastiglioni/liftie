import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// The Portes du Soleil network site publishes one server-rendered page per
// station, all 12 sharing the same WordPress "woody-addon-snowflake" markup -
// there is no per-row area tag anywhere, the URL slug alone says which station
// you are looking at. Each div.snowflake-sector-single is a named sector card
// (span.sector-name) holding one div.info-content.piste-wrapper per row type,
// opened by div.sector-sub-header > span.title reading exactly
// 'Pistes' | 'Remontées mécaniques' | 'Liaisons'.
//
// Châtel is the biggest page on the network: today 4 ski sectors (Super
// chatel, Linga, Barbossine, Pré la joux) plus 'Activités annexes'.
//
// ...but the sector list is editorially configured and DOES change. The
// 2025-12-22 snapshot carried 8 cards, because Châtel's page then also
// published 'Cret-beni' and 'Braitaz' - which are La Chapelle d'Abondance's
// own two sectors, printed identically on its own page - and a whole 'Torgon'
// card, likewise Torgon's own. Both are separate liftie resorts, so left alone
// Châtel would publish 14 lifts and 34 pistes that belong to its neighbours.
//
// Filter those out by sector name (a heading the operator maintains), and do
// it as a DENY list of the neighbours rather than an allow list of Châtel's
// own sectors: Châtel's cards are named after local hills, not after the
// station, so an allow list would silently drop the whole of a sector the
// moment the operator renames or adds one. A deny list only ever drops rows
// that are already published under their real station.
const FOREIGN_SECTORS = /^(cret-beni|braitaz|torgon)$/;

// 'Liaisons' rows are inter-station link routes - neither a lift nor a piste -
// and several are printed on two neighbouring stations' pages (the same six
// 'Liaison portes du soleil' rows appear on Châtel's page and Torgon's), so
// they are dropped. The sub-header is the only discriminator present on every
// row: lifts and liaisons carry no data-color and no grade span, and the
// wicon-* class is reused across types.
function kindOf(title = '') {
  if (/^remont/i.test(title)) {
    return 'lifts';
  }
  if (/^piste/i.test(title)) {
    return 'trails';
  }
}

function normalize(str = '') {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

// The CMS lower-cases an all-caps source and then ucfirst()s it without
// multibyte awareness, so accented letters survive in upper case mid-word:
// 'Tc super-chÂtel', 'PrÉ la joux inferieure', 'Tsd chaux des rosÉes'.
// Lower-case a non-ASCII capital that follows a letter; ASCII capitals are
// left alone so a genuine mid-name initial is never touched.
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
    if (FOREIGN_SECTORS.test(normalize(findText(select(card, '.sector-name')[0])))) {
      continue;
    }
    for (const block of select(card, '.info-content.piste-wrapper')) {
      if (kindOf(findText(select(block, '.sector-sub-header .title')[0])) !== kind) {
        continue;
      }
      for (const node of select(block, 'ul.sector-content > li.item')) {
        const name = findText(select(node, 'span.title')[0])?.trim();
        const statusNode = select(node, 'span.status')[0];
        if (!name || !statusNode) {
          continue;
        }
        // status is published twice, as visible French text and as a CSS
        // class. coerce knows 'Ouverte' -> open, 'Fermée' -> closed and
        // 'en préparation' -> scheduled, so the text is preferred; the class
        // (open | closed | prepare, all three also known to coerce) is the
        // fallback for the odd row with an empty label.
        const status = findText(statusNode)?.trim() || statusNode.attribs.class?.replace(/\bstatus\b/, '');
        result.push({ node, name: fixCase(name), status });
      }
    }
  }
  return result;
}
