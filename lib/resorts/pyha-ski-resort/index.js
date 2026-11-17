import { lifts } from '../../tools/skivalley.js';

/**
 * pyha.fi's slopes API (lib/tools/skivalley.js), with the route and lift ids
 * the "Slopes & lifts" page selects in its drupalSettings (routes 1-18, lifts
 * 1-9). Nine lifts, A-I: PyhaExpress, the three-person chair, the T-bars and
 * platters, the Huttuland carpet and PohjoisExpress.
 */
export default function parse(data) {
  return lifts(data);
}
