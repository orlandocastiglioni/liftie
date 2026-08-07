import { status, title } from './index.js';
import reportedAt from './reported-at.js';

/**
 * GRADE. Every slope row carries its difficulty twice: as a numeric `type`
 * (2614 / 2615 / 2616) and spelled out in `subtitle` - 'slope (easy)' /
 * 'slope (medium)' / 'slope (difficult)' with lang=en, 'Skipiste (blau)' /
 * 'Skipiste (rot)' / 'Skipiste (schwarz)' with lang=de. The two are perfectly
 * parallel; the type code is preferred because it survives the language switch,
 * with the word as a fallback in either language.
 *
 * The grade is published as blue / red / black. That is the resort's own
 * vocabulary - it is what its eleven SKI plus CITY siblings print literally, as
 * <i class="fa fa-circle blue|red|black">, for the very same three Austrian
 * tiers this feed calls easy/medium/difficult in English and blau/rot/schwarz
 * in German. Publishing the colour keeps one scale across the whole pass
 * instead of a different word per area depending on which source each came off.
 *
 * LEVEL. Handing normalizeLevel the bare English adjectives would read this
 * mountain as green/blue/black, i.e. claim a beginner tier Austria does not
 * grade: there is no green here, blau IS the easiest. Map the three tiers one
 * step down so they stay distinct and correctly ordered - blue -> blue,
 * red -> black, black -> doubleBlack - matching lib/resorts/kaunertaler-gletscher
 * and the sibling lib/resorts/patscherkofel.
 */
const grades = {
  2614: 'blue',
  2615: 'red',
  2616: 'black'
};

const words = {
  easy: 'blue',
  blau: 'blue',
  medium: 'red',
  rot: 'red',
  difficult: 'black',
  schwarz: 'black'
};

const levels = {
  blue: 'blue',
  red: 'black',
  black: 'doubleBlack'
};

function grade(row) {
  return grades[row.type] ?? words[row.subtitle?.match(/\(([^)]+)\)/)?.[1]?.toLowerCase()];
}

/**
 * 10 pistes from `slopes`, then the ski route from `routes`.
 *
 * `routes` holds two rows and only one of them is skiable terrain: 'Skiroute
 * Glungezer' (subtitle 'Ski touring', type 720) is the ungroomed descent off
 * the summit and belongs on the trail board, while 'Panorama Rodelbahn
 * Zirbenwald' (subtitle 'Toboggan', type 709) is a sledding run, not a piste.
 * Filter on the type code rather than the name so the toboggan run cannot
 * sneak back in under a new title.
 */
const ROUTE_TOBOGGAN = 709;

export default function trails(body) {
  const rows = [...(body?.slopes ?? []), ...(body?.routes ?? []).filter(r => r.type !== ROUTE_TOBOGGAN)];
  const list = [];
  for (const row of rows) {
    const name = title(row);
    if (!name) {
      continue;
    }
    const g = grade(row);
    // status() already returns a liftie word; lib/trails/parse.js coerces
    // again, which is a no-op on open/closed/hold/scheduled
    list.push({ name, status: status(row), level: levels[g], grade: g });
  }
  const at = reportedAt(body?.lastUpdate);
  if (at) {
    // non-enumerable: metadata about the list, not one of its rows
    Object.defineProperty(list, 'reportedAt', { value: at });
  }
  return list;
}
