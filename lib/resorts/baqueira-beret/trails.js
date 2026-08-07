import rows from './rows.js';

// Baqueira publishes FIVE alpine grades against liftie's four levels, and none
// of its Spanish class tokens are in normalizeLevel's map - left alone, every
// one of the 132 pistas would publish with no level at all. From the page's own
// legend block:
//   pista-verde       MUY FÁCIL           -> green
//   pista-azul        FÁCIL               -> blue
//   pista-roja        DIFÍCIL             -> black       (no 'red' in the map;
//                                                         same call as glencoe)
//   pista-negra       MUY DIFÍCIL         -> doubleBlack
//   pista-doble-negra DIFICULTAD EXTREMA  -> doubleBlack
// Five grades into four levels has to collapse somewhere. Fold the top two:
// that keeps the European red->black convention and costs the least, since the
// top of the scale is by far the sparsest end (live roster: 6 verde, 48 azul,
// 55 roja, 15 negra, 3 doble-negra).
//
// Two ungraded kinds share the section and get no level, which is what
// normalizeLevel does with an undefined anyway:
//   itinerario  ITINERARIO   - unpatrolled ski routes (4 rows)
//   j           ESQUÍ FONDO  - the Pla de Beret nordic loop (1 row)
const levels = {
  'pista-verde': 'green',
  'pista-azul': 'blue',
  'pista-roja': 'black',
  'pista-negra': 'doubleBlack',
  'pista-doble-negra': 'doubleBlack'
};

// The collapse above lives only in `level`. `grade` carries Baqueira's own word
// through untouched, so a consumer wanting the real Spanish scale can still tell
// negra from doble-negra - and can render itinerario and esquí fondo, which have
// no level at all.
const grades = {
  'pista-verde': 'verde',
  'pista-azul': 'azul',
  'pista-roja': 'roja',
  'pista-negra': 'negra',
  'pista-doble-negra': 'doble-negra',
  itinerario: 'itinerario',
  j: 'esqui-fondo'
};

export default function trails(dom) {
  return rows(dom, 'pistas-section').map(({ name, kind, status }) => ({
    name,
    status,
    level: levels[kind],
    grade: grades[kind]
  }));
}
