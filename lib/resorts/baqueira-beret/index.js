import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { findText } from '../../tools/domutil.js';
import rows from './rows.js';

// The status slot of data-class only ever holds `open` or `close`; coerce knows
// both (and 'cerrado' too, though this site never emits Spanish here), so the
// raw token goes straight through.

// 'CT Parc Infantil' is the name of a magic carpet in BOTH the Baqueira and the
// Beret sector - two distinct lifts. Lift status is keyed by name, so without a
// qualifier one of them silently disappears from a 36-lift mountain. On the
// all-sectors page each sector's blocks sit inside a .zone-container whose
// weather header names the sector ("Baqueira 1800", "Beret", "Bonaigua 2300",
// "Baciver"); take that, minus the altitude. Some seasons the site serves a
// per-sector tabbed layout instead, which has no .zone-container - and no
// collision either, since each tab holds one sector.
function sector(node) {
  for (let p = node; p; p = p.parent) {
    if (p.attribs?.class?.split(/\s+/).includes('zone-container')) {
      return findText(select(p, '.zone-container__temp h3')[0])
        ?.replace(/\s*\d+\s*$/, '')
        .trim();
    }
  }
}

export default function lifts(dom) {
  const list = rows(dom, 'remontes-section');
  const seen = {};
  for (const { name } of list) {
    seen[name] = (seen[name] ?? 0) + 1;
  }
  const ls = {};
  for (const { node, name, status } of list) {
    const zone = seen[name] > 1 && sector(node);
    ls[zone ? `${name} (${zone})` : name] = coerce(status);
  }
  return ls;
}
