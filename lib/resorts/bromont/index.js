import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { clean, dated, deepText, winter, word } from './report.js';

/**
 * #recap-remontes: eleven lifts, each a div.liste.remonte with span.nom, the
 * scheduled day (span.jour) and evening (span.soir) availability, and
 * div.statut - the "In real time" state. The real-time state is the lift's
 * status; the day/evening columns are the plan for the day (a lift planned
 * "Open" reads "In real time: Closed" before the mountain opens, which is
 * exactly what liftie should show at 6 a.m.). Only when the real-time cell is
 * empty does the day column stand in.
 */
export default function parse(dom) {
  const lifts = {};
  if (!winter(dom)) {
    return lifts;
  }
  for (const row of select(dom, '#recap-remontes .liste.remonte')) {
    const name = clean(deepText(select(row, '.nom')));
    if (!name) {
      continue;
    }
    const live = select(row, '.statut')[0];
    // drop the mobile-only "In real time" label before reading the state
    const state = live && clean(deepText(live.children.filter(c => !c.attribs?.class?.includes('statut_titre'))));
    lifts[name] = coerce(state || word(select(row, '.jour')) || 'closed');
  }
  return dated(lifts, dom);
}
