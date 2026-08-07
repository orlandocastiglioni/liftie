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
// Morzine gives each of its three ski sectors - Nyon, Pleney, Chamossiere - one
// card carrying both a 'Pistes' and a 'Remontées mécaniques' block, and hangs a
// single 'Liaisons' block ('Pleney - les gets') off the Pleney card. That
// liaison is an inter-station link route, neither a lift nor a piste, and it is
// printed on Les Gets' page as well, so it is dropped.
//
// The page IS the area: the network has no per-row area tag anywhere, station
// identity is the URL slug alone, so every sector on this page belongs to this
// station and nothing is filtered out by area. Note the converse - Morzine's
// Super Morzine gondola and its pistes are NOT here; the operator files that
// sector on the Avoriaz page.
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
