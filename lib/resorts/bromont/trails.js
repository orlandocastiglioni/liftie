import select from '../../select.js';
import { clean, dated, deepText, winter, word } from './report.js';

/**
 * #recap-pistes (96 alpine trails) and #recap-pistes-ssbois (29 glades), each
 * grouped by mountainside (div.bloc_versant). A row is div.liste with
 * span.numero, span.nom, span.jour and span.soir. The day and evening cells say
 * whether the trail is open for that part of the day ('-' when it is never
 * offered then); a trail open for either is open.
 *
 * The trail number is kept in the name because names repeat on the board -
 * "Max Parrot" is both 12 and 21.
 *
 * LEVEL is the first icon in span.legende, on the Quebec scale: ico-facile
 * (easy, green circle), ico-intermed (difficult, blue square), ico-difficile
 * (very difficult, black diamond), ico-tdifficile (extreme, double black).
 * ico-sousbois only marks a glade and carries no grade of its own. The
 * SnowPrks block repeats rows already listed under their mountainside, so it
 * is not read.
 */
const LEVELS = {
  'ico-facile': 'green',
  'ico-intermed': 'blue',
  'ico-difficile': 'black',
  'ico-tdifficile': 'doubleBlack'
};
const GRADES = {
  'ico-facile': 'easy',
  'ico-intermed': 'difficult',
  'ico-difficile': 'very difficult',
  'ico-tdifficile': 'extreme'
};

function status(row) {
  const day = word(select(row, '.jour'));
  const night = word(select(row, '.soir'));
  if (day === 'open' || night === 'open') {
    return 'open';
  }
  return day ?? night ?? 'closed';
}

export default function trails(dom) {
  if (!winter(dom)) {
    return [];
  }
  const rows = select(dom, '#recap-pistes .liste, #recap-pistes-ssbois .liste').flatMap(row => {
    const name = clean(deepText(select(row, '.nom')));
    if (!name) {
      return [];
    }
    const number = clean(deepText(select(row, '.numero')));
    const icon = select(row, '.legende i')
      .map(i => i.attribs.class)
      .find(c => c in LEVELS);
    return [
      {
        name: number ? `${number} ${name}` : name,
        status: status(row),
        level: LEVELS[icon],
        grade: GRADES[icon]
      }
    ];
  });
  return dated(rows, dom);
}
