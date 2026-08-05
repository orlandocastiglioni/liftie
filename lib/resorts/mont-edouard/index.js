import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

// Mont Édouard's lift status is a hand-edited Squarespace code block on
// /info-remontee: `div.lift-box-single` per lift, with the lift name in <h2>.
// Staff comment out the inactive `<p><strong>` status lines (htmlparser2 drops
// comment text), leaving exactly one active status per real lift. A third box
// whose <h2> reads "LÉGENDE / CHART" is the legend and is excluded.
//
// The status vocabulary is bilingual FR/EN and unknown to coerce, so it is
// mapped explicitly here:
//   Opération normale - Regular operation              -> open
//   Opération par moteur auxiliaire - ... secondary motor -> open
//   Arrêt temporaire - Temporary stop                  -> hold
//   Évacuation manuelle - Manual evacuation            -> closed
function liftStatus(text) {
  const t = text.toLowerCase();
  if (/[ée]vacuation/.test(t)) {
    return 'closed';
  }
  if (/arr[êe]t|temporaire|temporary stop/.test(t)) {
    return 'hold';
  }
  if (/normale|auxiliaire|moteur|secondary|regular operation/.test(t)) {
    return 'open';
  }
  return 'scheduled';
}

export default function parse(dom) {
  const lifts = {};
  for (const box of select(dom, '.lift-box-single')) {
    const name = allText(select(box, 'h2')[0] ?? box)
      .replace(/\s+/g, ' ')
      .trim();
    if (!name || /l[ée]gende|chart/i.test(name)) {
      continue;
    }
    const status = select(box, 'p strong')
      .map(s => allText(s).replace(/\s+/g, ' ').trim())
      .find(Boolean);
    if (status) {
      lifts[name] = liftStatus(status);
    }
  }
  return lifts;
}
