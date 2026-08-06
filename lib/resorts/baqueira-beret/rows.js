import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// /estado-pistas is the winter board and stays up year round (the summer
// bike/hiking page lives at /estado-pistas-verano and has no Spotlio blocks at
// all). Every row is a Drupal/Spotlio <li class="spolio-block"> that encodes
// its whole state in its own `data-class` attribute:
//   remontes: "<lift type> <status>"           e.g. "gondola close"
//   pistas:   "<grade> <status> <grooming>"    e.g. "pista-roja open groomed"
//
// Read data-class rather than the .item-status icons. Lift rows carry one
// <i class="icon-spotlio icon-status">, but pista rows carry TWO - the first is
// open/closed and the second is grooming - so any "last icon wins" selector
// publishes GROOMING as the trail status. data-class has no such ambiguity, and
// the grooming token (3rd) is simply never read here.
//
// The section ids repeat once per sector (the all-sectors page has four
// #remontes-section and four #pistas-section containers - invalid HTML, but
// css-select matches them all and one pass gets the whole mountain). Hence the
// [id=...] attribute form rather than #id.
export default function rows(dom, section) {
  return select(dom, `[id=${section}] li.spolio-block`)
    .map(node => {
      const name = findText(select(node, '.item-name span')[0])?.trim();
      const [kind, status] = (node.attribs['data-class'] ?? '').trim().split(/\s+/);
      if (name && status) {
        return { node, name, kind, status };
      }
    })
    .filter(Boolean);
}
