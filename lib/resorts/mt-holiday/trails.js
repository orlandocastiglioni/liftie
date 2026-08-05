import { normalizeLevel } from '../../trails/parse.js';
import rows, { name, SEPARATOR, strip } from './rows.js';

const HEADING = /^terrain\s*\/\s*trail status$/i;

// most runs read "Name - Blue - 🟦", but the doc is hand-edited: some rows
// carry only the legend glyph (Hall's Hollow) and some carry neither
// (Terrain Park, Tube Run). Prefer the word, fall back to the glyph.
const GLYPHS = {
  '\u{1F7E2}': 'green', // green circle
  '\u{1F7E9}': 'green', // green square
  '\u{1F7E6}': 'blue', // blue square
  '\u{25C6}': 'black', // black diamond
  '\u{2BC1}': 'black' // the other diamond the doc uses, on Peppie's/Coffin Canyon
};

function level(text, trail) {
  const [, ...rest] = text.split(SEPARATOR);
  const word = strip(rest.join(' '));
  if (normalizeLevel(word)) {
    return word;
  }
  for (const char of text) {
    if (GLYPHS[char]) {
      return GLYPHS[char];
    }
  }
  return /terrain park/i.test(trail) ? 'terrainPark' : undefined;
}

export default function parse(dom) {
  const trails = [];
  for (const row of rows(dom, HEADING)) {
    const trail = name(row.text);
    if (trail) {
      trails.push({ name: trail, status: row.status, level: level(row.text, trail) });
    }
  }
  return trails;
}
