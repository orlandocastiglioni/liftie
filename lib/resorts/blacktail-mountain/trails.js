import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

/*
 * blacktailmountain.com/snow-report/ is a hand-maintained WordPress sidebar.
 * `#groomingSidebar` holds two `<h3>` + `<ul class="reports">` pairs: the first
 * ("Grooming Report") is aggregates only - "Percent of Terrain Open", "Number
 * of lifts in operation: 4" - and the second ("Groomed Runs") is the only
 * per-run data the site publishes:
 *
 *   <li><strong>Olympic: &nbsp;</strong>Cold Camp, Widow Maker, Easy Out</li>
 *
 * The <strong> is the servicing lift/pod label (free text - it has been renamed
 * over the years, "Handle Tow" -> "Magic Carpet" - so nothing is hardcoded) and
 * the run names are a comma separated text node after it. One <li> therefore
 * expands to N trails, which is why this is the function form of the descriptor
 * rather than { selector, parse }.
 *
 * PARTIAL BY DESIGN: Blacktail never publishes a full open/closed roster, only
 * the runs groomed today (~50-70% of its ~26 named runs). Every listed run is
 * by definition groomed and open, so the status is the literal 'Groomed', which
 * coerce.js maps to 'open'. Nothing here can ever yield 'closed', and out of
 * season the four lists are empty and this yields zero trails.
 *
 * No difficulty is published anywhere on the site, so no level is emitted.
 *
 * Lifts: none-available. The four lift names appear only as the labels above,
 * where the value is a grooming list, not a status - and 'lift open iff its
 * groomed list is non-empty' is disproved by mid-season captures that report
 * 4 lifts running while one pod's list is empty. Hence "no": {"lifts": true}.
 */
export default function parse(dom) {
  const nodes = select(dom, '#groomingSidebar h3, #groomingSidebar ul.reports');
  const i = nodes.findIndex(n => n.name === 'h3' && /groomed\s+runs/i.test(allText(n)));
  const list = i < 0 ? undefined : nodes.slice(i + 1).find(n => n.name === 'ul');
  if (!list) {
    return [];
  }
  const trails = [];
  for (const li of select(list, 'li')) {
    for (const name of allText(li).split(',')) {
      if (name.trim()) {
        trails.push({ name, status: 'Groomed' });
      }
    }
  }
  return trails;
}
