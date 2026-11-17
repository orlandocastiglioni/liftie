import { lifts } from '../../tools/skivalley.js';

/**
 * ruka.fi's slopes API (lib/tools/skivalley.js), with the ids the "Slopes &
 * lifts" page selects (routes 1-43, lifts 1-23). The lift list also carries
 * the Ruka Coaster, a summer-and-winter alpine coaster rather than a ski lift,
 * which is left out: 22 lifts.
 */
export default function parse(data) {
  return lifts(data, name => /coaster/i.test(name));
}
