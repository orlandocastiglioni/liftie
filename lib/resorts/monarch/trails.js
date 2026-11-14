import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

// skimonarch.com/conditions/: six .trails-table blocks (Trail | Difficulty |
// Groomed | Status). Difficulty is an inline SVG shape, not a word: circle =
// green, rect = blue, the diamond path = black, the orange ellipse = terrain
// park. Seven runs (East Trees, ...) carry a PNG badge with no text
// alternative, so they publish without a level rather than with a guess.
const SHAPES = { circle: 'green', rect: 'blue', path: 'black', ellipse: 'terrainPark' };

function text(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(text).join('');
}

export default {
  selector: '.trails-table tbody tr',
  parse: row => {
    const cell = label => select(row, `td[data-label="${label}"]`)[0];
    const name = text(cell('Trail')).replace(/\s+/g, ' ').trim();
    if (!name) {
      return;
    }
    const shape = select(cell('Difficulty') ?? row, 'svg > *')[0]?.name;
    return {
      name,
      status:
        allText(select(cell('Status') ?? row, 'span')[0] ?? { children: [] }).trim() || text(cell('Status')).trim(),
      level: SHAPES[shape]
    };
  }
};
