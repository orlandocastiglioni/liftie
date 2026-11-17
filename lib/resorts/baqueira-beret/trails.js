import { fromZones, items } from './zones.js';

// Baqueira grades on five alpine levels against liftie's four. The sector feed
// names the grade in `subtype`:
//   Pista verde       MUY FÁCIL           -> green
//   Pista azul        FÁCIL               -> blue
//   Pista roja        DIFÍCIL             -> black       (no 'red' in liftie;
//                                                         same call as glencoe)
//   Pista negra       MUY DIFÍCIL         -> doubleBlack
//   Pista doble negra DIFICULTAD EXTREMA  -> doubleBlack
// Itinerario (unpatrolled routes) and esquí fondo (the Pla de Beret nordic
// loop) get no level. `grade` carries Baqueira's own word through untouched,
// with the same tokens the old HTML parser published.
const GRADES = [
  [/doble\s*negra/i, 'doubleBlack', 'doble-negra'],
  [/negra/i, 'doubleBlack', 'negra'],
  [/roja/i, 'black', 'roja'],
  [/azul/i, 'blue', 'azul'],
  [/verde/i, 'green', 'verde'],
  [/itinerario/i, undefined, 'itinerario'],
  [/fondo/i, undefined, 'esqui-fondo']
];

function grade(subtype = '') {
  return GRADES.find(([re]) => re.test(subtype)) ?? [];
}

// a piste split into segments is listed once per segment under one name
// (Parpalhòla three times on 2026-11-17, all open); collapse rows that are
// identical in every published field so it reads as one run
export function trailRows(zones) {
  const seen = new Set();
  const rows = [];
  for (const { name, status, subtype, zone } of items(zones, 'pistas')) {
    const [, level, word] = grade(subtype);
    const key = [zone, name, status, word].join('\u0000');
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    rows.push({ name, status, level, grade: word });
  }
  return rows;
}

export default fromZones(trailRows);
