import { trails as slopes } from '../../tools/skivalley.js';

/** numbered slopes, parks and tree-ride areas on the Finnish four-colour scale */
export default function trails(data) {
  return slopes(data);
}
