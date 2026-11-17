import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { inSeason } from './season.js';

/**
 * springmountainadventures.com/conditions/ renders its status server-side as
 * one Essential Addons data table, headed "Trails & Slopes | (blank) | Lifts |
 * Other Facilities". Each cell holds a <p> line per facility, keyed by its
 * trail-map code and ending in its status:
 *
 *   A. Alpine - OPEN          F - Glacier - Closed
 *   H We Ride For Chris Terrain Park - OPEN
 *   2. Black Granite - double chairlift - OPEN
 *   5. Stonehill chairlift- Closed      6. Magic Carpet©- OPEN
 *
 * Columns are classed by their header (a blank header continues the one to
 * its left, so both trail columns count). The code is dropped, the name is
 * the first " - " segment (the lift type that follows is description), and
 * the status is the word after the last dash. "Other Facilities" (parking,
 * lodges) carry no status and are ignored. The page grades no runs; only the
 * terrain park gets a level.
 *
 * Gated by season.js: outside the season window nothing publishes.
 */
function text(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(text).join('');
}

function clean(s) {
  return s.replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
}

const LINE = /^(?:[A-Z]|\d+)\s*[.-]?\s+(.+?)\s*-\s*(open|closed|on hold|hold)\b/i;

export function rows(dom, kind) {
  if (!inSeason()) {
    return [];
  }
  const out = [];
  for (const table of select(dom, 'table.ea-advanced-data-table')) {
    let last = '';
    const kinds = select(table, 'thead th').map(th => {
      const head = clean(text(th)).toLowerCase();
      last = head || last;
      return last.startsWith('trails') ? 'trails' : last.startsWith('lifts') ? 'lifts' : '';
    });
    for (const tr of select(table, 'tbody tr')) {
      select(tr, 'td').forEach((td, i) => {
        if (kinds[i] !== kind) {
          return;
        }
        for (const p of select(td, 'p')) {
          const m = LINE.exec(clean(text(p)));
          if (!m) {
            continue;
          }
          const name = m[1]
            .split(/\s+-\s+/)[0]
            .replace(/©/g, '')
            .trim();
          out.push({ name, status: coerce(m[2]), level: /terrain park/i.test(name) ? 'terrainPark' : undefined });
        }
      });
    }
  }
  return out;
}
