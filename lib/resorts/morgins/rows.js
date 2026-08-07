import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// Portes du Soleil publishes one server-rendered page per station, all sharing
// the same WordPress "snowflake" markup. Each div.snowflake-sector-single is a
// named sector (span.sector-name) holding one div.info-content.piste-wrapper
// per row type, opened by div.sector-sub-header > span.title reading exactly
// 'Pistes' | 'Remontées mécaniques' | 'Liaisons'. Some stations put all three
// types under one sector, others give each type its own sector, so the
// sub-header - not the sector name - is the discriminator. It is also the only
// one available: lifts and liaisons carry no data-color and no grade span, so
// nothing on the li itself distinguishes them (the wicon-* class is a hint but
// is reused across types - a snowpark and a piste can share one).
//
// Morgins splits the three types one per sector card - 'Pistes morgins',
// 'Remontees morgins', 'Liaisons morgins' - which is why the sub-header, not
// the card, has to be read. The 6 'Liaisons morgins' rows are inter-station
// link routes, not lifts and not pistes, and several are printed on a
// neighbouring station's page too (Chatel-morgins also appears on Chatel's),
// so they are dropped.
//
// The page IS the area: the network has no per-row area tag anywhere, station
// identity is the URL slug alone, so every sector on this page belongs to this
// station and nothing is filtered out by area.
function section(title = '') {
  const t = title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
  if (t.startsWith('piste')) {
    return 'trails';
  }
  if (t.startsWith('remont')) {
    return 'lifts';
  }
}

export default function rows(dom, kind) {
  const out = [];
  for (const wrapper of select(dom, '.piste-wrapper')) {
    if (section(findText(select(wrapper, '.sector-sub-header > .title')[0])) !== kind) {
      continue;
    }
    for (const node of select(wrapper, 'li.item')) {
      const name = findText(select(node, 'span.title')[0]);
      const statusNode = select(node, 'span.status')[0];
      if (!name || !statusNode) {
        continue;
      }
      // the status is published twice - as visible French text and as a CSS
      // class. coerce knows Ouverte, Fermée and en préparation, so the text is
      // preferred; the class (open|closed|prepare, all three also known to
      // coerce) is the fallback for the odd row with an empty label.
      const status = findText(statusNode)?.trim() || statusNode.attribs.class?.replace(/\bstatus\b/, '');
      out.push({ node, name: name.trim(), status });
    }
  }
  return out;
}
