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
// La Chapelle d'Abondance's page carries its own two sectors, 'Braitaz' and
// 'Cret-beni', and nothing else, so no sector is filtered out by area. (The
// reverse is not true: those two cards were also being printed on Châtel's
// page in the 2025-12 snapshot, which is why Châtel's copy of this file drops
// them there.)
//
// 'Liaisons' rows are inter-station link routes - neither a lift nor a piste -
// and several are printed on two neighbouring stations' pages ('Liaisons
// chapelle ab' appears here and on Torgon's page), so they are dropped. The
// sub-header is the only discriminator present on every row: lifts and
// liaisons carry no data-color and no grade span, and the wicon-* class is
// reused across types.
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
// 'Navette crÊt-beni', 'DÉbutant', 'FoliÈre'. Lower-case a non-ASCII capital
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
